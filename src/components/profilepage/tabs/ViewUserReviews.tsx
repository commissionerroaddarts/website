"use client";
import { TabsComponent } from "../TabsComponent";
import { useEffect, useState } from "react";
import { getUserRatings } from "@/services/userService";
import { useAppState } from "@/hooks/useAppState";
import Preloader from "@/components/global/Preloader";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { Star, Edit, Delete } from "@mui/icons-material";

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
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <ReviewCard key={item} />
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
};
function ReviewCard() {
  return (
    <Card sx={{ backgroundColor: "#2a1e2d", borderRadius: "16px", p: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <CardMedia
          component="img"
          image="/images/road_darts.png"
          alt="ExtraMile store logo"
          sx={{ width: 200, height: 150, borderRadius: "8px" }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ExtraMile
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label="Fast Food"
              sx={{ backgroundColor: "#2a1e2d", color: "white" }}
            />
            <Chip
              label="Convenience Store"
              sx={{ backgroundColor: "#2a1e2d", color: "white" }}
            />
          </Stack>

          <Box display="flex" mb={2}>
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} sx={{ color: "#fbbc05" }} />
            ))}
            <Star sx={{ color: "#fbbc05" }} />
          </Box>

          <Typography variant="body2" mb={2}>
            Review: "Super convenient stop! Clean restrooms, great snacks, and
            surprisingly good coffee. Perfect for a quick refresh on a long
            drive."
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption" color="text.secondary">
              Date Posted: April 20, 2025
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{
                  backgroundColor: "#3a2a3d",
                  "&:hover": { backgroundColor: "#4a3a4d" },
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<Delete />}
                sx={{
                  backgroundColor: "#3a2a3d",
                  "&:hover": { backgroundColor: "#4a3a4d" },
                }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}

export default ViewUserReviews;
