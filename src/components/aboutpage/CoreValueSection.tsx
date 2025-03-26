"use client";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

const coreValues = [
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Our Core Values",
    description: `We prioritize building trust by providing accurate and verified listings for businesses and individuals. Our platform is designed to ensure that you have access to the best services available, making your work seamless and efficient. We believe in transparency and integrity, ensuring that every interaction on our platform is trustworthy and reliable.`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Innovation & Growth",
    description: `We constantly evolve to bring better solutions and an improved user experience for our community. Our team is dedicated to researching and implementing the latest technologies to keep our platform ahead of the curve. We strive to foster a culture of continuous improvement and innovation, ensuring that we meet the needs of our users.`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Customer-Centric Approach",
    description: `Your satisfaction is our top priority, and we aim to connect you with the best opportunities available. We listen to your feedback and continuously work to enhance our services to better meet your needs. Our goal is to provide a seamless and enjoyable experience, ensuring that you find exactly what you're looking for with ease and confidence.`,
  },
];

const CoreValueSection = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2, px: 8 }}>
      <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
        Our Core Values
      </Typography>
      <Typography variant="body1" mb={4}>
        Building trust, fostering innovation, and prioritizing your
        satisfaction.
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {coreValues.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                background:
                  "linear-gradient(112.31deg, rgba(201, 201, 201, 0.8) 2.19%, rgba(196, 196, 196, 0.1) 95.72%)",
                borderRadius: 2,
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
                    placeholder="blur" // Apply blur effect
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoreValueSection;
