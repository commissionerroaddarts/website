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
import { registerUser } from "../../services/authService"; // API Service
import { SignupFormData } from "../../types/auth";
import CustomInput from "../../components/global/CustomInput";
import ThemeButton from "../../components/buttons/ThemeButton";
import Link from "next/link";
import { Google } from "@mui/icons-material";

// ✅ Validation Schema
const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Form Submission Handler
  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await registerUser(data);
      toast.success(response.message || "Signup successful!");
      // Handle post-signup actions here (e.g., redirect, store token)
    } catch (error: Error | any) {
      toast.error(
        error.response?.data?.error || "Signup failed. Please try again."
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
            "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",
        }}
      >
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={3}
            fontSize={13}
            gutterBottom
          >
            Please fill in the details below to create your account.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="First Name"
                    {...field}
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                  />
                )}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Last Name"
                    {...field}
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Phone Number"
                    {...field}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
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
                text={isSubmitting ? "Signing up..." : "Sign Up"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>

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
              Already Have An Account?{" "}
              <Link
                href="/login"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
                passHref
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;
