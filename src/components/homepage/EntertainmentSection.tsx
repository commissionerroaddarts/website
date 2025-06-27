"use client";

import Image from "next/image";
import { Box, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const events = [
  {
    id: 1,
    imageUrl: "/images/events/e1.png", // make sure to place this image in the correct folder
    title: "Team Dart 2026 (NDA)",
    location: "Westgate Las Vegas Resort & Casino, Las Vegas",
    date: "May 7–13, 2026",
    description:
      "Premier soft-tip darts event with singles, doubles, mixed, and team formats. Includes Pink Ladies tournament and referee certification. Open to NDA-sanctioned players.",
  },
  {
    id: 2,
    imageUrl: "/images/events/e2.png", // make sure to place this image in the correct folder
    title: "Las Vegas Open 2026",
    location: "Tuscany Suites and Casino, Las Vegas",
    date: "January 16–18, 2026",
    description:
      "A WDF Gold-ranked steel-tip darts tournament by ADO. Running since 1978, it hosts top international players in men’s and women’s singles competitions.",
  },
  {
    id: 3,
    imageUrl: "/images/events/e3.png", // make sure to place this image in the correct folder
    title: "Royal Hawaiian Invitational – San Diego 2025",
    date: "Saturday, August 23, 2025",
    location: "Fleet Reserve 70, San Diego, California",
    description:
      "Get ready to bring your best game to the Royal Hawaiian Invitational, a one-day darts event packed with action, competition, and island flair.\nFeaturing:\n\n🌴 Mixed Triples\n🌴 Mixed Doubles\n🌴 Mixed Singles",
  },
];

const EntertainmentSection = () => {
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: number]: boolean;
  }>({});
  const toggleDescription = (id: number) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        Upcoming Events
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
              minHeight: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                label={event.date}
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  mb: 1,
                  fontSize: "0.7rem",
                }}
              >
                {event.description.length > 100 && !expandedEvents[event.id] ? (
                  <>{event.description.slice(0, 100)}...</>
                ) : (
                  <>{event.description}</>
                )}
                {event.description.length > 100 && (
                  <button
                    type="button"
                    className="!text-white cursor-pointer ml-1 underline"
                    onClick={() => toggleDescription(event.id)}
                  >
                    {expandedEvents[event.id] ? "Show Less" : "Show More"}
                  </button>
                )}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#bdbdbd",
                  fontSize: "0.7rem",
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
