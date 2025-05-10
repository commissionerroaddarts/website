import React from "react";
import AboutUsSection from "@/components/aboutpage/AboutUsSection";
import { Box } from "@mui/material";
import CoreValueSection from "@/components/aboutpage/CoreValueSection";
import FadeInSection from "@/animations/sections/FadeInSection";
import StatsSection from "@/components/aboutpage/StatsSection";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "About Us - Road Darts",
  description:
    "Learn more about the Road Darts team, our mission, and our core values.",
  url: "/login",
  image: "/images/banners/banner-icon.png",
});

const page = () => {
  return (
    <Box className="flex flex-col gap-16 md:gap-10 my-4">
      <AboutUsSection />

      <FadeInSection>
        <StatsSection />
      </FadeInSection>

      <FadeInSection>
        <CoreValueSection />
      </FadeInSection>
    </Box>
  );
};

export default page;
