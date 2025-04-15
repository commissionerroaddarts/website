import { generateMetadata } from "@/utils/metaData";
import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import RestaurantCard from "@/components/allestablishmentspage/RestaurantCard";
import ThemeButton from "@/components/buttons/ThemeButton";
import CustomInput from "@/components/global/CustomInput";
import { Filter1 } from "@mui/icons-material";

export const metadata = generateMetadata({
  title: "Road Darts - Find the Best Restaurants",
  description: "Discover top restaurants near you with Road Darts",
  url: "/establishments",
  image: "/images/road-darts.png",
});

const restaurants = [
  {
    id: 1,
    name: "ExtraMile",
    image: "/images/extra-mile.png",
    tags: ["Fast Food", "Convenience Store"],
    openStatus: "Open 24h Daily",
    rating: 0,
    location: {
      geotag: { lat: 37.7749, lng: -122.4194 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94103",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
  {
    id: 2,
    name: "Amici's East Coast Pizzeria",
    image: "/images/pizza.png",
    tags: ["Pizza", "Casual"],
    openStatus: "Open Now",
    rating: 0,
    location: {
      geotag: { lat: 37.7793, lng: -122.4192 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94102",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
  {
    id: 3,
    name: "Taco Bell",
    image: "/images/taco.png",
    tags: ["Chicken Shop", "Fast Food"],
    openStatus: "Open in 45 mins",
    rating: 0,
    location: {
      geotag: { lat: 37.7833, lng: -122.4167 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94103",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
  {
    id: 4,
    name: "ExtraMile",
    image: "/images/extra-mile.png",
    tags: ["Fast Food", "Convenience Store"],
    openStatus: "Open 24h Daily",
    rating: 0,
    location: {
      geotag: { lat: 37.7749, lng: -122.4194 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94103",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
  {
    id: 5,
    name: "ExtraMile",
    image: "/images/extra-mile.png",
    tags: ["Fast Food", "Convenience Store"],
    openStatus: "Open 24h Daily",
    rating: 0,
    location: {
      geotag: { lat: 37.7749, lng: -122.4194 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94103",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
  {
    id: 6,
    name: "ExtraMile",
    image: "/images/extra-mile.png",
    tags: ["Fast Food", "Convenience Store"],
    openStatus: "Open 24h Daily",
    rating: 0,
    location: {
      geotag: { lat: 37.7749, lng: -122.4194 },
      state: "California",
      city: "San Francisco",
      country: "USA",
      zipcode: "94103",
    },
    description:
      "This spot is perfect for a quick coffee, lunch, or even just to grab some snacks and water while you're on the road. It's always clean and has a...",
  },
];

const AllEstablishmentsPage = () => {
  return (
    <Box>
      {/* Map Section */}
      <section className="container mx-auto px-4 mt-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <Image
            src="/images/map.png"
            alt="Map of Los Angeles"
            width={1200}
            height={200}
            className="w-full h-48 object-cover"
          />
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-white text-center text-lg font-medium">
          Restaurants
        </h2>
        <h1 className="text-white text-center text-3xl font-bold mb-8">
          Top 10 Best Restaurants Near San Francisco, California
        </h1>

        {/* Search Bar */}
        <div className="bg-[#3a2a3e] bg-opacity-50 rounded-lg p-4 mb-8">
          <div className="flex gap-4">
            <ThemeButton
              text="Filter"
              startIcon={<Filter1 className="h-4 w-4" />}
            />
            <div className="relative flex-grow">
              <CustomInput label="Search" />
            </div>
            <ThemeButton text="Search" />
          </div>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </Box>
  );
};

export default AllEstablishmentsPage;
