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
import { AppDispatch, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";

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
  const { user } = useAppState(); // Assuming you have a custom hook to get user state
  const { isLoggedIn } = user; // Assuming userDetails contains the user data
  const dispatch = useAppDispatch();
  const router = useRouter(); // Assuming you're using Next.js router

  if (isLoggedIn) {
    router.push("/profile");
    return null;
  }

  // ✅ Form Submission Handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data, dispatch);
      toast.success(response.message || "Login successful!");
      //redirect to dashboard or home page using router.push("/dashboard");
      router.push("/"); // Uncomment if using Next.js router

      // Handle post-login actions here (e.g., redirect, store token)
    } catch (error: any) {
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
            "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",
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
              onClick={() => {
                // Handle Google login here
                  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
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
            Don't Have An Account?{" "}
            <Link
              href="/signup"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              passHref
              prefetch
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
