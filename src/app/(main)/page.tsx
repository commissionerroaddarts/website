import React from "react";
import { Container, Box } from "@mui/material";
import BusinessGrid from "@/components/homepage/businesses/BusinessGrid";
import CategoryGrid from "@/components/homepage/businesses/CategoryGrid";
import EntertainmentSection from "@/components/homepage/EntertainmentSection";
import HomeBanner from "@/components/homepage/HomeBanner";
import FadeInSection from "@/animations/sections/FadeInSection";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Home - Road Darts",
  description:
    "Welcome to the Road Darts homepage, your ultimate destination for all things related to road darts.",
  url: "/",
  image: "/images/banners/banner-icon.png",
});

export default async function HomePage() {
  return (
    <Box>
      <HomeBanner />

      <Container sx={{ mt: 10, maxWidth: { xs: "lg", md: "80%", xl: "75%" } }}>
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
    name: "San Antonio",
    imageUrl: "/images/listings/category/c1.png",
  },
  {
    id: 5,
    name: "Las Vegas",
    imageUrl: "/images/listings/category/c5.png",
  },
  //add San Diego
  {
    id: 6,
    name: "San Diego",
    imageUrl: "/images/listings/category/c6.jpg",
  },
];
