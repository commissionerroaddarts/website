"use client";
import { Plan } from "@/types/plan";
import { Dialog, DialogContent, Grid2, Backdrop, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Preloader from "@/components/global/Preloader";
import { getPlans, upgradePlan } from "@/services/planService";
import ThemeButton from "../buttons/ThemeButton";
import SelectSearchDropDown from "../global/SelectSearchDropDown";
import { useAppState } from "@/hooks/useAppState";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

type BillingCycle = "monthly" | "yearly";

export default function UpgradePlan({
  isOpen,
  maxListings,
  businessCount,
}: {
  readonly isOpen: boolean;
  readonly maxListings: number;
  readonly businessCount: number;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const { user } = useAppState();
  const userDetails = user?.userDetails;
  const stripeSubscriptionId = userDetails?.stripeSubscriptionId;
  const subscriptionPlanName = userDetails?.subscription?.plan;
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await getPlans();
        setPlans(response);
      } catch (err) {
        console.error("Error fetching plans:", err);
        toast.error("Failed to load plans");
      }
      setLoading(false);
    };
    if (isOpen) fetchPlans();
  }, [isOpen]);

  const handleSelectPlan = async (plan: Plan) => {
    try {
      const priceId = plan.prices?.[billingCycle]?.priceId;
      if (!priceId || !stripeSubscriptionId) {
        toast.error("Invalid plan or subscription");
        return;
      }

      const response = await upgradePlan({ priceId, stripeSubscriptionId });

      if (response.status !== 200) {
        toast.error("Failed to upgrade plan");
        return;
      }

      redirect("/add-establishment");
    } catch (err) {
      toast.error("An error occurred while upgrading");
      console.error(err);
    }
  };

  if (loading) return <Preloader />;

  const planPriority = ["Basic Plan", "Standard Plan", "Premium Plan"]; // lowest to highest

  // Get the index of the user's current plan
  const currentPlanIndex = planPriority.findIndex(
    (plan) => plan.toLowerCase() === subscriptionPlanName?.toLowerCase()
  );

  // Filter only those plans which are equal or higher tier
  const filteredPlans = plans.filter((plan) => {
    const planIndex = planPriority.findIndex(
      (p) => p.toLowerCase() === plan.name.toLowerCase()
    );
    return planIndex >= currentPlanIndex;
  });

  const handleGoBackProfile = () => {
    router.back();
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="md"
      disableEscapeKeyDown
      hideBackdrop={false} // keep it visible, just lock it
      onClose={undefined} // this is important: explicitly do NOT define it
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { pointerEvents: "none" }, // disables interaction with backdrop
        },
        paper: {
          onClick: (e: any) => e.stopPropagation(), // prevent bubbling inside
        },
      }}
    >
      <DialogContent
        sx={{
          background:
            "linear-gradient(151.12deg, rgba(127, 50, 153, 0.83) -10.86%, #15051B 94.14%)",
        }}
      >
        <div className="text-white flex flex-col items-center ">
          <Box className="absolute top-4 left-2">
            <ThemeButton
              text="Go Back"
              onClick={handleGoBackProfile}
              fontSize="1rem"
            />
          </Box>
          <h1 className="text-2xl font-bold text-center mb-2">
            You've reached your current plan's limit!
          </h1>
          {/* 
          <p className="border-2 border-white/30 rounded-full py-4 px-12 text-2xl font-semibold mb-5 hover:bg-white/10 transition-colors">
            Upgrade Now to Continue
          </p> */}

          <p className="text-sm text-center ">
            You're currently on the Free Trial - {businessCount} of{" "}
            {maxListings} listings used.
          </p>
          <p className="text-sm text-center mb-4">
            Upgrade your plan to add more Establishments and unlock advanced
            features.
          </p>

          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.name}
              title={plan.name}
              price={plan.prices?.[billingCycle]?.amount ?? 0}
              duration={billingCycle}
              description={plan.description ?? ""}
              isBestValue={plan.name.includes("Standard")}
              userPlanName={subscriptionPlanName ?? ""}
              plan={plan}
              setBillingCycle={setBillingCycle}
              handleSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PlanCard({
  title,
  price,
  duration,
  description,
  isBestValue = false,
  setBillingCycle,
  handleSelectPlan,
  plan,
  userPlanName,
}: {
  readonly title: string;
  readonly price: number;
  readonly duration: string;
  readonly description: string;
  readonly isBestValue?: boolean;
  readonly setBillingCycle: (value: BillingCycle) => void;
  readonly plan: Plan;
  readonly handleSelectPlan: (plan: Plan) => Promise<void>;
  readonly userPlanName?: string;
}) {
  const isCurrentPlan = title === userPlanName;

  return (
    <div
      className={`w-full mb-2 rounded-3xl overflow-hidden `}
      style={{
        background: " rgba(99, 33, 121, 1)",
      }}
    >
      {isBestValue && !isCurrentPlan && (
        <div
          className="bg-pink-accent py-2 text-center font-semibold"
          style={{
            background: " rgba(236, 109, 255, 1)",
            borderRadius: "0 0 20px 20px",
          }}
        >
          Best Value
        </div>
      )}
      <div
        className=" p-6 rounded-3xl"
        style={{
          border: isCurrentPlan ? "3px solid rgba(236, 109, 255, 1)" : "none",
        }}
      >
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="text-right">
            <span className="text-xl font-bold">${price}</span>
            <span className="text-sm">/{duration}</span>
          </div>
        </div>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: isCurrentPlan ? 12 : 6 }}>
            <p className="text-sm">{description}</p>
          </Grid2>
          {!isCurrentPlan && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <SelectSearchDropDown
                    options={[
                      { label: "Monthly", value: "monthly" },
                      { label: "Yearly", value: "yearly" },
                    ]}
                    label="Billing Cycle"
                    value={duration}
                    onChange={(event) =>
                      setBillingCycle(event.target.value as BillingCycle)
                    }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <ThemeButton
                    onClickEvent={() => handleSelectPlan(plan)}
                    text="Upgrade"
                    className="w-full"
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </div>
    </div>
  );
}
