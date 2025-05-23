"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "@/components/global/Navbar";
import Image from "next/image";
import SearchComponent from "./SearchingComponent";
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
          zIndex: 0,
        },
      }}
    >
      <Navbar />
      <Box textAlign="center">
        <motion.div initial="hidden" animate="visible" variants={scaleIn}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "200px", sm: "300px", md: "450px" },
              zIndex: 0,
              display: "flex",
              justifyContent: "center",
              "& img": {
                width: { xs: "80%", sm: "90%", md: "100%" },
                height: "auto",
              },
            }}
            className="-mt-14 max-sm:-mt-7 "
          >
            <Image
              src="/images/banners/banner-icon.png"
              alt="Road Darts"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </motion.div>

        <Box className="flex flex-col gap-1 relative  -mt-2 max-w-[90%] md:max-w-[95%] mx-auto">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="h-full w-full mb-2 text-white font-bold text-3xl sm:text-4xl xl:text-5xl"
          >
            Stay Sharp, Be Social, Throw Anywhere!
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Typography
              gutterBottom
              sx={{ position: "relative", fontWeight: 200 }}
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
