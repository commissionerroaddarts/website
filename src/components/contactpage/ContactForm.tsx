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
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// ✅ Validation Schema remains unchanged
const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters allowed")
    .min(2)
    .max(50),
  lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters allowed")
    .min(2)
    .max(50),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10,15}$/, "Must be 10–15 digits"),
  email: yup.string().email().required().max(100),
  message: yup.string().required().min(10).max(500),
});

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha(); // ✅ v3 hook

  const onSubmit = async (data: Inquiry) => {
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not available.");
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form_submit"); // 🧠 Use an action name
      console.log({ token });
      if (!token) {
        toast.error("Failed reCAPTCHA verification.");
        return;
      }

      const response = await submitContactForm({
        ...data,
        // recaptchaToken: token,
      });

      toast.success(response.message ?? "Form submitted!");
      dispatch(setInquiryData(data));
      router.push("/thank-you");
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? "Submission failed.");
    }
  };

  return (
    <FadeInSection xOffset={30} delay={0.5}>
      <Paper
        sx={{
          borderRadius: "16px",
          background:
            "linear-gradient(139deg, #200C27 -4.72%, #4A1C5A 48.82%, #3F0F50 102.37%)",
        }}
        className="py-8 px-4 md:px-8"
      >
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

            {/* Submit */}
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
