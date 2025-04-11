"use client";
import React, { useEffect, useState } from "react";
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  console.log(sessionId);
  // ✅ Use useEffect to get query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSessionId(urlParams.get("session_id"));

    if (!inquiryData && !urlParams.get("session_id")) {
      router.push("/"); // Redirect if no form data found
    } else {
      setTimeout(() => dispatch(clearInquiryData()), 8000);
    }
  }, [inquiryData, router, dispatch]);

  if (!inquiryData) {
    return null;
  }

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
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          textTransform={"capitalize"}
        >
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
