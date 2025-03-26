import React from "react";
import AboutUsSection from "../../components/aboutpage/AboutUsSection";
import { Box } from "@mui/material";
import CoreValueSection from "../../components/aboutpage/CoreValueSection";
import FadeInSection from "../../animations/sections/FadeInSection";
import StatsSection from "../../components/aboutpage/StatsSection";

const page = () => {
  return (
    <Box>
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
