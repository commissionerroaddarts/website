"use client";

import Image from "next/image";
import { Box, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    id: 1,
    imageUrl: "/images/events/e1.png",
    category: "Arts & Entertainment",
    title: "California Dream Art Gallery",
    location: "Los Angeles, California, United States",
    discount: "50 - 90",
  },
  {
    id: 2,
    imageUrl: "/images/events/e2.png",
    category: "Arts & Entertainment",
    title: "California Dream Art Gallery",
    location: "Los Angeles, California, United States",
    discount: "50 - 90",
  },
  {
    id: 3,
    imageUrl: "/images/events/e3.png",
    category: "Arts & Entertainment",
    title: "California Dream Art Gallery",
    location: "Los Angeles, California, United States",
    discount: "50 - 90",
  },
];

const EntertainmentSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 6, textAlign: "center" }} className="entertainment-section">
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 4 }}
      >
        Entertainments
      </Typography>
      <Slider {...sliderSettings}>
        {events.map((event) => (
          <Box
            key={event.id}
            sx={{
              width: "100%",
              backgroundColor: "#2c2132",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            {/* Image and Discount Badge */}
            <Box sx={{ position: "relative" }}>
              <Image
                src={event.imageUrl}
                alt={event.title}
                // Apply blur effect
                width={400}
                height={250}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <Chip
                label={event.discount}
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  backgroundColor: "#7b1fa2",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "0 8px",
                  fontSize: "0.8rem",
                }}
              />
            </Box>

            {/* Details */}
            <Box sx={{ p: 2, color: "white", textAlign: "left" }}>
              <Chip
                label={event.category}
                sx={{
                  backgroundColor: "#45354f",
                  color: "white",
                  fontSize: "0.75rem",
                  marginBottom: "8px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  mb: 1,
                }}
              >
                {event.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#bdbdbd",
                  fontSize: "0.875rem",
                }}
              >
                <LocationOnIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                {event.location}
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default EntertainmentSection;
