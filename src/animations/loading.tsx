"use client";
import { Box } from "@mui/material";
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
        backgroundColor: "rgba(255, 255, 255, 1)",
        zIndex: 9999,
      }}
    >
      <div className="dart-loader">
        <div className="dart"></div>
      </div>
      <style jsx>{`
        .dart-loader {
          width: 100px;
          height: 100px;
          position: relative;
        }
        .dart {
          width: 20px;
          height: 20px;
          background: #00d1b2;
          border-radius: 50%;
          position: absolute;
          animation: dartMove 1.2s linear infinite;
        }
        @keyframes dartMove {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, 0);
          }
          50% {
            transform: translate(50px, 50px);
          }
          75% {
            transform: translate(0, 50px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </Box>
  );
};

export default loading;
