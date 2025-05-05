"use client";
import React from "react";
import { Grid2, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { submitContactForm } from "@/services/contactService";
import { Inquiry } from "@/types/contactUs";
import FadeInSection from "@/animations/sections/FadeInSection";
import { useRouter } from "next/navigation";
import { setInquiryData } from "@/store/slices/inquirySlice";
import { useAppDispatch } from "@/store";

// ✅ Form Validation Schema
const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const dispatch = useAppDispatch(); // Assuming you have a custom hook to get user state

  // ✅ Form Submit Handler
  const onSubmit = async (data: Inquiry) => {
    try {
      const response = await submitContactForm(data);
      toast.success(response.message ?? "Form submitted successfully!");
      dispatch(setInquiryData(data)); // Store data in Redux
      router.push("/thank-you");
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.error ?? "Failed to submit form.");
    }
  };

  return (
    <FadeInSection xOffset={30} delay={0.5}>
      <Paper
        sx={{
          borderRadius: "16px",
          background:
            "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",
        }}
        className="py-8 px-4 md:px-8"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            {/* First Name */}
            <Grid2 size={{ xs: 12, md: 6 }}>
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
            <Grid2 size={{ xs: 12, md: 6 }}>
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

            {/* Phone Number */}
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

            {/* Email Address */}
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

            {/* Message */}
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Type your message"
                    multiline
                    rows={4}
                    {...field}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ThemeButton
                text={isSubmitting ? "Submitting..." : "Submit Now"}
                type="submit"
                disabled={isSubmitting}
              />
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </FadeInSection>
  );
};

export default ContactForm;
