"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: " rgba(78, 28, 96, 1)",
        zIndex: 9999,
      }}
    >
      <div className="dart-loader">
        <Image
          src="/images/logos/dart-loader.gif"
          alt="Loading..."
          width={100}
          height={100}
        />
      </div>
    </Box>
  );
};

export default loading;
