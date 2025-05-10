"use client";
import { Box, Typography, Grid2, Card, CardContent } from "@mui/material";
import Image from "next/image";

const coreValues = [
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Where Dart Players Meet",
    description: `Road Darts is your go-to resource for finding the perfect place to throw. Whether you're chasing steel tip or soft tip, prefer a quiet corner or a competitive crowd, we make it easy to search by location, board type, and throwing conditions that suit your style.
Our community-driven platform lets players share honest reviews, rate venues, and offer tips on the best places to play — so you're never walking into a mystery.
`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Built for the Dart Community",
    description: `Road Darts is your friendly place to connect with others who share your love for the game. Whether you're on the road or close to home, it’s all about finding welcoming places to play and people who enjoy the same laid-back, dart-loving vibe.
    Join the community to discover new spots, swap tips, share stories, and maybe even make a few new friends along the way. From casual games to friendly meetups, Road Darts makes it easy to stay social, stay sharp, and stay connected. It’s not just about darts — it’s about the people who play them.
`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Let Us Put You on the Map",
    description: `Looking to bring in more dart players and boost event turnout? Road Darts is the easiest and most cost-effective way to directly market your venue to a growing dart-playing community.
List your location, promote leagues, blind draws, tournaments, and dart-friendly nights — all in one place where players are actively looking for new spots to play. No complicated setup, no overpriced ads — just a focused platform built for you and the people who love the game.`,
  },
];

const CoreValueSection = () => {
  return (
    <Box className="core-value-section text-center px-4 md:px-8">
      <Typography variant="h4" fontWeight="bold" color="white" marginBlock={5}>
        Stay sharp. Stay social. Throw anywhere!
      </Typography>
      
      <Grid2 container spacing={3} justifyContent="center">
        {coreValues.map((item, index) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                background:
                  "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",
                borderRadius: 2,
                height:{xs:"100%",md:"400px"}
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 4,
                }}
              >
                <Box
                  mb={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    background: "#8224E3",
                    borderRadius: "50%",
                    width: 70,
                    height: 70,
                  }}
                >
                  <Image
                    src={item.icon}
                    // Apply blur effect
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                </Box>
                <Typography
                  variant="h6"
                  color="white"
                  fontWeight="bold"
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="white">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default CoreValueSection;
