import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import PlanCard from "../../../components/planpage/PlanCard";

const plans = [
  {
    id: "1",
    name: "Basic plan",
    icon: "/images/icons/basic.svg",
    price: "$10",
    features: [
      "Flexible Plans",
      "Scalability",
      "24/7 Email Support",
      "200 Recording",
      "30 Days Backup",
    ],
    bgColor:
      "linear-gradient(111.5deg, rgba(201, 201, 201, 0.8) 1.53%, rgba(196, 196, 196, 0.1) 97.09%)",
  },
  {
    id: "2",
    name: "Business plan",
    icon: "/images/icons/business.svg",
    price: "$20",
    features: [
      "Access to all basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
      "Basic chat and email support",
    ],
    bgColor: "#1D1D1D",
    featured: true,
  },
  {
    id: "3",
    name: "Enterprise plan",
    icon: "/images/icons/enterprise.svg",
    price: "$40",
    features: [
      "Access to all basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
      "Basic chat and email support",
    ],
    bgColor:
      "linear-gradient(111.5deg, rgba(201, 201, 201, 0.8) 1.53%, rgba(196, 196, 196, 0.1) 97.09%)",
  },
];

const page = () => {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </div>
    </Box>
  );
};

export default page;
