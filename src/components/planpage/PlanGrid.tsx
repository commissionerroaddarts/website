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
import Preloader from "../global/Preloader";

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
    >
      <Typography variant="h4" color="white" gutterBottom>
        Select Your Plan
      </Typography>
      <Typography color="white" mb={4}>
        Find the perfect plan to showcase your listings and grow your audience.
      </Typography>
      <Grid2
        container
        spacing={3}
        justifyContent="center"
        className="max-w-[95%] md:max-w-[90%] mx-auto"
      >
        {plans.map((plan: Plan) => (
          <Grid2 size={{ xs: 12, sm: 12, md: 4 }} key={plan.id}>
            <PlanCard key={plan.id} plan={plan} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppState(); // Assuming you have a user object in your Redux store
  const { isLoggedIn, userDetails } = user; // Check if user is logged in
  const { subscription } = userDetails || {};
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);

  useEffect(() => {
    if (subscription?.status?.toLowerCase() === "active") {
      setIsAlreadySubscribed(true);
    }
  }, [subscription]);

  const handleGetStarted = async () => {
    dispatch(selectPlan(plan)); // Save to Redux
    if (isAlreadySubscribed) {
      alert(
        "You are already subscribed to a plan. Please contact support for further assistance."
      );
    } else if (isLoggedIn) {
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
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          border: plan.featured ? "2px solid #8224E3" : "none",
          height: 620,
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
                <Typography
                  display="flex"
                  alignItems="start"
                  mb={1}
                  textAlign="left"
                >
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
