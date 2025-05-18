"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { clearInquiryData } from "@/store/slices/inquirySlice";
import { useAppState } from "@/hooks/useAppState";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ThankYouMessage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { inquiry, user } = useAppState();
  const { inquiryData } = inquiry;
  const { userDetails, isLoggedIn } = user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const name: string | null =
    inquiryData?.firstname ?? userDetails?.firstname ?? "";

  const email: string | null = inquiryData?.email ?? userDetails?.email ?? "";
  const message: string | null = inquiryData?.message ?? "";

  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get("session_id");
    setSessionId(session);

    if (!inquiryData && !session) {
      router.push("/");
    } else {
      if (session && isLoggedIn) {
        router.push("/add-establishment");
      } else {
        router.push("/signup?session_id=" + session);
      }
      setTimeout(() => dispatch(clearInquiryData()), 8000);
    }
  }, [inquiryData, router, dispatch]);

  if (!inquiryData && !sessionId) {
    return null;
  }

  return (
    <Container
      maxWidth="md"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
          borderRadius: "20px",
          p: isMobile ? 4 : 6,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <motion.div
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textTransform="capitalize"
          >
            Thank You, {name}!
          </Typography>
        </motion.div>

        {sessionId ? (
          <>
            <motion.div
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h5" fontWeight="500" mb={2}>
                🎉 Your payment was successful!
              </Typography>
            </motion.div>
            <motion.div
              custom={2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="body1">
                A confirmation has been sent to <strong>{email}</strong>.
              </Typography>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h6" mb={2}>
                We’ve received your message:
              </Typography>
              <Typography
                variant="body1"
                fontStyle="italic"
                mb={3}
                sx={{ color: "text.secondary" }}
              >
                "{message}"
              </Typography>
            </motion.div>
            <motion.div
              custom={2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="body1">
                We’ll get back to you at <strong>{email}</strong> soon.
              </Typography>
            </motion.div>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ThankYouMessage;
