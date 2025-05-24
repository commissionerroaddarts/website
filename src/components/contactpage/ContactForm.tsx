"use client";
import React, { useRef, useState } from "react";
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
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchaVerify } from "@/services/authService";
import { phoneSchema } from "@/yupSchemas/phoneSchema";

// ✅ Schema unchanged
const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/)
    .min(2)
    .max(50),
  lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/)
    .min(2)
    .max(50),
  phone: phoneSchema,
  email: yup.string().email("Email is required").required().max(100),
  message: yup.string().required("Message is required").min(10).max(500),
});

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({ resolver: yupResolver(schema) });

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Inquiry) => {
    if (!recaptchaToken) {
      toast.error("Please verify reCAPTCHA");
      return;
    }

    try {
      const recaptchaResponse = await recaptchaVerify(recaptchaToken);
      if (!recaptchaResponse) {
        toast.error("reCAPTCHA verification failed");
        return;
      }

      const response = await submitContactForm({
        ...data,
      });

      toast.success(response.message ?? "Form submitted!");
      dispatch(setInquiryData(data));
      router.push("/thank-you");
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? "Submission failed.");
    } finally {
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
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
            {/* Inputs... (unchanged) */}
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

            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Phone Number"
                    type="tel"
                    {...field}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid2>

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

            {/* reCAPTCHA */}
            <Grid2 size={{ xs: 12 }} className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(token) => setRecaptchaToken(token)}
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
