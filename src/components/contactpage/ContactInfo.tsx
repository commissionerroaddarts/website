import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import FadeInSection from "@/animations/sections/FadeInSection";
import Link from "next/link";

const contactValues = [
  {
    icon: "/images/icons/email.svg",
    title: "Email Address",
    text: "support@roaddarts.com",
    href: "mailto:support@roaddarts.com",
  },
  {
    icon: "/images/icons/location.svg",
    title: "Location",
    text: "14026 Stoney Gate PL - San Diego, CA 92128",
    href: "https://www.google.com/maps/search/?api=1&query=14026+Stoney+Gate+PL,+San+Diego,+CA+92128",
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
