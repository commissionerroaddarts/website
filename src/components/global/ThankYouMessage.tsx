"use client";
import React, { useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { clearInquiryData } from "@/store/slices/inquirySlice";
import { useAppState } from "@/hooks/useAppState";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";

const ThankYouMessage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { inquiry } = useAppState();
  const { inquiryData } = inquiry;

  useEffect(() => {
    if (!inquiryData) {
      router.push("/"); // Redirect if no form data found
    } else {
      setTimeout(() => dispatch(clearInquiryData()), 5000); // Clear after 5 seconds
    }
  }, [inquiryData, router, dispatch]);

  if (!inquiryData) {
    return null;
  } // Prevent flash before redirect

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
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Thank You, {inquiryData?.firstname + " " + inquiryData?.lastname}!
        </Typography>
        <Typography variant="h6" mb={3}>
          We received your message: "{inquiryData?.message}".
        </Typography>
        <Typography variant="h6">
          We'll contact you at {inquiryData?.email} soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYouMessage;
