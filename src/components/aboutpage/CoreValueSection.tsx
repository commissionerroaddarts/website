"use client";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

const coreValues = [
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Lorem Ipsum Dolor",
    description: `Short description about this value goes here.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere tempore reprehenderit beatae ullam et voluptates? Animi inventore culpa iusto. Quod vel nihil voluptatum quas, accusamus ducimus corrupti eos, saepe alias eaque quo excepturi doloribus id hic! Libero, deserunt, saepe id asperiores nam perspiciatis quam odio, laudantium et sunt alias nobis.`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Another Value",
    description: `Short description about this value goes here.
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere tempore reprehenderit beatae ullam et voluptates? Animi inventore culpa iusto. Quod vel nihil voluptatum quas, accusamus ducimus corrupti eos, saepe alias eaque quo excepturi doloribus id hic! Libero, deserunt, saepe id asperiores nam perspiciatis quam odio, laudantium et sunt alias nobis.`,
  },
  {
    icon: "/images/icons/core-value-icon-1.svg",
    title: "Third Value",
    description: `Short description about this value goes here.
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere tempore reprehenderit beatae ullam et voluptates? Animi inventore culpa iusto. Quod vel nihil voluptatum quas, accusamus ducimus corrupti eos, saepe alias eaque quo excepturi doloribus id hic! Libero, deserunt, saepe id asperiores nam perspiciatis quam odio, laudantium et sunt alias nobis.`,
  },
];

const CoreValueSection = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2, px: 8 }}>
      <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
        Our Core Value
      </Typography>
      <Typography variant="body1" mb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
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
