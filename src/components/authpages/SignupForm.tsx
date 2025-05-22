"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid2,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { recaptchaVerify, registerUser } from "@/services/authService"; // API Service
import { SignupFormData } from "@/types/auth";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import { Google } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import ReCAPTCHA from "react-google-recaptcha";
import { useAppDispatch } from "@/store";

// ✅ Validation Schema
const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must contain only letters")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\d{10,15}$/,
      "Phone number must be between 10 and 15 digits and contain only numbers"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  const { user, plan } = useAppState(); // Assuming you have a custom hook to get user state
  const { selectedPlan, email } = plan; // Assuming you have a custom hook to get user state
  const { isLoggedIn, userDetails } = user; // Assuming you have a custom hook to get user state
  // Redirect to dashboard if user is already logged in
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useAppDispatch();
  const isUserLoggedIn = isLoggedIn && userDetails?._id !== undefined;

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/profile");
    }
  }, [isUserLoggedIn]);

  // ✅ Form Submission Handler
  const onSubmit = async (data: SignupFormData) => {
    try {
      if (!recaptchaToken) {
        toast.error("Please verify reCAPTCHA");
        return;
      }

      const recaptchaResponse = await recaptchaVerify(recaptchaToken);

      if (!recaptchaResponse) {
        toast.error("reCAPTCHA verification failed");
        return;
      }

      const response = await registerUser(data, dispatch);
      if (response?.status === 201) {
        toast.success(
          response?.data?.message ??
            `We have sent a verification email at ${data.email}`
        );
        setTimeout(() => {
          if (sessionId) {
            router.push("/add-establishment"); // Redirect to login page after successful signup
          }
          if (selectedPlan) {
            router.push("/checkout"); // Redirect to login page after successful signup
          }
          if (!selectedPlan && !sessionId) {
            router.push("/plans"); // Redirect to login page after successful signup
          }
        }, 2000);
      }
      // Handle post-signup actions here (e.g., redirect, store token)
    } catch (error: any) {
      toast.error(error?.message ?? "Signup failed. Please try again.");
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
            Sign Up
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={3}
            fontSize={13}
            gutterBottom
          >
            {sessionId
              ? "Payment successful! Please complete your account setup below."
              : "Please fill in the details below to create your account."}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {/* First Name */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
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
            </Grid2>

            {/* Last Name */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
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
            </Grid2>

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
                    defaultValue={email ?? ""}
                    disabled={email ? true : false}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid2>

            {/* Phone */}
            <Grid2 size={{ xs: 12 }}>
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
            </Grid2>

            {/* Password */}
            <Grid2 size={{ xs: 12 }}>
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
            </Grid2>

            {/* reCAPTCHA */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Signing up..." : "Sign Up"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              />
            </Grid2>
          </Grid2>

          <Divider
            sx={{ my: 3, "&::before, &::after": { borderColor: "white" } }}
          >
            or
          </Divider>

          {/* Continue with Google Button */}
          <Grid2 container spacing={2} className="w-full">
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text="Continue with Google"
                startIcon={<Google sx={{ color: "black" }} />}
                onClick={() => {
                  // Handle Google login here
                  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
                }}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "20px",
                  padding: "0.8rem 0",
                  width: "100%",
                }}
              />
            </Grid2>
          </Grid2>

          <Box mt={2}>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
                passHref
                prefetch
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
