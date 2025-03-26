"use client";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";
import FadeInSection from "../../animations/sections/FadeInSection";

export default function AboutUsSection() {
  return (
    <Box sx={{ py: 4 }}>
      {/* Title and Description */}
      <FadeInSection>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ opacity: 0.3, fontSize: "1rem" }}
        >
          About Us
        </Typography>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Empowering Connections, Driving Success
        </Typography>
        <Typography
          variant="body1"
          align="center"
          maxWidth="md"
          margin="0 auto"
          paragraph
        >
          We bridge the gap between professionals and opportunities, fostering
          growth and innovation in every interaction.
        </Typography>
      </FadeInSection>
      {/* Content Section */}

      <Grid
        container
        spacing={4}
        alignItems="center"
        maxWidth="lg"
        margin="0 auto"
      >
        <Grid item xs={12} md={6}>
          <FadeInSection delay={0.5} xOffset={-20}>
            <Typography variant="body1" paragraph>
              At Road Darts, we believe in creating opportunities that bring
              excitement and efficiency to your work. Our platform connects
              professionals with top-tier listings, ensuring seamless
              collaboration and unmatched results.
            </Typography>

            <Typography variant="body1" paragraph>
              We are dedicated to providing a space where businesses and
              individuals can list, discover, and engage with the best services
              available. Whether you&#39;re looking for new partnerships or
              expanding your business reach, Road Darts is your trusted
              solution.
            </Typography>
            <Typography variant="body1" paragraph>
              With a growing network of professionals and companies, we continue
              to innovate and redefine how listings work in today’s fast-paced
              digital world.
            </Typography>
          </FadeInSection>
        </Grid>
        <Grid item xs={12} md={6}>
          <FadeInSection delay={0.5} xOffset={20}>
            <Image
              src="/images/banners/about-road-dart.svg"
              alt="About Us Image"
              width={400}
              height={200}
              style={{ borderRadius: "8px", width: "100%", height: "auto" }}
            />
          </FadeInSection>
        </Grid>
      </Grid>
    </Box>
  );
}
