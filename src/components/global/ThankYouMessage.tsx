"use client";
import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ThankYouMessage = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          textAlign: "center",
          background: "linear-gradient(135deg, #2a004f, #3e005f)",
          color: "white",
          borderRadius: "16px",
          p: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Submission Successful!
        </Typography>
        <Typography variant="body1" mb={3}>
          We've received your request and will get back to you soon.
        </Typography>

        {/* Success Icon */}
        <Box sx={{ mb: 3 }}>
          <Image
            src="/success-icon.png"
            alt="Success Icon"
            width={120}
            height={120}
          />
        </Box>

        {/* Back to Home Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8226e3",
            "&:hover": { backgroundColor: "#6a1cb6" },
          }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default ThankYouMessage;
