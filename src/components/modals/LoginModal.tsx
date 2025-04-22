"use client";
import React from "react";
import LoginForm from "../authpages/LoginForm";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className="!overflow-hidden"
      sx={{
        backdropFilter: "blur(10px)", // Add blur effect
      }}
    >
      <IconButton
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ background: "transparent" }}>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
