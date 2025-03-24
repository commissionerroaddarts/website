"use client"; // ✅ Add this at the very top

import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { usePathname } from "next/navigation"; // Correct hook
import Image from "next/image";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Image
        src="/images/shapes/eclipse-small.svg"
        alt="Road Dart Shape 1"
        width={300}
        height={300}
        style={{
          position: "absolute",
          width: 346.089787721215,
          height: 317.8461349689057,
          top: "-8%",
          left: " 70%",
        }}
      />
      <Image
        src="/images/shapes/eclipse-medium.svg"
        alt="Road Dart Shape 2"
        width={400}
        height={400}
        style={{ position: "absolute", top: "-12%", left: "7%" }}
      />
      <Image
        src="/images/shapes/eclipse-large.svg"
        alt="Road Dart Shape 3"
        width={500}
        height={500}
        style={{ position: "absolute", top: "15%", left: "65%", zIndex: -1 }}
      />

      <Image
        src="/images/icons/dart-icon.svg"
        alt="Dart Icon"
        width={500}
        height={500}
        style={{
          position: "absolute",
          width: "250px",
          height: "150px",
          top: "2%",
          left: "45%",
          zIndex: -1,
          transform: "translate(-45%,-2%)",
        }}
      />

      <Image
        src="/images/icons/coin-icon.svg"
        alt="Coin Icon"
        width={500}
        height={500}
        style={{
          position: "absolute",
          width: "50px",
          height: "150px",
          top: "35%",
          left: "2%",
          zIndex: -1,
          transform: "translate(-2%,-35%)",
        }}
      />

      <Image
        src="/images/icons/coin-icon.svg"
        alt="Coin Icon"
        width={500}
        height={500}
        style={{
          position: "absolute",
          width: "50px",
          height: "150px",
          top: "15%",
          left: "95%",
          zIndex: -1,
          transform: "translate(-95%,-15%)",
        }}
      />

      <Image
        src="/images/icons/card-icon.svg"
        alt="Card Icon"
        width={100}
        height={100}
        style={{
          position: "absolute",
          top: "75%",
          left: "100%",
          zIndex: -1,
          transform: "translate(-95%,-15%)",
        }}
      />

      <Image
        src="/images/icons/casino-icon.svg"
        alt="Casino Icon"
        width={150}
        height={150}
        style={{
          position: "absolute",
          top: "95%",
          left: "0",
          zIndex: -1,
          transform: "translate(0,-85%)",
        }}
      />
      {!isHomePage && <Navbar />}
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
