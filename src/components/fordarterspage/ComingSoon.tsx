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
          <CardContent className="flex flex-col items-center">
            {/* <Typography
              variant="h3"
              gutterBottom
              color="white"
              fontWeight={700}
              textAlign={"center"}
            >
              For Darters
            </Typography> */}
            <Chip
              label="Coming Soon"
              color="secondary"
              sx={{
                fontWeight: 600,
                fontSize: 35,
                mb: 2,
                padding: "2rem 3rem",
              }}
              size="medium"
            />
            <Typography
              variant="h6"
              sx={{ color: "white!important", fontSize: 17 }}
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              On the road or close to home?
              <br /> Post a match request to the Road Darts community.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
