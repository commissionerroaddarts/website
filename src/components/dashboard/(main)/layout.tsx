"use client"; // ✅ Add this at the very top
import { useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import { getUserDetails } from "@/services/authService";
import { useAppDispatch } from "@/store";
import { useAppState } from "@/hooks/useAppState";
import { Box } from "@mui/material";
import ScrollToTop from "@/components/global/ScrollToTop";
import Preloader from "@/components/global/Preloader";
import AdminHeader from "@/components/dashboard/(main)/AdminHeader";
import AdminSidebar from "@/components/dashboard/(main)/AdminSidebar";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function AdminDashboardLayout({ children }: LayoutProps) {
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux store
  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;
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
      <Box className="flex flex-col justify-between min-h-screen ">
        <AdminHeader userDetails={userDetails!} />
        <div className="flex gap-5 mx-5 my-2 ">
          <AdminSidebar />
          <main
            className="flex-1 p-6 min-h-screen rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            {children}
          </main>
        </div>
      </Box>
      <ScrollToTop /> {/* ← Add this here */}
    </ThemeProvider>
  );
}
