import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../components/global/Navbar";
import Image from "next/image";
import SearchComponent from "../components/homepage/SearchingComponent";
import ListingGrid from "../components/listings/ListingGrid";
import CategoryGrid from "../components/listings/CategoryGrid";
import EntertainmentSection from "../components/homepage/EntertainmentSection";

export default function HomePage() {
  return (
    <Box>
      <HomeBanner />

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* Explore Our Listings */}
        <ListingGrid listings={listings} />

        {/* Explore Our Category  */}
        <CategoryGrid categories={categories} />

        {/* Explore Our Events */}
        <EntertainmentSection />
      </Container>
    </Box>
  );
}

function HomeBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        py: 2,
        background:
          "url('/images/banners/road-darts-banner.png') no-repeat center center",
        backgroundSize: "cover",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(121,9,102,0.4066001400560224) 42%, rgba(201,0,255,0.41780462184873945) 100%);",
          zIndex: 0,
        },
      }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />
      </div>
      <Box textAlign="center" sx={{ marginTop: -15 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
            zIndex: 0,
          }}
        >
          <Image
            src="/images/banners/banner-icon.png"
            alt="Road Darts"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ position: "relative", zIndex: 2, fontWeight: 700 }}
        >
          Stay Sharp, Throw Anywhere
        </Typography>

        <Typography
          gutterBottom
          sx={{ position: "relative", zIndex: 2, fontWeight: 200 }}
        >
          Let&#39;s uncover the best places to eat, drink, and shop nearest to
          you.
        </Typography>
      </Box>

      <SearchComponent />
    </Box>
  );
}

const listings = [
  {
    id: 1,
    title: "California Dream Art Gallery",
    category: "Arts & Entertainment",
    priceRange: "$$$$ 50 - 90",
    location: "Los Angeles, California, United States",
    image: "/images/listings/card-1.png",
    isOpen: true,
  },
  {
    id: 2,
    title: "Golden Gate Adventure",
    category: "Outdoor Activities",
    priceRange: "$$$ 30 - 70",
    location: "San Francisco, California, United States",
    image: "/images/listings/card-1.png",
    isOpen: false,
  },
  {
    id: 3,
    title: "New York City Lights",
    category: "City Tours",
    priceRange: "$$$ 40 - 100",
    location: "New York City, New York, United States",
    image: "/images/listings/card-1.png",
    isOpen: true,
  },
];

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
