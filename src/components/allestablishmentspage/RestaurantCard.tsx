"use client";
import Image from "next/image";
import Card from "@mui/material/Card";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import ThemeButton from "../buttons/ThemeButton";
import Link from "next/link";
import { useState } from "react";
import BusinessMapPopup from "../homepage/businesses/BusinessMapPopup";
import { Location } from "@/types/business";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  tags: string[];
  openStatus: string;
  rating: number;
  location: Location | null;
  description: string;
}

interface RestaurantCardProps {
  readonly restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  //   const { media, category, status, name, price, location } = business;
  const [openMap, setOpenMap] = useState<boolean>(false);
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

  return (
    <>
      <Card className="!bg-[#2a1e2e] rounded-lg overflow-hidden">
        <div className="relative h-48">
          <Image
            src={restaurant.image ?? "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          {/* Tags and Open Status */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {restaurant.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="bg-[#3a2a3e] text-white text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <FaClock className="h-4 w-4 text-primary mr-1" />
              <span className="text-primary text-xs">
                {restaurant.openStatus}
              </span>
            </div>
          </div>

          {/* Restaurant Name */}
          <div className="flex items-center mb-1">
            <FaCheckCircle className="h-4 w-4 text-green-bright mr-2" />
            <h3 className="text-white font-medium">{restaurant.name}</h3>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 text-gray"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-gray text-xs ml-2">
              Be the first to review!
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="h-4 w-4 text-gray mr-2" />
            <span className="text-gray text-sm">
              {restaurant.location?.state} {restaurant.location?.city} ,{" "}
              {restaurant.location?.zipcode}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray text-xs mb-4">
            {restaurant.description}
            <span className="text-primary ml-1 cursor-pointer">more</span>
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-1 gap-2">
            <Link href={`/establishments/${restaurant.id}`}>
              <ThemeButton text="View More" className="w-full" />
            </Link>
            <ThemeButton text="Show Map" onClickEvent={handleMapOpen} />
          </div>
        </div>
      </Card>
      <BusinessMapPopup
        handleMapClose={handleMapClose}
        openMap={openMap}
        location={restaurant.location || {}}
      />
    </>
  );
}
