"use client";
import Image from "next/image";
import Card from "@mui/material/Card";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import ThemeButton from "../buttons/ThemeButton";
import Link from "next/link";
import { useState } from "react";
import BusinessMapPopup from "@/components/homepage/businesses/BusinessMapPopup";
import { Business } from "@/types/business";
import {
  StarRating,
  StarRatingWithPopup,
} from "@/components/global/StarRating";
import { useAppState } from "@/hooks/useAppState";
import { Box } from "@mui/material";
import { Edit, Trash } from "lucide-react";
import { deleteBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface RestaurantCardProps {
  readonly business: Business;
}

export default function BusinessCard({ business }: RestaurantCardProps) {
  const {
    _id,
    media,
    category,
    status,
    name,
    price,
    location,
    timings,
    tags,
    shortDis,
    averageRating,
    // totalReviews,
  } = business;

  const { user } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  // const isStoreOwner = role === "owner" || role === "admin";
  const isStoreOwner = true; // For testing purposes, set to true
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  if (
    !_id ||
    !shortDis ||
    !media ||
    !category ||
    !status ||
    !name ||
    !price ||
    !location ||
    !timings ||
    !tags
  ) {
    console.error("Some properties are missing in the business object.");
    return null;
  }
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    // Add confirmation dialog if needed
    const confirmed = window.confirm(
      "Are you sure you want to delete this establishment?"
    );
    if (!confirmed) {
      setLoading(false);
      return;
    }
    try {
      // Implement delete functionality here
      // For example, you might call a delete API endpoint
      const response = await deleteBusiness(_id);
      if (response.status === 200) {
        toast.success("Establishment deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting establishment:", error);
      toast.error("Failed to delete establishment");
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="!bg-[#2a1e2e] rounded-lg overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="relative h-48">
            {isStoreOwner && (
              <Box
                className="absolute top-2 right-2 flex flex-col gap-2"
                zIndex={10}
              >
                <Link
                  href={`/edit-establishment/${_id}`}
                  className="bg-purple-700 text-white text-xs px-2 py-1 rounded flex items-center justify-around"
                >
                  Edit <Edit className="inline-block ml-1" size={15} />
                </Link>

                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded  flex items-center justify-around"
                >
                  {loading ? "Deleting" : "Delete"}{" "}
                  <Trash className="inline-block ml-1" size={15} />
                </button>
              </Box>
            )}
            <Image
              src={
                media?.logo ??
                media?.images?.[0] ??
                "/images/banners/business-placeholder.png"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 flex-grow">
            {/* Tags and Open Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#3a2a3e] capitalize text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <FaClock className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary text-xs">{status}</span>
              </div>
            </div>

            {/* Restaurant Name */}
            <div className="flex items-center mb-1">
              <FaCheckCircle className="h-4 w-4 text-green-bright mr-2" />
              <h3 className="text-white font-medium text-2xl">{name}</h3>
            </div>

            {userDetails &&
            (userDetails?.role === "admin" || userDetails?.role === "owner") ? (
              <StarRating rating={averageRating ?? 0} size="size-5" />
            ) : (
              <StarRatingWithPopup
                id={_id}
                averageRating={averageRating ?? 0}
              />
            )}

            {/* Location */}
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="h-4 w-4 text-gray mr-2" />
              <span className="text-gray text-sm">
                {location?.state} {location?.city} , {location?.zipcode}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray text-xs mb-4">
              {shortDis}
              <span className="text-primary ml-1 cursor-pointer">more</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 mt-auto">
          <div className="grid grid-cols-1 gap-2">
            <Link
              href={{
                pathname: `/establishments/${_id}`,
              }}
              passHref
            >
              <ThemeButton text="View More" className="w-full" />
            </Link>
            <ThemeButton text="Show Map" onClickEvent={handleMapOpen} />
          </div>
        </div>
      </Card>
      <BusinessMapPopup
        handleMapClose={handleMapClose}
        openMap={openMap}
        location={location ?? {}}
      />
    </>
  );
}
