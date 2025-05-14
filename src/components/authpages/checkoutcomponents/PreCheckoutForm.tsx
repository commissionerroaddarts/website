"use client";
import React from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { PreCheckoutFormData } from "@/types/auth";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ✅ Schema (Email + PromoCode)
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  promoCode: yup.string().required("Promo code is required"),
});

const PreCheckoutForm = ({
  onSuccess,
}: {
  onSuccess: (data: { email: string; promoCode: string }) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PreCheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PreCheckoutFormData) => {
    try {
      // Your logic here (e.g., API call)
      onSuccess(data); // Call the onSuccess function with the form data
      toast.success("Promo code applied successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? "Failed to apply promo code");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          p: 4,
          borderRadius: "16px",
          background:
            "linear-gradient(139deg, #200C27 -4.72%, #4A1C5A 48.82%, #3F0F50 102.37%)",
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          {/* LEFT: Form */}
          <Grid2 size={{ xs: 12 }}>
            <Box className="flex flex-col items-center">
              <Typography variant="h5" mb={2} textAlign={"center"}>
                Apply Promo Code
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                  {/* Email Field */}
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

                  {/* Promo Code Field */}
                  <Grid2 size={{ xs: 12 }}>
                    <Controller
                      name="promoCode"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          label="Promo Code"
                          {...field}
                          error={!!errors.promoCode}
                          helperText={errors.promoCode?.message}
                        />
                      )}
                    />
                  </Grid2>

                  {/* Submit Button */}
                  <Grid2 size={{ xs: 12 }}>
                    <ThemeButton
                      text={isSubmitting ? "Applying..." : "Apply Code"}
                      type="submit"
                      disabled={isSubmitting}
                      style={{ width: "100%" }}
                    />
                  </Grid2>
                </Grid2>
              </form>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default PreCheckoutForm;
