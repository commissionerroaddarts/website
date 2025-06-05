"use client";
import { useState, useEffect, ReactNode } from "react";
import { Box, Fade } from "@mui/material";

interface PreloaderProps {
  duration?: number;
  children?: ReactNode;
}

const Preloader = ({ duration = 2000, children }: PreloaderProps) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <Fade in={showOverlay} timeout={500} unmountOnExit>
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
            background: "rgba(78, 28, 96, 0.6)",
            zIndex: 1300, // Higher than most elements but avoids locking everything
          }}
        >
          <img
            src="/images/logos/dart-loader.gif"
            alt="Loading..."
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Fade>

      {children}
    </>
  );
};

export default Preloader;
