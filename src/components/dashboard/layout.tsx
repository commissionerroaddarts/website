"use client"; // ✅ Add this at the very top
import { useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import { usePathname } from "next/navigation"; // Correct hook
import { getUserDetails } from "@/services/authService";
import { useAppDispatch } from "@/store";
import { useAppState } from "@/hooks/useAppState";
import { Box } from "@mui/material";
import ScrollToTop from "@/components/global/ScrollToTop";
import Preloader from "@/components/global/Preloader";
import AdminHeader from "@/components/dashboard/AdminHeader";
import Footer from "@/components/global/Footer";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function AdminDashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname(); // Get the current path
  const isHomePage = pathname === "/";
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux store
  const { user } = useAppState();
  const { isLoggedIn } = user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        await getUserDetails(dispatch);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [dispatch, isLoggedIn]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex flex-col justify-between min-h-screen">
        {!isHomePage && <AdminHeader />}
        <div className="flex">
          <AdminSidebar activeItem="establishment" />
          <main className="flex-1 p-6">{children}</main>
        </div>

        <Footer />
      </Box>
      <ScrollToTop /> {/* ← Add this here */}
    </ThemeProvider>
  );
}
