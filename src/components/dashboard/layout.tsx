"use client"; // ✅ Add this at the very top
import { useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import { useRouter } from "next/navigation"; // Correct hook
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
  const dispatch = useAppDispatch(); // Get the dispatch function from Redux store
  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;
  const [loading, setLoading] = useState(false);
  const isUserLoggedIn = isLoggedIn && userDetails?._id !== undefined;
  const router = useRouter(); // Use the correct hook to get the router

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
        <div className="flex gap-5 m-5">
          <AdminSidebar activeItem="establishment" />
          <main
            className="flex-1 p-6 min-h-screen rounded-lg"
            style={{
              background:
                "linear-gradient(141.69deg, #462253 2.85%, #381A43 31.47%, #50275E 35.95%, #200C27 63.45%, #50275E 98.41%)",
            }}
          >
            {children}
          </main>
        </div>
        <Footer />
      </Box>
      <ScrollToTop /> {/* ← Add this here */}
    </ThemeProvider>
  );
}
