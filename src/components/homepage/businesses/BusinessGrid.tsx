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
import { useMediaQuery } from "@mui/system";
import theme from "@/theme/theme";

const BusinessGrid = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const businessCount = isMobile ? 4 : 3; // Adjust based on screen size
  const { businesses, status } = useFetchBusinesses(1, businessCount); // 2-sec intentional loading
  if (status === "loading") return <BusinessSkeleton count={3} />;

  if (!businesses) return null;

  return (
    <Box className="flex flex-col items-center mb-5">
      <Typography variant="h4" gutterBottom className="text-center">
        Explore Our Businesses
      </Typography>
      <Grid2 container spacing={4} sx={{ mt: 2, justifyContent: "center" }}>
        {businesses?.data.map((business: Business) => (
          <Grid2 key={business?._id} width={"100%"}>
            <CardStaggerAnimation stagger={0.1} duration={0.3} yOffset={30}>
              {isMobile ? (
                <BusinessCardMobile business={business} />
              ) : (
                <BusinessCard business={business} />
              )}
            </CardStaggerAnimation>
          </Grid2>
        ))}
      </Grid2>

      <Link href="/establishments" passHref>
        <ThemeOutlineButton text="View All Establishments" applyMargin={true} />
      </Link>
    </Box>
  );
};

export default BusinessGrid;
