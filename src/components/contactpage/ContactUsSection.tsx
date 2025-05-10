import React from "react";
import { Container, Grid2, Typography } from "@mui/material";
import FadeInSection from "@/animations/sections/FadeInSection";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactUsSection = () => {
  return (
    <Container maxWidth="lg">
      <FadeInSection>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" component="p" gutterBottom>
          Whether you have inquiries about listings, partnerships, or support,
          we&#39;re here to assist you.
        </Typography>
      </FadeInSection>

      <Grid2 container alignItems="center" mt={4}>
        {/* Contact Info */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ContactInfo />
        </Grid2>

        {/* Contact Form */}
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ContactForm />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ContactUsSection;
