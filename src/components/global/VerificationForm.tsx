"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid2,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";

interface VerificationFormProps {
  email: string;
  onVerified: () => void;
}

interface VerificationFormPopupProps {
  open: boolean;
  email: string;
  onVerified: () => void;
}

export default function VerificationFormPopup({
  open,
  email,
  onVerified,
}: Readonly<VerificationFormPopupProps>) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => {}}
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <DialogContent
        sx={{
          paddig: 0,
        }}
      >
        <VerificationForm email={email} onVerified={onVerified} />
      </DialogContent>
    </Dialog>
  );
}

function VerificationForm({
  email,
  onVerified,
}: Readonly<VerificationFormProps>) {
  const [code, setCode] = useState<string[]>(["5", "6", "", ""]);
  const [timer, setTimer] = useState(25);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if current one is filled
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current is empty
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" && target.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      // Reset code and timer
      setCode(["", "", "", ""]);
      setTimer(25);
      // Here you would also trigger the actual resend API call
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      // Handle verification logic here

      onVerified();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        textAlign: "center",
        py: 4,
        px: 2,
        background:
          "linear-gradient(151.12deg, rgba(127, 50, 153, 0.83) -10.86%, #15051B 94.14%)",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="white">
        Verify Your Email
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            position: "relative",
            height: 256,
            width: 256,
            mx: "auto",
          }}
        >
          <Image
            src="/images/icons/2FA.png"
            alt="Verification illustration"
            width={256}
            height={256}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <Typography variant="body1" color="white" gutterBottom>
        We&apos;ve sent a 4-digit code to your email.
      </Typography>
      <Typography variant="body1" color="white" gutterBottom>
        {email}
      </Typography>

      <Typography variant="body1" color="white" gutterBottom>
        Please enter it below to continue.
      </Typography>

      <Grid2 container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {code.map((digit, index) => (
          <Grid2 key={digit}>
            <Paper
              elevation={3}
              sx={{
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "primary.dark",
              }}
            >
              <TextField
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) =>
                  handleKeyDown(
                    index,
                    e as React.KeyboardEvent<HTMLInputElement>
                  )
                }
                slotProps={{
                  htmlInput: {
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "2rem",
                      color: "white",
                    },
                  },
                }}
                variant="standard"
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: "white" },
                }}
              />
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      <Typography variant="body2" color="white" gutterBottom>
        Didn&apos;t get the code?{" "}
        <Button
          onClick={handleResend}
          disabled={timer > 0}
          sx={{
            color: "pink",
            textDecoration: timer > 0 ? "none" : "underline",
          }}
        >
          Resend in {timer > 0 ? `${timer}s` : ""}
        </Button>
      </Typography>

      <Button
        onClick={handleVerify}
        variant="contained"
        color="secondary"
        sx={{
          px: 4,
          py: 2,
          fontSize: "1rem",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Verify
      </Button>
    </Box>
  );
}
