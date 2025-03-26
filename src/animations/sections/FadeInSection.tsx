"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
  threshold?: number; // Trigger animation when this % of the section is visible (0 to 1)
  delay?: number; // Delay before the animation starts (in seconds)
  duration?: number; // Duration of the animation (in seconds)
  initialOpacity?: number; // Initial opacity before animation (0 to 1)
  finalOpacity?: number; // Final opacity after animation (0 to 1)
  yOffset?: number; // Initial vertical offset for the animation
  xOffset?: number; // Initial horizontal offset for the animation
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  threshold = 0.2,
  delay = 0,
  duration = 0.8,
  initialOpacity = 0,
  finalOpacity = 1,
  yOffset = 20,
  xOffset = 0,
}) => {
  const fadeInVariants: Variants = {
    hidden: { opacity: initialOpacity, y: yOffset, x: xOffset },
    visible: {
      opacity: finalOpacity,
      y: 0,
      x: 0,
      transition: { delay, duration, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, once: true }}
      variants={fadeInVariants}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
