import { Box, List, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const footerLinks = [
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/terms-and-conditions",
    label: "Terms & Conditions",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
];

const Footer = () => {
  return (
    <Box className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center px-3 py-1 mt-10 bg-[#15051B]">
      <Typography variant="h6" sx={{ fontSize: "0.8rem", color: "white" }}>
        Copyright &copy; {new Date().getFullYear()} Road Darts LLC. |{" "}
        <Link
          href="https://www.google.com/maps/dir/?api=1&destination=11835+Carmel+Mountain+Rd,+San+Diego,+CA+92128"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
        >
          11835 Carmel Mountain Rd San Diego, CA  92128
        </Link>
      </Typography>

      <List className="flex gap-4 mt-2 md:mt-0">
        {footerLinks.map(({ href, label }) => {
          return (
            <Link
              key={href}
              href={href}
              passHref
              prefetch
              style={{ color: "white", fontSize: "0.8rem" }}
            >
              {label}
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default Footer;
