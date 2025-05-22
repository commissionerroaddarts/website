"use client";
import React from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateUserPassword } from "@/services/userService"; // API Service
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import { PasswordChange } from "@/types/user";
import { useRouter } from "next/navigation";

// ✅ Validation Schema
const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  // ✅ Form Submission Handler
  const onSubmit = async (data: any) => {
    try {
      const updatedPassword: PasswordChange = {
        newPassword: data.password,
      };

      const response = await updateUserPassword(updatedPassword);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
            Reset Password
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={3}
            fontSize={13}
            gutterBottom
          >
            Enter your new password below.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {/* New Password */}
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="New Password"
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid2>

            {/* Confirm Password */}
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Confirm Password"
                    type="password"
                    {...field}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Resetting..." : "Reset Password"}
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              />
            </Grid2>
          </Grid2>
        </form>

        <Box mt={2} className="flex flex-col md:flex-row gap-2 justify-between">
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

export default ResetPasswordForm;
