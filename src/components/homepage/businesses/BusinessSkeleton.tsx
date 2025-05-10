"use client";
import React from "react";
import { Box, Grid2, Skeleton, Typography } from "@mui/material";

const BusinessSkeleton = ({ count = 3 }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mb: 5,
    }}
  >
    <Typography variant="h4" gutterBottom>
      <Skeleton width={250} height={40} />
    </Typography>

    <Grid2
      container
      spacing={4}
      sx={{ mt: 2, justifyContent: "center", width: "100%" }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Grid2 size={{ xs: 12 }} key={index}>
          <Box
            sx={{
              width: "100%",
              height: 150,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 1,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>
        </Grid2>
      ))}
    </Grid2>
  </Box>
);

export default BusinessSkeleton;
