"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Rating, Grid2 } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ThemeButton from "@/components/buttons/ThemeButton";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";

export default function EstablishmentReview() {
  const [value, setValue] = useState<number | null>(null);

  return (
    <Box
      sx={{
        backgroundColor: "#1A0120",
        p: 2,
        borderRadius: 2,
        color: "white",
        mt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Write a review
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Rating
            name="rating"
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            sx={{
              color: "white",
              "& .MuiRating-iconEmpty": {
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            variant="outlined"
            placeholder="Your Rating"
            fullWidth
            slotProps={{
              input: {
                style: {
                  color: "white",
                  background: "#C4C4C41A", // opacity: 0.5,
                  borderRadius: 8,
                  border: "1px solid white",
                },
              },
            }}
          />
        </Grid2>
      </Grid2>

      <Box className="flex items-center gap-4 mt-4">
        <ThemeButton text="Post Your Review" />
        <ThemeOutlineButton
          text="Select Images"
          icon={<PhotoCamera fontSize="small" />}
        />
        {/* Select Images <input hidden accept="image/*" multiple type="file" />
        </Button> */}
      </Box>
    </Box>
  );
}
