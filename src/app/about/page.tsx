import React from "react";
import AboutUsSection from "../../components/aboutpage/AboutUsSection";
import { Box } from "@mui/material";
import CoreValueSection from "../../components/aboutpage/CoreValueSection";

const page = () => {
  return (
    <Box>
      <AboutUsSection />
      <CoreValueSection />
    </Box>
  );
};

export default page;
