"use client";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import BusinessCard from "@/components/allestablishmentspage/BusinessCard";
import useFetchBusinesses from "@/hooks/useFetchBusinesses";
import { Business } from "@/types/business";
import LoadingIndicator from "@/components/global/LoadingIndicator";
import { useEffect, useState } from "react";

const RecommendedEstablishment = ({ id }: { id: string }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const { businesses: allBusinesses, status } = useFetchBusinesses(1, 6); // 2-sec intentional loading
  useEffect(() => {
    if (status !== "succeeded" || !id || allBusinesses?.data?.length === 0)
      return;

    // Filter out the current business by ID
    const filtered = allBusinesses?.data?.filter(
      (business) => business._id !== id
    );
    setBusinesses(filtered ?? []);
  }, [id, allBusinesses, status]);

  if (status === "loading") return <LoadingIndicator />;
  if (!businesses || businesses.length === 0) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 6, textAlign: "center" }} className="entertainment-section">
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 4 }}
      >
        Recommended Establishments
      </Typography>
      <Slider {...sliderSettings}>
        {businesses?.map((business: Business) => (
          <BusinessCard key={business?._id} business={business} />
        ))}
      </Slider>
    </Box>
  );
};
export default RecommendedEstablishment;
