import React from "react";
import { Box, Typography, TextField, Button, Rating } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function EstablishmentReview() {
  const [value, setValue] = React.useState<number | null>(null);

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
      <Box display="flex" alignItems="center" gap={2}>
        <Rating
          name="rating"
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          sx={{ color: "#FFD700" }}
        />
        <TextField
          variant="outlined"
          placeholder="Your rating"
          InputProps={{
            style: {
              color: "white",
              background:
                "linear-gradient(109.46deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
              opacity: 0.5,
              borderRadius: 8,
            },
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{ color: "white", borderColor: "white", borderRadius: 8 }}
        >
          Select Images
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(109.46deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
            opacity: 0.5,
            borderRadius: 8,
          }}
        >
          Browse
        </Button>
      </Box>
    </Box>
  );
}
