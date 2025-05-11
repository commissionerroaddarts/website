"use client";
import { Container, Typography, Paper, Link, Box } from "@mui/material";
import { Mail, Globe } from "lucide-react";

const TermsAndConditionsSection = () => {
  return (
    <Container sx={{ maxWidth: { xs: "lg", lg: "md" } }}>
      <Paper
        elevation={3}
        className="p-6 md:p-10 rounded-xl"
        sx={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <Typography
          variant="h4"
          className="font-bold mb-6 text-center text-white"
        >
          Terms and Conditions
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Effective Date:</strong> June 1, 2025
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          1. Eligibility
        </Typography>
        <Typography gutterBottom>
          You must be at least 18 years old or the age of majority in your
          jurisdiction, whichever is greater, to use our Platform.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          2. Account Registration
        </Typography>
        <Typography gutterBottom>
          To access certain features, you may need to create an account. You
          agree to provide accurate and complete information and to keep it
          updated. You are responsible for maintaining the confidentiality of
          your credentials.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          3. Subscription and Payment
        </Typography>
        <Typography gutterBottom>
          We offer paid subscription plans. All payments are securely processed
          through{" "}
          <Link
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white!important", textDecoration: "underline" }}
          >
            Stripe
          </Link>
          . We do not collect or store your card or banking information.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          4. Privacy and Data Protection
        </Typography>
        <Typography gutterBottom>
          We value your privacy:
          <ul className="list-disc pl-5 mt-2">
            <li>We do not sell or share your personal data.</li>
            <li>We collect only necessary data for functionality.</li>
            <li>
              We do not retain any PCI data. All transactions are handled via
              Stripe.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          5. Appropriate Conduct
        </Typography>
        <Typography gutterBottom>
          You agree to:
          <ul className="list-disc pl-5 mt-2">
            <li>Treat all users respectfully.</li>
            <li>Avoid posting offensive, explicit, or violent content.</li>
            <li>Not impersonate others or misrepresent affiliations.</li>
            <li>Not engage in activity that harms or disrupts the Platform.</li>
          </ul>
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          6. Content Ownership
        </Typography>
        <Typography gutterBottom>
          You retain ownership of your content but grant Road Darts LLC a
          royalty-free license to use and promote it on the Platform.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          7. Termination
        </Typography>
        <Typography gutterBottom>
          We may suspend or terminate your access without notice if you violate
          these Terms or harm the community.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          8. Disclaimer of Warranties
        </Typography>
        <Typography gutterBottom>
          The Platform is provided “as is.” We do not guarantee accuracy,
          completeness, or availability at all times.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          9. Limitation of Liability
        </Typography>
        <Typography gutterBottom>
          We are not liable for indirect or consequential damages resulting from
          use or inability to use the Platform.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          10. Modifications to Terms
        </Typography>
        <Typography gutterBottom>
          We may update these Terms at any time. Continued use means you accept
          the updated Terms.
        </Typography>

        <Typography variant="h6" className="mt-6 mb-2 font-semibold">
          11. Contact Information
        </Typography>
        <Box className="flex flex-col gap-2 mt-2">
          <Box className="flex items-center gap-1">
            <Mail className="inline" color="white" size={20} />
            <Link
              href="mailto:support@roaddarts.com"
              underline="hover"
              sx={{ color: "white!important" }}
            >
              support@roaddarts.com
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

export default TermsAndConditionsSection;
