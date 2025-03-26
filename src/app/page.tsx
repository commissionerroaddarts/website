import React from "react";
import { Container, Box } from "@mui/material";
import BusinessGrid from "../components/businesses/BusinessGrid";
import CategoryGrid from "../components/businesses/CategoryGrid";
import EntertainmentSection from "../components/homepage/EntertainmentSection";
import HomeBanner from "../components/homepage/HomeBanner";
import FadeInSection from "../animations/sections/FadeInSection";

export default function HomePage() {
  return (
    <Box>
      <HomeBanner />

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <FadeInSection>
          {/* Explore Our Listings */}
          <BusinessGrid />
        </FadeInSection>

        {/* Explore Our Category  */}
        <CategoryGrid categories={categories} />

        <FadeInSection>
          {/* Explore Our Events */}
          <EntertainmentSection />
        </FadeInSection>
      </Container>
    </Box>
  );
}

const categories = [
  {
    id: 1,
    name: "New York",
    imageUrl: "/images/listings/category/c1.png",
  },
  {
    id: 2,
    name: "Los Angeles",
    imageUrl: "/images/listings/category/c2.png",
  },
  {
    id: 3,
    name: "Chicago",
    imageUrl: "/images/listings/category/c3.png",
  },
  {
    id: 4,
    name: "Houston",
    imageUrl: "/images/listings/category/c4.png",
  },
  {
    id: 5,
    name: "San Antonio",
    imageUrl: "/images/listings/category/c1.png",
  },
  {
    id: 6,
    name: "Las Vegas",
    imageUrl: "/images/listings/category/c5.png",
  },
];
