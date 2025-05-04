"use client";
import { Box, Grid2, Typography } from "@mui/material";
import useFetchBusinesses from "@/hooks/useFetchBusinesses";
import BusinessSkeleton from "./BusinessSkeleton";
import dynamic from "next/dynamic";
const CardStaggerAnimation = dynamic(
  () => import("@/animations/sections/CardStaggerAnimation")
);
import BusinessCard from "./BusinessCard";
import { default as BusinessCardMobile } from "@/components/allestablishmentspage/BusinessCard";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";
import Link from "next/link";
import { Business } from "@/types/business";

const BusinessGrid = () => {
  const { businesses, status, error } = useFetchBusinesses(1, 3); // 2-sec intentional loading
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  if (status === "loading") return <BusinessSkeleton count={3} />;
  if (error) return <p>Error: {error}</p>;

  if (!businesses) return null;

  return (
    <Box className="flex flex-col items-center mb-5">
      <Typography variant="h4" gutterBottom className="text-center">
        Explore Our Businesses
      </Typography>

      <Grid2
        container
        spacing={4}
        sx={{ mt: 2, justifyContent: "center", width: "90%", margin: "0 auto" }}
      >
        <CardStaggerAnimation stagger={0.1} duration={0.3} yOffset={30}>
          {businesses?.data.map((business: Business) => (
            <Grid2 size={{ xs: 12 }} key={business?._id}>
              {isMobile ? (
                <BusinessCardMobile business={business} />
              ) : (
                <BusinessCard business={business} />
              )}
            </Grid2>
          ))}
        </CardStaggerAnimation>
      </Grid2>

      <Link href="/establishments" passHref>
        <ThemeOutlineButton text="View All Establishments" applyMargin={true} />
      </Link>
    </Box>
  );
};

export default BusinessGrid;
