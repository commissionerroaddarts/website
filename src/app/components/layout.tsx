"use client"; // ✅ Add this at the very top

import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { usePathname } from "next/navigation"; // Correct hook

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isHomePage && <Navbar />}
      <main className="px-10">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
