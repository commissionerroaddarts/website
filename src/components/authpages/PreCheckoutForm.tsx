"use client";
import React, { useState } from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { PreCheckoutFormData } from "@/types/auth";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { useAppState } from "@/hooks/useAppState";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { clearPlan } from "@/store/slices/planSlice";

// ✅ Schema (Email + PromoCode)
const getSchema = (
  isLoggedIn: boolean
): yup.ObjectSchema<PreCheckoutFormData> => {
  return yup.object({
    email: isLoggedIn
      ? yup.string().default("")
      : yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
    promoCode: yup.string().default(""),
  }) as yup.ObjectSchema<PreCheckoutFormData>;
};
const PreCheckoutForm = ({
  onSuccess,
}: {
  onSuccess: (data: { email: string; promoCode?: string }) => void;
}) => {
  const { plan, user } = useAppState(); // Assuming you have a custom hook to get user state
  const { selectedPlan } = plan; // Assuming you have a custom hook to get user state
  const { isLoggedIn } = user;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PreCheckoutFormData>({
    resolver: yupResolver(getSchema(isLoggedIn)),
  });

  const [loading, setLoading] = useState(false);

  const priceId =
    selectedPlan?.billingCycle === "monthly"
      ? selectedPlan?.prices?.monthly?.priceId
      : selectedPlan?.prices?.yearly?.priceId;
  const promoCodes = ["DARTVENUE", "DARTCLUB10", "FREEAD365"];

  const onSubmit = async (data: PreCheckoutFormData) => {
    try {
      if (!priceId) {
        toast.error("Please select a plan");
        redirect("/plans");
      }
      setLoading(true);

      if (
        selectedPlan?.name !== "Standard Plan" &&
        data.promoCode &&
        data.promoCode.toUpperCase() === "FREEAD365"
      ) {
        toast.error("Invalid promo code");
        setLoading(false);
        return;
      }

      if (
        data.promoCode &&
        !promoCodes.includes(data.promoCode.toUpperCase())
      ) {
        toast.error("Invalid promo code");
        setLoading(false);
        return;
      }
      if (data.promoCode) {
        toast.success("Promo code applied successfully!");
      }

      // Your logic here (e.g., API call)
      const formData = {
        ...data,
        email: data.email?.toLowerCase() ?? "",
      };
      onSuccess(formData); // Call the onSuccess function with the form data
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error ?? "Failed to apply promo code");
    }
  };

  const handleGoBackPlans = () => {
    dispatch(clearPlan());
    router.push("/plans");
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
          <Grid2 size={{ xs: 12 }}>
            <Box className="flex flex-col items-center">
              <Typography variant="h5" mb={1} textAlign="center">
                Unlock Free Trial with Promo Code
              </Typography>
              {/* <Typography
                variant="body1"
                mb={2}
                textAlign="center"
                sx={{ opacity: 0.8 }}
              >
                Unlock up to{" "}
                <strong>
                  {selectedPlan?.name?.toLowerCase() === "basic"
                    ? "1 month"
                    : "2 months"}{" "}
                  of free access
                </strong>{" "}
                with your promo code on the{" "}
                <strong style={{ fontWeight: 600 }}>
                  {selectedPlan?.name}
                </strong>{" "}
                plan. It's the perfect way to explore all features with zero
                upfront cost.
              </Typography> */}

              <Typography
                variant="body1"
                mb={2}
                textAlign="center"
                sx={{ opacity: 0.8 }}
              >
                Unlock Up to 1 month of free access with your promo code on the
                Basic Plan and Discounted Price on Standard and Premium Plan.
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2}>
                  {/* Email Field */}
                  {!isLoggedIn && (
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
                  )}

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
                          onChange={(e) => {
                            setValue("promoCode", e.target.value);
                          }}
                          helperText={errors.promoCode?.message}
                        />
                      )}
                    />
                  </Grid2>
                  {/* Submit Button */}
                  <Grid2 size={{ xs: 12 }}>
                    <Box className="flex gap-2 items-center">
                      <ThemeButton
                        text={"Go Back To Plans"}
                        type="button"
                        onClick={handleGoBackPlans}
                        disabled={isSubmitting || loading}
                        fontSize="0.8rem"
                        backgroundColor="#D500F9"
                        style={{ width: "100%" }}
                      />
                      <ThemeButton
                        text={
                          isSubmitting || loading
                            ? "Applying..."
                            : "Apply Code or Continue"
                        }
                        type="submit"
                        fontSize="0.8rem"
                        disabled={isSubmitting || loading}
                        style={{ width: "100%" }}
                      />
                    </Box>
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
