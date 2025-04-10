"use client"; // ✅ Add this at the very top

import { useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { usePathname } from "next/navigation"; // Correct hook
import Image from "next/image";
import { motion } from "framer-motion";
import { getUserDetails } from "@/services/authService";
import { useAppDispatch } from "@/store";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Link from "next/link";

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
    name: "eclipse-small.svg",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "-8%",
    left: "70%",
    transform: "none",
  },
  {
    name: "eclipse-medium.svg",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "-5%",
    left: "7%",
    transform: "none",
  },
  {
    name: "eclipse-large.svg",
    width: 346.089787721215,
    height: 317.8461349689057,
    top: "15%",
    left: "85%",
    transform: "none",
  },
  {
    name: "dart-icon.svg",
    width: "250px",
    height: "150px",
    top: "1%",
    left: "35%",
    transform: "translate(-35%,-1%)",
  },
  {
    name: "dart-board-3.png",
    width: "90px",
    height: "auto",
    top: "35%",
    left: "0%",
    transform: "translate(-0%,-35%)",
  },
  {
    name: "dart-board-2.png",
    width: "90px",
    height: "auto",
    top: "15%",
    left: "92%",
    transform: "translate(-15%,-92%)",
  },
  {
    name: "dart-board.png",
    width: "100px",
    height: "auto",
    top: "75%",
    left: "95%",
    transform: "translate(-95%,-75%)",
  },
  {
    name: "dart-board-4.png",
    width: "60px",
    height: "auto",
    top: "85%",
    left: "0",
    transform: "translate(0,-85%)",
  },
];

// // Load your Stripe public key
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
// );

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux store

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(dispatch);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ✅ Always include metadata */}

      <IconsComponent />
      {isHomePage && <PromoCodePopupComponent />}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!isHomePage && <Navbar />}
        {/* <Elements stripe={stripePromise}> */}
        <main>{children}</main>
        {/* </Elements> */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
const PromoCodePopupComponent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true); // Open the modal when the component mounts
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(8px)", // Add blur effect to the overlay background
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <Link href="/plans" passHref>
          <Image
            src="/images/banners/promo.svg" // Replace with your image path
            alt="Promo"
            width={500} // Adjust width as needed
            height={500} // Adjust height as needed
          />
        </Link>
      </Box>
    </Modal>
  );
};

const IconsComponent = () => {
  const isFullHeight =
    typeof window !== "undefined" && window.innerHeight === 100;

  const glowAnimation = {
    glow: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {icons.slice(0, isFullHeight ? 5 : icons.length).map((icon, index) => (
        <motion.div
          key={icon.name + index}
          variants={
            icon.name.includes("eclipse") ? glowAnimation : floatAnimation
          }
          animate={icon.name.includes("eclipse") ? "glow" : "float"}
          style={{
            position: "absolute",
            zIndex: -1,
            top: icon.top,
            left: icon.left,
            transform: icon.transform,
          }}
        >
          <Image
            src={`/images/shapes/${icon.name}`}
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
    </>
  );
};
