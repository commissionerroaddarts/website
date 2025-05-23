"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Grid2,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { Business } from "@/types/business";
import BusinessMapPopup from "./BusinessMapPopup";
import Link from "next/link";
import {
  StarRating,
  StarRatingWithPopup,
} from "@/components/global/StarRating";
import ThemeButton from "@/components/buttons/ThemeButton";
import { CircleDot, Edit, Trash } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import PromotionSpace from "@/components/global/PromotionSpace";
import DeleteListingDialog from "@/components/global/DeleteListingDialog";

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
    bordtype,
  } = business;

  const { user } = useAppState();
  const { userDetails } = user;
  const { role, _id: userId } = userDetails || {};
  const isStoreOwner = role === "owner" || role === "admin";
  const [openMap, setOpenMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
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
  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  return (
    <>
      <DeleteListingDialog
        _id={_id}
        loading={loading}
        setLoading={setLoading}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
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
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 6,
            right: -25,
            background: getStatusColor(status),
            color: "white",
            px: 3,
            py: 0.5,
            fontSize: "0.8rem",
            transform: "rotate(45deg)",
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {status ?? "Unknown"}
        </Box>
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
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* Top Section */}
              <Box
                sx={{ display: "flex", justifyContent: "space-start", gap: 2 }}
              >
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
                        onClick={handleOpenConfirm}
                        className="bg-red-500 cursor-pointer text-white text-[0.7rem] px-4 py-2 rounded-full  flex items-center justify-around"
                      >
                        {loading ? "Deleting" : "Delete"}{" "}
                        <Trash className="inline-block ml-1" size={17} />
                      </button>
                    </>
                  )}
                </Box>
              </Box>
              <Box className="flex justify-between items-center">
                <Box className="flex flex-col gap-1">
                  {/* Title */}
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {name ?? "Unnamed Business"}
                  </Typography>

                  {bordtype && (
                    <div className="flex items-center mb-2 gap-1">
                      <CircleDot size={20} />
                      <span className=" capitalize text-white text-xs  py-1 rounded-full">
                        Board Type: {bordtype}
                      </span>
                    </div>
                  )}

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
                      gap: 1,
                    }}
                  >
                    <Box className="flex ">
                      <RoomIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography sx={{ fontSize: 12 }}>
                        {location
                          ? `${location?.city}, ${location?.state}, ${location?.country}`
                          : "No Location Info"}
                      </Typography>
                    </Box>
                    <button
                      className="!text-[#EC6DFF] text-xs underline"
                      onClick={handleMapOpen}
                    >
                      Show Map
                    </button>
                  </Box>
                </Box>
              </Box>
              {/* Buttons Section */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Box className="flex gap-2">
                  <Link
                    href={`/establishments/${business?._id}`}
                    passHref
                    prefetch
                  >
                    {" "}
                    <ThemeButton text="View More" />
                  </Link>
                  <Link
                    href={`tel:${phone}`}
                    passHref
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ThemeButton text="Call Us Now" backgroundColor="#5A2A84" />
                  </Link>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <PromotionSpace
                checkOwner={checkOwner}
                businessId={_id}
                promotion={promotion ?? null}
              />
            </Grid2>
          </Grid2>
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
