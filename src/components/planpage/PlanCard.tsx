"use client";
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThemeButton from "../buttons/ThemeButton";
import ThemeOutlineButton from "../buttons/ThemeOutlineButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store";
import { selectPlan } from "../../store/slices/planSlice";
import { PlanCardProps } from "../../types/plan";

const PlanCard = ({ plan }: PlanCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGetStarted = () => {
    dispatch(selectPlan(plan)); // Save to Redux
    router.push("/add-listing");
  };

  return (
    <Card
      sx={{
        background: plan.bgColor,
        color: "white",
        borderRadius: "20px",
        padding: "10px",
        width: 350,
      }}
    >
      <CardContent>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={plan.icon} alt={plan.name} width={50} height={50} />
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
        {plan.features.map((feature, index) => (
          <Typography key={index} display="flex" alignItems="center" mb={1}>
            <CheckCircleIcon
              sx={{
                color: !plan.featured ? "white" : "#8224E3",
                marginRight: "8px",
              }}
            />{" "}
            {feature}
          </Typography>
        ))}
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
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
  );
};

export default PlanCard;
