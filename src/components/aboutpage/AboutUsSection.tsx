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
        Our Vision Is To Make Work Inspiring And Fulfilling
      </Typography>
      <Typography
        variant="body1"
        align="center"
        maxWidth="md"
        margin="0 auto"
        paragraph
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem elit ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Ullam natus
            perferendis tenetur provident, voluptatem nisi?
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Molestias
            distinctio quidem quas, dolor ab quo quibusdam? Officiis aliquam
            sequi neque cum eius iste, nulla ut.
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Nobis repudiandae
            dolore nam explicabo neque sequi!
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
        {["30+ Team members", "100+ Posts", "5K Companies"].map(
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
