"use client";

import { once } from "events";
import { motion } from "framer-motion";
import React, { useRef } from "react";

interface CardStaggerAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
}

const CardStaggerAnimation: React.FC<CardStaggerAnimationProps> = ({
  children,
  delay = 0.5,
  duration = 1,
  stagger = 0.2,
  yOffset = 20,
}) => {
  const ref = useRef(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const cardVariants = (index: number) => ({
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay: delay * index },
    },
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
      className="flex flex-col gap-4 w-full"
    >
      {React.Children.toArray(children).map((child, index) => (
        <motion.div
          key={(child as React.ReactElement).key || index}
          variants={cardVariants(index)}
          className="w-full"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardStaggerAnimation;
