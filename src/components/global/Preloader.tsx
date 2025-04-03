"use client";
import { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";

interface PreloaderProps {
  duration?: number;
  children: ReactNode; // ✅ Accept children to wrap content
}

const Preloader = ({ duration = 2000, children }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {isVisible && (
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
            <img
              src="/images/logos/dart-loader.gif"
              alt="Loading..."
              width={120}
              height={120}
            />
          </div>
        </Box>
      )}

      {/* ✅ Always render children to ensure metadata and content load */}
      <div style={{ display: isVisible ? "none" : "block" }}>{children}</div>
    </>
  );
};

export default Preloader;
