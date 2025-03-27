"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../global/Navbar";
import Image from "next/image";
import SearchComponent from "./SearchingComponent";
// import dynamic from "next/dynamic";
// const AnimText = dynamic(() => import("../../animations/text/AnimText"));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

function HomeBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        py: 2,
        background:
          "url('/images/banners/road-darts-banner.png') no-repeat center center",
        backgroundSize: "cover",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(121,9,102,0.4066001400560224) 42%, rgba(201,0,255,0.41780462184873945) 100%);",
          zIndex: 0,
        },
      }}
    >
      <Navbar />
      <Box textAlign="center" sx={{ marginTop: -10 }}>
        <motion.div initial="hidden" animate="visible" variants={scaleIn}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "500px",
              zIndex: 0,
            }}
          >
            <Image
              src="/images/banners/banner-icon.png"
              alt="Road Darts"
              // Apply blur effect
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </motion.div>

        <Box className="flex flex-col gap-1 relative z-[200] -mt-10">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="h-full w-full   mb-2  text-white font-bold text-5xl"
          >
            {/* <AnimText delay={20} /> */}
            Stay Sharp, Throw Anywhere
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Typography
              gutterBottom
              sx={{ position: "relative", zIndex: 2, fontWeight: 200 }}
            >
              Discover the best dart venues, tournaments, and tips to improve
              your game.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <SearchComponent />
      </motion.div>
    </Box>
  );
}

export default HomeBanner;
