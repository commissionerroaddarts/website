"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Chip, Typography } from "@mui/material";

const ComingSoon = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card
          sx={{
            p: 4,
            maxWidth: 500,
            boxShadow: 6,
            borderRadius: 4,
            background:
              "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              color="white"
              fontWeight={700}
            >
              For Darters
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Easy League & Group Boards
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Setup in Minutes, Play for Seasons...
              <br />
              <strong>No Setup Fees, Just Darts!</strong>
            </Typography>
            <Chip
              label="Coming Soon"
              color="secondary"
              sx={{ fontWeight: 600, fontSize: 16 }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
