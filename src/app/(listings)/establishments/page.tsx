import { generateMetadata } from "@/utils/metaData";
import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import BusinessCard from "@/components/allestablishmentspage/BusinessCard";
import ThemeButton from "@/components/buttons/ThemeButton";
import CustomInput from "@/components/global/CustomInput";
import { Filter1 } from "@mui/icons-material";
import { fetchBusinesses } from "@/services/businessService";

export const metadata = generateMetadata({
  title: "Road Darts - Find the Best Restaurants",
  description: "Discover top restaurants near you with Road Darts",
  url: "/establishments",
  image: "/images/road-darts.png",
});

const AllEstablishmentsPage = async () => {
  const { data: businesses } = await fetchBusinesses(1, 10); // Fetch businesses from the API

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
          Establishments
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
          {businesses.map((business) => (
            <BusinessCard key={business._id} business={business} />
          ))}
        </div>
      </section>
    </Box>
  );
};

export default AllEstablishmentsPage;
