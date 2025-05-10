"use client";
import theme from "@/theme/theme";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/system";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 30, label: "Trusted Members" },
  { value: 100, label: "Establishments" },
  { value: 5000, label: "Companies" },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid2
      ref={ref}
      container
      spacing={4}
      className="about-stats-section py-5 w-full bg-[#15051B]"
      justifyContent="center"
      alignItems="center"
    >
      {stats.map((stat, index) => (
        <Grid2
          key={stat.label}
          size={{
            xs: 1,
            md: 3,
          }}
          sx={{
            width: "100%",
            borderRight:
              index !== stats.length - 1 && !isMobile
                ? "1px solid white"
                : "none",

            borderBottom:
              index !== stats.length - 1 && isMobile
                ? "1px solid white"
                : "none",
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
                {inView ? <CountUp end={stat.value} duration={2} /> : 0}+
              </Typography>
              <Typography variant="body2" align="center">
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default StatsSection;
