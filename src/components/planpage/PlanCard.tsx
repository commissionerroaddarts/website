"use client";
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThemeButton from "@/components/buttons/ThemeButton";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { selectPlan } from "@/store/slices/planSlice";
import { PlanCardProps } from "@/types/plan";
import { motion } from "framer-motion";

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGetStarted = () => {
    dispatch(selectPlan(plan)); // Save to Redux
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
              {plan.price}
              <span style={{ fontSize: "1rem" }}>/month</span>
            </Typography>
            <Typography align="center" sx={{ opacity: 0.8 }}>
              Billed annually.
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
                key={feature}
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
                  {feature}
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

export default PlanCard;
