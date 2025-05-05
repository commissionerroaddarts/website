import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import FadeInSection from "@/animations/sections/FadeInSection";
import Link from "next/link";

const contactValues = [
  {
    icon: "/images/icons/email.svg",
    title: "Email Address",
    text: "info@roaddarts.com",
    href: "mailto:info@roaddarts.com",
  },
  {
    icon: "/images/icons/phone.svg",
    title: "Phone Number",
    text: "021-123-4567",
    href: "tel:021-123-4567",
  },
  {
    icon: "/images/icons/location.svg",
    title: "Location",
    text: "159 Algonquin Street, Brockton, MA 02302",
    href: "https://www.google.com/maps/place/159+Algonquin+St,+Brockton,+MA+02302/@42.0836791,-71.0206583,17z/data=!3m1!4b1!4m6!3m5!1s0x89e3a2f8c7d9f5b7:0x8c2a2f8c7d9f5b7!8m2!3d42.0836791!4d-71.0184696!16s%2Fg%2F11c1gqjv_4",
  },
];

const ContactInfo = () => {
  return (
    <FadeInSection xOffset={-30} delay={0.5}>
      {contactValues.map((info, index) => (
        <Box key={info.href} display="flex" alignItems="center" mb={3}>
          <Box
            sx={{
              background: "#8224E3",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              mr: 2,
            }}
          >
            <Image src={info.icon} alt="icon" width={20} height={20} />
          </Box>
          <Box>
            <Typography variant="h6">{info.title}</Typography>
            <Link
              href={info.href}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body2">{info.text}</Typography>
            </Link>
          </Box>
        </Box>
      ))}
    </FadeInSection>
  );
};

export default ContactInfo;
