"use client";
import { IconButton } from "@mui/material";
import { X } from "lucide-react";
import React from "react";

const CloseIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "white",
        zIndex: 100,
        background: "#ec6dff",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background 0.3s, transform 0.3s",
        padding: "0.5rem",
        "&:hover": {
          opacity: 0.9,
        },
      }}
      onClick={onClick}
      aria-label="Close"
    >
      <X className="h-5 w-5 text-white" />
    </IconButton>
  );
};

export default CloseIconButton;
