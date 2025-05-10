"use client";
import { Box, Typography, Grid2 } from "@mui/material";
import Image from "next/image";
import FadeInSection from "@/animations/sections/FadeInSection";

export default function AboutUsSection() {
  return (
    <Box className="main-about-section text-center sm:text-left py-2 px-4 md:px-8 ">
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
          Born from the road. Built for the game.
        </Typography>
        {/* <Typography
          variant="body1"
          align="center"
          maxWidth="md"
          margin="1rem auto 2rem"
          component="p"
        >
          We bridge the gap between professionals and opportunities, fostering
          growth and innovation in every interaction.
        </Typography> */}
      </FadeInSection>
      {/* Content Section */}

      <Grid2
        container
        spacing={4}
        alignItems="center"
        maxWidth="lg"
        margin="0 auto"
      >
        <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
          <FadeInSection delay={0.5} xOffset={-20}>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              mb={3}
              textAlign={"justify"}
            >
              Road Darts was created out of a simple need — to stay sharp while traveling. Whether you're a seasoned player chasing competition or just looking to unwind with a few rounds at a local spot, Road Darts makes it easy to find dart-friendly venues that match your vibe. From dive bars with character to polished tournament lanes, discover the throwing environment where you feel most at home.
              <br/>
              More than just a directory — it's a social hub. Connect with fellow players, drop match requests, and stay in the loop on leagues, blind draws, and tournaments. 
            </Typography>

            <Typography
              variant="body1"
              component="p"
              gutterBottom
              textAlign={"justify"}
              mb={3}
            >
              For venues, Road Darts offers a hassle-free way to promote your dart scene, drive new traffic, and become a destination for players on the move. Whether you're running weekly leagues, hosting blind draws, or organizing special events, our platform gives you the tools to showcase it all to an audience that’s actively searching for places to play. Easily list your tournaments, post schedules, share updates, and get discovered by dart players traveling through or living nearby. It’s more than just advertising — it’s a direct connection to a passionate, engaged, and growing community of dart enthusiasts looking for their next favorite spot.
            </Typography>
            
          </FadeInSection>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
          <FadeInSection delay={0.5} xOffset={20}>
            <Image
              src="/images/banners/about-road-dart.svg"
              alt="About Us Image"
              width={400}
              height={200}
              // Apply blur effect
              style={{ borderRadius: "8px", width: "100%", height: "auto" }}
            />
          </FadeInSection>
        </Grid2>
      </Grid2>
    </Box>
  );
}
