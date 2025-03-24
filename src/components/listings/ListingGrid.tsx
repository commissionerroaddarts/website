"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Grid2,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import CallIcon from "@mui/icons-material/Call";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThemeOutlineButton from "../buttons/ThemeOutlineButton";

interface ListingCardProps {
  id?: string | number;
  isOpen?: boolean;
  image: string;
  category: string;
  status?: string;
  title: string;
  reviewText?: string;
  priceRange: string;
  location: string;
}

function ListingCard({
  image,
  category,
  status,
  title,
  reviewText,
  priceRange,
  location,
}: ListingCardProps) {
  return (
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
        gap: 3,
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        sx={{ width: 480, borderRadius: 2 }}
        image={image}
        alt={title}
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
            label={category}
            color="secondary"
            sx={{ backgroundColor: "#5A2A84" }}
          />
          <Typography
            sx={{ display: "flex", alignItems: "center", color: "#9b59b6" }}
          >
            <CheckCircleIcon sx={{ fontSize: 18, mr: 0.5 }} /> {status}
          </Typography>
        </Box>

        {/* Title and Review Section */}
        <Typography variant="h6" sx={{ mt: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#2ecc71", fontSize: 14 }}>
          {reviewText}
        </Typography>

        {/* Price and Location */}
        <Typography sx={{ color: "#9b59b6", fontWeight: "bold", mt: 1 }}>
          {priceRange}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", color: "#ccc", mt: 0.5 }}
        >
          <RoomIcon sx={{ fontSize: 16, mr: 0.5 }} /> {location}
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
          >
            Show Map
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ListingGrid({
  listings,
}: {
  listings: ListingCardProps[];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Explore Our Listings
      </Typography>

      <Grid2
        container
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            image={listing.image}
            category={listing.category}
            status={listing.isOpen ? "Open" : "Closed"}
            title={listing.title}
            reviewText="Excellent"
            priceRange={listing.priceRange}
            location={listing.location}
          />
        ))}
      </Grid2>

      <ThemeOutlineButton text="View All Listings" />
    </Box>
  );
}
