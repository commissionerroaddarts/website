"use client"; // ✅ Add this at the very top

import { useState, useEffect, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { usePathname } from "next/navigation"; // Correct hook
import Image from "next/image";
import { motion } from "framer-motion";
import Preloader from "./global/Preloader"; // ✅ Import the Preloader component

interface LayoutProps {
  readonly children: ReactNode;
}

const floatAnimation = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const icons = [
  {
    name: "eclipse-small",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "-8%",
    left: "70%",
    transform: "none",
  },
  {
    name: "eclipse-medium",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "-5%",
    left: "7%",
    transform: "none",
  },
  {
    name: "eclipse-large",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "15%",
    left: "85%",
    transform: "none",
  },
  {
    name: "dart-icon",
    width: "250px",
    height: "150px",
    top: "1%",
    left: "35%",
    transform: "translate(-35%,-1%)",
  },
  {
    name: "coin-icon",
    width: "50px",
    height: "150px",
    top: "35%",
    left: "2%",
    transform: "translate(-2%,-35%)",
  },
  {
    name: "coin-icon",
    width: "50px",
    height: "150px",
    top: "5%",
    left: "95%",
    transform: "translate(-5%,-95%)",
  },
  {
    name: "card-icon",
    width: "160px",
    height: "160px",
    top: "75%",
    left: "95%",
    transform: "translate(-95%,-75%)",
  },
  {
    name: "casino-icon",
    width: "150px",
    height: "150px",
    top: "75%",
    left: "0",
    transform: "translate(0,-75%)",
  },
];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Adjust the delay as needed (2 seconds)

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoaded && (
        <Preloader duration={3000} onFinish={() => setIsLoaded(true)} />
      )}{" "}
      {/* ✅ Show preloader before content loads */}
      {isLoaded && (
        <>
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              variants={floatAnimation}
              animate="float"
              style={{
                position: "absolute",
                zIndex: -1,
                top: icon.top,
                left: icon.left,
                transform: icon.transform,
              }}
            >
              <Image
                src={`/images/shapes/${icon.name}.svg`}
                alt={icon.name}
                width={300}
                height={300}
                style={{
                  width: icon.width,
                  height: icon.height,
                }}
              />
            </motion.div>
          ))}

          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {!isHomePage && <Navbar />}
            <main>{children}</main>
            <Footer />
          </div>
        </>
      )}
    </ThemeProvider>
  );
}
