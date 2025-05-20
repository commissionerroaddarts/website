"use client";
import { Plan } from "@/types/plan";
import { Dialog, DialogContent, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import Preloader from "@/components/global/Preloader";
import { getPlans, upgradePlan } from "@/services/planService";
import ThemeButton from "../buttons/ThemeButton";
import SelectSearchDropDown from "../global/SelectSearchDropDown";
import { useAppState } from "@/hooks/useAppState";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

type BillingCycle = "monthly" | "yearly";

export default function UpgradePlan({
  isOpen,
  setIsOpen,
}: {
  readonly isOpen: boolean;
  readonly setIsOpen: (value: boolean) => void;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const { user } = useAppState();
  const userDetails = user?.userDetails;
  const stripeSubscriptionId = userDetails?.stripeSubscriptionId;
  const subscriptionPlanName = userDetails?.subscription?.plan;

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

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogContent
        sx={{
          background:
            "linear-gradient(151.12deg, rgba(127, 50, 153, 0.83) -10.86%, #15051B 94.14%)",
        }}
      >
        <div className="text-white flex flex-col items-center p-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            You've reached your current plan's limit!
          </h1>

          <button className="border-2 border-white/30 rounded-full py-4 px-12 text-2xl font-semibold mb-10 hover:bg-white/10 transition-colors">
            Upgrade Now to Continue
          </button>

          <p className="text-xl text-center mb-2">
            You're currently on the Free Trial - 3 of 3 listings used.
          </p>
          <p className="text-xl text-center mb-12">
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
      className={`w-full mb-6 rounded-3xl overflow-hidden `}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="text-right">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-lg">/{duration}</span>
          </div>
        </div>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: isCurrentPlan ? 12 : 6 }}>
            <p className="text-lg">{description}</p>
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
