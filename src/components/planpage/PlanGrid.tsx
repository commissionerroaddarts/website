"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
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

const PlanGrid = () => {
  const { user } = useAppState();
  const { userDetails } = user || {};
  const { subscription } = userDetails || {};
  const [plans, setPlans] = useState<Plan[]>([]);

  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  if (subscription?.status.toLowerCase() === "active") {
    setIsAlreadySubscribed(true);
  }

  useEffect(() => {
    const fetchPlans = async () => {
      // Fetch plans from your service
      const response = await getPlans(); // Replace with your API call
      setPlans(response.data); // Assuming the response contains the plans data
    };
    fetchPlans();
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Select Your Plan
      </Typography>
      <Typography color="white" mb={4}>
        Find the perfect plan to showcase your listings and grow your audience.
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan: Plan) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
            <PlanCard key={plan.id} plan={plan} />
          </Grid2>
        ))}
      </div>
    </Box>
  );
};

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppState(); // Assuming you have a user object in your Redux store
  const { isLoggedIn } = user; // Check if user is logged in

  const handleGetStarted = async (planName: string) => {
    dispatch(selectPlan(plan)); // Save to Redux

    if (isLoggedIn) {
      router.push("/checkout"); // Redirect to checkout page
    } else {
      router.push("/login"); // Redirect to login page
    }
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
          width: 350,
          height: 550,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            <Image
              src={plan.icon}
              alt={plan.name}
              width={50}
              height={50}
              // Apply blur effect
            />
            <Typography variant="h6" align="center" gutterBottom>
              {plan.name}
            </Typography>
            <Typography variant="h3" align="center">
              ${plan.price}
              <span style={{ fontSize: "1rem" }}>/month</span>
            </Typography>
            <Typography align="center" sx={{ opacity: 0.8 }}>
              Billed annually
            </Typography>
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
                <Typography display="flex" alignItems="center" mb={1}>
                  <CheckCircleIcon
                    sx={{
                      color: !plan.featured ? "white" : "#8224E3",
                      marginRight: "8px",
                    }}
                  />{" "}
                  {feature?.name}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
          <Typography className=" flex justify-center mt-4">
            {plan.featured ? (
              <ThemeButton
                text="Get Started"
                onClickEvent={() => handleGetStarted(plan.name)}
              />
            ) : (
              <ThemeOutlineButton
                text="Get Started"
                onClickEvent={() => handleGetStarted(plan.name)}
              />
            )}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanGrid;
