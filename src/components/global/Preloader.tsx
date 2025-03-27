// components/Preloader.tsx
"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const Preloader = ({
  duration = 2000,
  onFinish,
}: {
  duration?: number;
  onFinish: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isVisible) return null;

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
        background: "rgba(78, 28, 96, 0.6)",
        zIndex: 9999,
      }}
    >
      <div className="dart-loader">
        <Image
          src="/images/logos/dart-loader.gif"
          alt="Loading..."
          width={120}
          height={120}
        />
      </div>
    </Box>
  );
};

export default Preloader;
