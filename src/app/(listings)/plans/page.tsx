import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import PlanCard from "@/components/planpage/PlanCard";

import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Plans - Road Darts",
  description:
    "Choose the best plan for your needs and get started with Road Darts.",
  url: "/plans",
  image: "/images/banners/banner-icon.png",
});

const plans = [
  {
    id: "1",
    name: "Basic plan",
    icon: "/images/icons/basic.svg",
    price: "$10",
    features: [
      "Access to basic road dart tracks",
      "Weekly performance reports",
      "Standard customer support",
      "10 road dart events per month",
      "Basic safety gear",
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
      "Advanced road dart tracks",
      "Daily performance reports",
      "Priority customer support",
      "Unlimited road dart events",
      "Advanced safety gear",
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
      "Access to all business features",
      "Exclusive road dart tracks",
      "Real-time performance analytics",
      "Dedicated account manager",
      "Customizable road dart events",
      "Premium safety gear",
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
