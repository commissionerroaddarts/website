"use client";
import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../global/CustomInput";
import ThemeButton from "../buttons/ThemeButton";
import { submitContactForm } from "../../services/contactService";
import { Inquiry } from "../../types/contactUs";

// ✅ Initialize toast notifications
// toast.configure();

const contactValues = [
  {
    icon: "/images/icons/email.svg",
    title: "Email Address",
    text: "info@roaddarts.com",
  },
  {
    icon: "/images/icons/email.svg",
    title: "Phone Number",
    text: "021-123-4567",
  },
  {
    icon: "/images/icons/email.svg",
    title: "Location",
    text: "159 Algonquin Street, Brockton, MA 02302",
  },
];

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

const ContactUsSection = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Form Submit Handler
  const onSubmit = async (data: Inquiry) => {
    try {
      const response = await submitContactForm(data);
      toast.success(response.message || "Form submitted successfully!");
      reset(); // Reset form on success
    } catch (error: Error | any) {
      toast.error(error.response?.data?.error || "Failed to submit form.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Whether you have inquiries about listings, partnerships, or support,
        we&#39;re here to assist you.
      </Typography>

      <Grid container spacing={4} alignItems="center" mt={3}>
        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          {contactValues.map((info, index) => (
            <Box key={index} display="flex" alignItems="center" mb={3}>
              <Box
                sx={{
                  background: "#8224E3",
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  mr: 2,
                }}
              >
                <Image src={info.icon} alt="icon" width={30} height={30} />
              </Box>
              <Box>
                <Typography variant="h6">{info.title}</Typography>
                <Typography variant="body2"> {info.text}</Typography>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "16px",
              background:
                "linear-gradient(112.11deg, rgba(201, 201, 201, 0.8) 2.19%, rgba(196, 196, 196, 0.1) 95.99%)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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

                {/* Phone Number */}
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

                {/* Email Address */}
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

                {/* Message */}
                <Grid item xs={12}>
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
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} textAlign="center">
                  <ThemeButton
                    text={isSubmitting ? "Submitting..." : "Submit Now"}
                    type="submit"
                    disabled={isSubmitting}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsSection;
