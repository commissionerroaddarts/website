import React from "react";
import AboutUsSection from "../../components/aboutpage/AboutUsSection";
import { Box } from "@mui/material";
import CoreValueSection from "../../components/aboutpage/CoreValueSection";
import FadeInSection from "../../animations/sections/FadeInSection";
import StatsSection from "../../components/aboutpage/StatsSection";

export const metadata = {
  title: "About Us - Road Darts",
  icons: {
    icon: "/images/favicons/favicon.ico", // ✅ Reference the dynamic icon (Next.js will resolve it)
  },
  description:
    "Learn more about the Road Darts team, our mission, and our core values.",
  icon: "/images/logos/road-darts-logo.png",
  openGraph: {
    title: "About Us - Road Darts",
    description:
      "Learn more about the Road Darts team, our mission, and our core values.",
    url: "https://www.roaddarts.com/about-us",
    type: "website",
    images: [
      {
        url: "/images/logos/road-darts-logo.png",
        width: 800,
        height: 600,
        alt: "Road Darts Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@roaddarts",
    title: "About Us - Road Darts",
    description:
      "Learn more about the Road Darts team, our mission, and our core values.",
    image: "/images/logos/road-darts-logo.png",
  },
};

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
