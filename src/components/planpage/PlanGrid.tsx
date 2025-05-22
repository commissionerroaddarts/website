"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThemeButton from "@/components/buttons/ThemeButton";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { selectPlan } from "@/store/slices/planSlice";
import { Plan, PlanCardProps } from "@/types/plan";
import { motion } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";
import { getPlans } from "@/services/planService";
import Preloader from "@/components/global/Preloader";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";

const PlanGrid = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      // Fetch plans from your service
      const response = await getPlans(); // Replace with your API call
      setPlans(response); // Assuming the response contains the plans data
      setLoading(false);
    };
    fetchPlans();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
      className="max-w-[90%] mx-auto"
    >
      <Typography variant="h4" color="white" gutterBottom>
        Select Your Plan
      </Typography>
      <Typography color="white" mb={4}>
        Find the perfect plan to showcase your listings and grow your audience.
      </Typography>
      <Grid2 container spacing={3} justifyContent="center">
        {plans.map((plan: Plan) => (
          <Grid2 size={{ xs: 12, sm: 12, md: 4 }} key={plan.id}>
            <PlanCard key={plan.id} plan={plan} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

type BillingCycle = "yearly" | "monthly";

const billingCycleOptions = [
  { value: "yearly", label: "Yearly" },
  { value: "monthly", label: "Monthly" },
];

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppState(); // Assuming you have a user object in your Redux store
  const { userDetails } = user; // Check if user is logged in
  const { subscription } = userDetails || {};
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");

  useEffect(() => {
    if (subscription?.status?.toLowerCase() === "active") {
      setIsAlreadySubscribed(true);
    }
  }, [subscription]);

  const handleGetStarted = async () => {
    const updatedPlan = { ...plan, billingCycle };
    dispatch(selectPlan(updatedPlan)); // Save to Redux
    if (isAlreadySubscribed) {
      alert(
        "You are already subscribed to a plan. Please contact support for further assistance."
      );
    }
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          background: plan.bgColor,
          color: "white",
          borderRadius: "20px",
          padding: "10px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          border: plan.featured ? "2px solid #8224E3" : "none",
          height: { xs: "auto", md: 760 },
          display: "flex",
          flexDirection: "column",
          position: "relative", // Needed for ribbon positioning
        }}
      >
        {plan.featured && (
          <Box
            sx={{
              position: "absolute",
              top: 34,
              right: -36,
              background: "#FF5722",
              color: "white",
              px: 3,
              py: 0.5,
              fontWeight: "bold",
              fontSize: "1rem",
              transform: "rotate(45deg)",
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              letterSpacing: 1,
            }}
          >
            HOT SELLING
          </Box>
        )}
        <CardContent
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box className="flex flex-col gap-1 justify-center items-center mb-3">
              <Image
                src={plan.icon}
                alt={plan.name}
                width={50}
                height={50}
                // Apply blur effect
              />
              <Box>
                <Typography variant="h6" align="center" className="m-0">
                  {plan.name}
                </Typography>

                <Typography align="center" className="text-sm m-0">
                  {plan.description}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h3" align="center">
              <span
                className={`${
                  billingCycle === "yearly"
                    ? "line-through !text-gray-300 text-[1.4rem]"
                    : ""
                }`}
              >
                ${plan.prices[billingCycle]?.amount}
              </span>
              {billingCycle === "yearly" && (
                <span className="text-[#8224E3]">
                  ${plan.prices[billingCycle]?.discountedPrice?.toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: "1rem" }}>
                /{billingCycle === "monthly" ? "month" : "year"}
              </span>
            </Typography>
            <Box className="mt-5 w-[70%] mx-auto">
              <SelectSearchDropDown
                options={billingCycleOptions}
                label="Yearly / Monthly"
                value={billingCycle}
                onChange={(event) =>
                  setBillingCycle(event.target.value as BillingCycle)
                }
              />
            </Box>
          </Box>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            style={{ flexGrow: 1 }}
          >
            {plan.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Typography
                  display="flex"
                  alignItems="center"
                  mb={1}
                  textAlign="left"
                  gap={1} // adds spacing between icon/text/chip
                >
                  <CheckCircleIcon
                    sx={{
                      color: !plan.featured ? "white" : "#8224E3",
                    }}
                  />
                  <span>{feature?.name}</span>
                </Typography>
              </motion.div>
            ))}
          </motion.div>
          <Typography className="flex justify-center mt-4">
            {plan.featured ? (
              <ThemeButton text="Get Started" onClickEvent={handleGetStarted} />
            ) : (
              <ThemeOutlineButton
                text="Get Started"
                onClickEvent={handleGetStarted}
              />
            )}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanGrid;
