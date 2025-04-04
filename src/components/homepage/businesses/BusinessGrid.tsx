"use client";
import { Box, Grid2, Typography } from "@mui/material";
import useFetchBusinesses from "@/hooks/useFetchBusinesses";
import BusinessSkeleton from "./BusinessSkeleton";
import dynamic from "next/dynamic";
const CardStaggerAnimation = dynamic(
  () => import("@/animations/sections/CardStaggerAnimation")
);
import BusinessCard from "./BusinessCard";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";

const BusinessGrid = () => {
  const { businesses, status, error } = useFetchBusinesses(1, 3); // 2-sec intentional loading

  if (status === "loading") return <BusinessSkeleton count={3} />;
  if (error) return <p>Error: {error}</p>;

  if (!businesses) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Explore Our Businesses
      </Typography>

      <Grid2
        container
        spacing={4}
        sx={{ mt: 2, justifyContent: "center", width: "100%" }}
      >
        <CardStaggerAnimation stagger={0.1} duration={0.3} yOffset={30}>
          {businesses?.data.map((business) => (
            <Grid2 size={{ xs: 12 }} key={business?._id}>
              <BusinessCard business={business} />
            </Grid2>
          ))}
        </CardStaggerAnimation>
      </Grid2>

      <ThemeOutlineButton text="View All Businesses" applyMargin={true} />
    </Box>
  );
};

export default BusinessGrid;
