"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import CallIcon from "@mui/icons-material/Call";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Business } from "@/types/business";
import BusinessMapPopup from "./BusinessMapPopup";
import Link from "next/link";
import {
  StarRating,
  StarRatingWithPopup,
} from "@/components/global/StarRating";
import ThemeButton from "@/components/buttons/ThemeButton";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";
import { Edit, Map, Trash } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { useRouter } from "next/navigation";
import { deleteBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import PromotionSpace from "@/components/global/PromotionSpace";

function BusinessCard({ business }: { readonly business: Business }) {
  // business
  const {
    _id,
    phone,
    media,
    category,
    status,
    name,
    price,
    location,
    averageRating,
    userId: userBusinessId,
    promotion,
  } = business;

  const { user } = useAppState();
  const { userDetails } = user;
  const { role, _id: userId } = userDetails || {};
  const isStoreOwner = role === "owner" || role === "admin";
  const [openMap, setOpenMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkOwner = isStoreOwner && userBusinessId === userId;
  const handleMapOpen = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMap(true);
  };
  const handleMapClose = () => setOpenMap(false);
  const getStatusColor = (status: string | undefined): string => {
    switch (status) {
      case "Active":
        return "#4caf50";
      case "Closed Down":
        return "#f44336";
      case "Coming Soon":
        return "#ff9800";
      case "Under Remodel":
        return "#2196f3";
      default:
        return "#9e9e9e";
    }
  };

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
        router.push("/profile/view-your-listings");
      }
    } catch (error) {
      console.error("Error deleting establishment:", error);
      toast.error("Failed to delete establishment");
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          background:
            "linear-gradient(111.25deg, rgba(201, 201, 201, 0.2) 1.53%, rgba(196, 196, 196, 0.05) 97.44%)",
          borderRadius: 3,
          color: "#fff",
          p: 2,
          width: "100%",
          boxShadow: 3,
          gap: 1,
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          sx={{ width: 250, height: 250, borderRadius: 2 }}
          image={
            media?.logo ??
            media?.images?.[0] ??
            "/images/banners/business-placeholder.png"
          }
          alt={name}
        />
        {/* Content Section */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Top Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Chip
              label={category ?? "No Category"}
              color="secondary"
              sx={{ backgroundColor: "#5A2A84" }}
            />
            <Box className="relative flex gap-2">
              {userBusinessId === userId && (
                <>
                  <Link
                    href={`/edit-establishment/${_id}`}
                    className="bg-purple-700 text-white text-[0.7rem] px-4 py-2 rounded-full flex items-center justify-around"
                  >
                    Edit <Edit className="inline-block ml-1" size={17} />
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="bg-red-500 cursor-pointer text-white text-[0.7rem] px-4 py-2 rounded-full  flex items-center justify-around"
                  >
                    {loading ? "Deleting" : "Delete"}{" "}
                    <Trash className="inline-block ml-1" size={17} />
                  </button>
                </>
              )}
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.7rem",
                  background: getStatusColor(status),
                }}
                variant="h6"
              >
                <CheckCircleIcon sx={{ fontSize: 12, mr: 0.5 }} />{" "}
                {status ?? "Unknown"}
              </Typography>
            </Box>
          </Box>
          <Box className="flex justify-between items-center">
            <Box className="flex flex-col gap-1">
              {/* Title */}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {name ?? "Unnamed Business"}
              </Typography>

              {userDetails && isStoreOwner ? (
                <StarRating rating={averageRating ?? 0} size="size-5" />
              ) : (
                <StarRatingWithPopup
                  id={_id}
                  averageRating={averageRating ?? 0}
                />
              )}

              {/* Price and Location */}
              <Typography sx={{ color: "#9b59b6", fontWeight: "bold" }}>
                {price ? price?.category : "No Price Info"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#ccc",
                  mt: 0.5,
                }}
              >
                <RoomIcon sx={{ fontSize: 16, mr: 0.5 }} />
                {location
                  ? `${location?.city}, ${location?.state}, ${location?.country}`
                  : "No Location Info"}
              </Box>
            </Box>

            <PromotionSpace
              checkOwner={checkOwner}
              businessId={_id}
              promotion={promotion ?? null}
            />
          </Box>
          {/* Buttons Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box className="flex gap-2">
              <Link
                href={`tel:${phone}`}
                passHref
                onClick={(e) => e.stopPropagation()}
              >
                <ThemeButton
                  text="Call Us Now"
                  backgroundColor="#5A2A84"
                  icon={<CallIcon fontSize="small" />}
                />
              </Link>
              <Link
                href={`/establishments/${business?._id}`}
                className="w-[350px] h-[250px] rounded-2xl"
                passHref
                prefetch
              >
                {" "}
                <ThemeButton
                  text="View More"
                  icon={<CallIcon fontSize="small" />}
                />
              </Link>
            </Box>
            <ThemeOutlineButton
              icon={<Map />}
              // onClick={handleMapOpen}
              text="Show Map"
            />
          </Box>
        </CardContent>
      </Card>

      <BusinessMapPopup
        handleMapClose={handleMapClose}
        openMap={openMap}
        location={location || {}}
      />
    </>
  );
}

export default BusinessCard;
