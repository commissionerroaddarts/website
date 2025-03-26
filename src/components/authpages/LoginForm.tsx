"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/authService"; // API Service
import { LoginFormData } from "../../types/auth";
import CustomInput from "../global/CustomInput";
import ThemeButton from "../buttons/ThemeButton";
import { Google } from "@mui/icons-material";
import Link from "next/link";

// ✅ Validation Schema
const schema = yup.object().shape({
  identifier: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Form Submission Handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      toast.success(response.message || "Login successful!");
      // Handle post-login actions here (e.g., redirect, store token)
    } catch (error: Error | any) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again."
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
            " linear-gradient(112.11deg, rgba(201, 201, 201, 0.8) 2.19%, rgba(196, 196, 196, 0.1) 95.99%)",
        }}
      >
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={3}
            fontSize={13}
            gutterBottom
          >
            Please enter your email and password to log in to your account. If
            you don't have an account, you can register for one.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Email */}
            <Grid item xs={12}>
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Email Address"
                    {...field}
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                  />
                )}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Password"
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Logging in..." : "Login"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                // sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </form>
        <Divider
          sx={{ my: 3, "&::before, &::after": { borderColor: "white" } }}
        >
          or
        </Divider>

        {/* Continue with Google Button */}
        <Grid container spacing={2} className="w-full">
          <Grid item xs={12} className="flex justify-center">
            <ThemeButton
              text="Continue with Google"
              startIcon={<Google sx={{ color: "black" }} />}
              onClick={() => {
                // Handle Google login here
              }}
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "20px",
                padding: "0.8rem 0",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="body2" align="center">
            Don't Have An Account?{" "}
            <Link
              href="/signup"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              passHref
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
