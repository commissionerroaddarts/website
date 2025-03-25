"use client";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <Box sx={{ py: 8 }}>
      {/* Title and Description */}
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

      {/* Content Section */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        maxWidth="lg"
        margin="0 auto"
      >
        <Grid item xs={12} md={6}>
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
            expanding your business reach, Road Darts is your trusted solution.
          </Typography>
          <Typography variant="body1" paragraph>
            With a growing network of professionals and companies, we continue
            to innovate and redefine how listings work in today’s fast-paced
            digital world.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image
            src="/images/banners/about-road-dart.svg"
            alt="About Us Image"
            width={400}
            height={200}
            style={{ borderRadius: "8px", width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Grid
        sx={{
          mt: 4,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#15051B",
          py: 5,
        }}
      >
        {["30+ Trusted Members", "100+ Establishments", "5K Companies"].map(
          (stat, index) => (
            <Grid
              item
              key={index}
              xs={4}
              sm={3}
              md={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                width: "20%",
                borderRight: index !== 2 ? "1px solid white" : "none", // Add white borders between columns
              }}
            >
              <Card
                sx={{
                  background: "transparent",
                  color: "white",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="h4" align="center" fontWeight="bold">
                    {stat.split(" ")[0]}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {stat.split(" ").slice(1).join(" ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
