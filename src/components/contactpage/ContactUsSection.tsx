import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import CustomInput from "../global/CustomInput";
import ThemeButton from "../buttons/ThemeButton";
import Image from "next/image";

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

// Contact Us Section
const ContactUsSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Whether you have inquiries about listings, partnerships, or support,
        we're here to assist you. Fill out the form, and we’ll get back to you
        as soon as possible.
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
                  fontSize: 20,
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomInput label="First Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput label="Last Name" />
              </Grid>
              <Grid item xs={12}>
                <CustomInput label="Phone Number" />
              </Grid>
              <Grid item xs={12}>
                <CustomInput label="Email Address" />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Type your message"
                  multiline={true}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <ThemeButton text="Submit Now" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsSection;
