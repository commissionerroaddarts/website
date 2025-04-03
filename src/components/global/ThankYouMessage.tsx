"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const ThankYouMessage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          background: "transparent",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        {/* Success Icon */}
        {/* <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Image
            src="/images/icons/submission.gif"
            alt="Success Icon"
            width={200}
            height={200}
          />
        </Box> */}

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Submission Successful!
        </Typography>
        <Typography variant="h6" mb={3}>
          We've received your request and will get back to you soon.
        </Typography>

        {/* Back to Home Button */}
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: "#8226e3",
            "&:hover": { backgroundColor: "#6a1cb6" },
          }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button> */}
      </Box>
    </Container>
  );
};

export default ThankYouMessage;
