"use client";
import React from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { forgotPassword } from "@/services/authService"; // API Service
import { ForgotPasswordFormData } from "@/types/auth";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Form Submission Handler
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data);

      if (response?.status !== 200) {
        toast.error("Failed to send reset link. Please try again.");
        return;
      }

      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.error ??
          error.response?.data?.message ??
          "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 4,
          borderRadius: "16px",
          textAlign: "center",
          background:
            " linear-gradient(139deg, #200C27 -4.72%, #4A1C5A 48.82%, #3F0F50 102.37%)",
        }}
      >
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={3}
            fontSize={13}
            gutterBottom
          >
            Enter your email address to receive a password reset link.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {/* Email */}
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Email Address"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Sending..." : "Send Reset Link"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              />
            </Grid2>
          </Grid2>
        </form>

        <Box mt={2} className="flex  justify-center">
          <Typography variant="body2" align="center">
            Remembered your password?{" "}
            <Link
              href="/login"
              style={{ fontWeight: "bold" }}
              passHref
              prefetch
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordForm;
