"use client";
import { Card, CardContent, Grid, Typography } from "@mui/material";
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

  return (
    <Grid
      ref={ref}
      sx={{
        my: 4,
        py: 5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#15051B",
      }}
    >
      {stats.map((stat, index) => (
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
            borderRight:
              index !== stats.length - 1 ? "1px solid white" : "none",
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
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSection;
