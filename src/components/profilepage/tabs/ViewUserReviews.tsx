"use client";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { TabsComponent } from "../TabsComponent";
import { useEffect, useState } from "react";
import { getUserRatings } from "@/services/userService";
import { useAppState } from "@/hooks/useAppState";
import Preloader from "@/components/global/Preloader";

const ViewUserReviews = () => {
  const { user } = useAppState();
  const { userDetails } = user;
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userDetails) {
      setLoading(false);
      return;
    }

    const fetchUserReviews = async () => {
      try {
        // Replace with your API call to fetch user reviews
        const response = await getUserRatings(userDetails._id); // Example API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        console.log(response.data);
        setUserReviews(response.data); // Assuming the API returns an array of reviews
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [userDetails]);

  if (!userDetails) {
    return <Preloader />;
  }

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1, py: 8 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Manage Your Account
          </Typography>
          <Typography color="text.secondary">
            Shape your profile, aim your journey
          </Typography>
        </Box>

        <TabsComponent />

        <Box
          sx={{
            background:
              "linear-gradient(139deg, #200C27 -4.72%, #4A1C5A 48.82%, #3F0F50 102.37%)",
            borderRadius: "16px",
            p: 4,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            textAlign="center"
            mb={4}
          >
            My Reviews
          </Typography>
          {/* here add reviews */}
        </Box>
      </Container>
    </Box>
  );
};

export default ViewUserReviews;
