"use client";
import ThemeButton from "@/components/buttons/ThemeButton";
import { Box, Typography } from "@mui/material";
import React, { startTransition } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: React.FC<ErrorProps> = ({ error, reset }) => {
  const reload = () => {
    startTransition(() => {
      window.location.reload();
      reset();
    });
  };
  return (
    <Box className="flex justify-center flex-col items-center px-10">
      <Typography variant="h2" sx={{ fontSize: { xs: "md", md: "xl" } }}>
        Something went wrong!
      </Typography>
      <p className="my-3 max-w-[90%] mx-auto text-center">{error.message}</p>
      <ThemeButton
        text="Try Again"
        onClickEvent={() => {
          // Attempt to recover by resetting the error boundary
          reload();
        }}
      />
    </Box>
  );
};

export default GlobalError;
