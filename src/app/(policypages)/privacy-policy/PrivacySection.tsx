"use client";
import { Container, Typography, Paper, Link, Box } from "@mui/material";
import { Globe, Mail, Phone } from "lucide-react";

const PrivacySection = () => {
  return (
    <Container
      sx={{
        maxWidth: { xs: "lg", lg: "md" },
      }}
    >
      <Paper
        elevation={3}
        className="p-6 md:p-10 rounded-xl"
        sx={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Privacy Policy
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date:</strong> June 1, 2025
        </Typography>

        <Box className="mb-5">
          <Typography variant="h4" sx={{ margin: 0, color: "white" }}>
            Road Darts LLC
          </Typography>

          <Link
            href="https://maps.google.com/?q=14026+Stoney+Gate+Pl,+San+Diego,+CA+92128"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: "white!important" }}
          >
            14026 Stoney Gate Pl, San Diego, CA 92128
          </Link>
        </Box>

        <Typography variant="h6" className="mt-10 mb-2 font-semibold">
          1. Information We Collect
        </Typography>
        <Typography gutterBottom>
          We may collect the following:
          <ul className="list-disc pl-5 mt-2">
            <li>Your name, email, and contact details</li>
            <li>Device data (browser, location)</li>
            <li>Payment and usage info (securely handled)</li>
          </ul>
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          2. Use of Information
        </Typography>
        <Typography gutterBottom>
          We use your information to:
          <ul className="list-disc pl-5 mt-2">
            <li>Provide and improve our services</li>
            <li>Respond to support requests</li>
            <li>Prevent fraud and secure our platform</li>
          </ul>
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          3. Sharing of Data
        </Typography>
        <Typography gutterBottom>
          We do <strong>not</strong> sell or rent your personal data. Limited
          third-party services (like payments) may receive only what’s needed
          for operation.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          4. Payment Security
        </Typography>
        <Typography gutterBottom>
          We use{" "}
          <Link
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: "white!important", textDecoration: "underline" }}
          >
            Stripe
          </Link>{" "}
          for payment processing. We never store your card details. Please
          review{" "}
          <Link
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: "white!important", textDecoration: "underline" }}
          >
            Stripe’s Privacy Policy
          </Link>
          .
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          5. Cookies
        </Typography>
        <Typography gutterBottom>
          We use cookies to keep you signed in and improve your experience. You
          can manage cookies in your browser settings.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          6. Data Security
        </Typography>
        <Typography gutterBottom>
          We use SSL and industry-standard encryption. No system is 100% secure,
          but we work hard to keep your data safe.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          7. Your Rights
        </Typography>
        <Typography gutterBottom>
          You may update, delete, or request access to your data at any time.
          Contact us via email or your account dashboard.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          8. Children’s Privacy
        </Typography>
        <Typography gutterBottom>
          Users must be 18+ years old. We do not knowingly collect data from
          children.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          9. Changes
        </Typography>
        <Typography gutterBottom>
          Policy updates will be posted here and emailed if significant.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          10. Contact Us
        </Typography>
        <Box className="flex flex-col gap-2 mt-2">
          <Box className="flex items-center gap-1">
            <Mail className="inline" color="white" size={20} />
            <Link
              href="mailto:privacy@roaddarts.com"
              underline="hover"
              sx={{ color: "white!important" }}
            >
              privacy@roaddarts.com
            </Link>
          </Box>

          <Box className="flex items-center gap-1">
            <Globe className="inline" color="white" size={20} />
            <Link
              href="https://www.roaddarts.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: "white!important" }}
            >
              www.roaddarts.com
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacySection;
