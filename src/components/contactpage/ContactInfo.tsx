import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import FadeInSection from "@/animations/sections/FadeInSection";

const contactValues = [
  {
    icon: "/images/icons/email.svg",
    title: "Email Address",
    text: "info@roaddarts.com",
  },
  {
    icon: "/images/icons/phone.svg",
    title: "Phone Number",
    text: "021-123-4567",
  },
  {
    icon: "/images/icons/location.svg",
    title: "Location",
    text: "159 Algonquin Street, Brockton, MA 02302",
  },
];

const ContactInfo = () => {
  return (
    <FadeInSection xOffset={-30} delay={0.5}>
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
            <Typography variant="body2">{info.text}</Typography>
          </Box>
        </Box>
      ))}
    </FadeInSection>
  );
};

export default ContactInfo;
