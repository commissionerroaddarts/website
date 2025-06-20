"use client";
import React from "react";
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
import { loginUser } from "@/services/authService"; // API Service
import { LoginFormData } from "@/types/auth";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { Google } from "@mui/icons-material";
import Link from "next/link";
import { useAppDispatch } from "@/store";
import { useSearchParams } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import { baseUrl } from "@/constants/baseUrl";

// ✅ Validation Schema
const schema = yup.object().shape({
  identifier: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const { plan } = useAppState(); // Assuming you have a custom hook to get user state
  const { selectedPlan } = plan; // Assuming you have a custom hook to get user state
  const dispatch = useAppDispatch();
  const search = useSearchParams(); // Assuming you're using Next.js router
  const businessSlug = search.get("business"); // Get the business ID from the URL
  const sendMessageId = search.get("message"); // Get the business ID from the URL
  const page = search.get("page"); // Get the page from the URL
  const isFromBusinessPage = page === "main"; // Check if the page is the main business page
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data, dispatch);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      // ✅ Redirect user based on conditional logic using window
      if (selectedPlan) {
        window.location.href = "/checkout";
      } else if (businessSlug) {
        if (isFromBusinessPage) {
          window.location.href = `/establishments/${businessSlug}`;
        } else {
          window.history.back(); // goes back to the previous page
        }
      } else if (sendMessageId) {
        window.location.href = `/send-message/${sendMessageId}`;
      } else {
        window.location.href = "/"; // fallback
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ??
          error.response?.data?.error ??
          error.response?.data ??
          "Login failed. Please try again."
      );
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login here
    window.location.href = `${baseUrl}/auth/google`;
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
          <Grid2 container spacing={2}>
            {/* Email */}
            <Grid2 size={{ xs: 12 }}>
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

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Logging in..." : "Login"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                // sx={{ width: "100%" }}
              />
            </Grid2>
          </Grid2>
        </form>
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
              onClick={handleGoogleLogin}
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

        <Box
          mt={2}
          className="flex flex-col md:flex-row gap-2 justify-between "
        >
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              href={
                businessSlug ? `/signup?business=${businessSlug}` : "/signup"
              }
              style={{ fontWeight: "bold" }}
              passHref
              prefetch
            >
              Sign up
            </Link>
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              href="/forget-password"
              style={{ fontWeight: "bold" }}
              passHref
              prefetch
            >
              Forgot Password?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
