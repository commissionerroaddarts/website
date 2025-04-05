"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import CallIcon from "@mui/icons-material/Call";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Business } from "@/types/business";
import { Stars } from "@mui/icons-material";
import BusinessMapPopup from "./BusinessMapPopup";
import Link from "next/link";

function BusinessCard({ business }: { readonly business: Business }) {
  const { media, category, status, name, price, location } = business;
  const [openMap, setOpenMap] = useState(false);
  console.log(media);
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

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
          maxWidth: "100%",
          boxShadow: 3,
          gap: 1,
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          sx={{ width: 300, height: 300, borderRadius: 2 }}
          image={media?.images?.[0] ?? "/images/placeholder.png"}
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
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ fontSize: 18, mr: 0.5 }} />{" "}
              {status ?? "Unknown"}
            </Typography>
          </Box>

          {/* Title */}
          <Typography variant="h6" sx={{ mt: 1 }}>
            <Link
              href={`/establishments/${business?._id}`}
              style={{ color: "#fff", textDecoration: "none" }}
              passHref
              prefetch
            >
              {name ?? "Unnamed Business"}
            </Link>
          </Typography>

          {/* show ratings stars icons */}
          <Box sx={{ display: "flex", mt: 1 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Stars key={`star-${index}`} sx={{ color: "#f1c40f" }} />
            ))}
          </Box>

          {/* Price and Location */}
          <Typography sx={{ color: "#9b59b6", fontWeight: "bold", mt: 1 }}>
            {price
              ? `${price?.category} ${price?.min} - ${price?.max}`
              : "No Price Info"}
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

          {/* Buttons Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<CallIcon />}
              sx={{ background: "#5A2A84", borderRadius: 2 }}
            >
              Call Us Now
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#9b59b6", borderRadius: 2 }}
              onClick={handleMapOpen}
            >
              Show Map
            </Button>
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
