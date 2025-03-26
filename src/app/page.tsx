import React from "react";
import { Container, Box } from "@mui/material";
import BusinessGrid from "../components/listings/BusinessGrid";
import CategoryGrid from "../components/listings/CategoryGrid";
import EntertainmentSection from "../components/homepage/EntertainmentSection";
import HomeBanner from "../components/homepage/HomeBanner";

export default function HomePage() {
  return (
    <Box>
      <HomeBanner />

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* Explore Our Listings */}
        <BusinessGrid />

        {/* Explore Our Category  */}
        <CategoryGrid categories={categories} />

        {/* Explore Our Events */}
        <EntertainmentSection />
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
