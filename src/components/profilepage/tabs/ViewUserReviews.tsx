"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { TabsComponent } from "../TabsComponent";
import { getUserRatings } from "@/services/userService";
import { useAppState } from "@/hooks/useAppState";
import useDebounce from "@/hooks/useDebounce";
import Preloader from "@/components/global/Preloader";
import FilterSection from "@/components/allestablishmentspage/FilterSection";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Star, Edit, Delete } from "@mui/icons-material";

import { FilterValues } from "@/types/business";
import { BusinessReview, Rating } from "@/types/ratings";
import { toast } from "react-toastify";
import { deleteReview, updateReview } from "@/services/ratingService";
import ThemeButton from "@/components/buttons/ThemeButton";

const ViewUserReviews = () => {
  const { user } = useAppState();
  const { userDetails } = user;

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") ?? "";

  const [userReviews, setUserReviews] = useState<BusinessReview[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterParams, setFilterParams] = useState<FilterValues>({
    search: initialSearch,
  });

  const debouncedSearch = useDebounce(filterParams.search, 500);

  // Fetch reviews
  const fetchUserReviews = useCallback(async () => {
    if (!userDetails) return;

    setLoading(true);
    try {
      const response = await getUserRatings(
        userDetails._id,
        filterParams,
        1,
        10
      );

      if (!response.success) {
        throw new Error("Failed to fetch reviews");
      }
      setUserReviews(response.data ?? []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userDetails, filterParams]);

  // Update query params
  const updateQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });

    router.push(`/profile/my-reviews?${params.toString()}`);
  };

  // Refetch when debounced search changes
  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Fetch when userDetails or filter changes
  useEffect(() => {
    if (userDetails) {
      fetchUserReviews();
    } else {
      setLoading(false);
    }
  }, [userDetails, filterParams, fetchUserReviews]);

  if (!userDetails) {
    return <Preloader />;
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
        {/* Page Title */}
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

        {/* Tabs */}
        <TabsComponent />

        {/* Reviews Section */}
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

          <FilterSection
            isLoading={loading}
            filters={filterParams}
            setFilters={setFilterParams}
            updateQuery={updateQuery}
            isFilteration={false}
          />

          {/* Reviews list */}
          <div className="space-y-6 mt-6">
            {userReviews.length > 0 ? (
              userReviews.map((review: any) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <Typography color="text.secondary" align="center">
                No reviews found.
              </Typography>
            )}
          </div>
        </Box>
      </Container>
    </Box>
  );
};

function ReviewCard({ review }: Readonly<{ review: BusinessReview }>) {
  return (
    <Card sx={{ backgroundColor: "#2a1e2d", borderRadius: "16px", p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        position={"relative"}
      >
        <CardMedia
          component="img"
          image={review.business?.media?.logo ?? "/images/road_darts.png"} // fallback image
          alt={review.business.name}
          sx={{ width: 200, height: 200, borderRadius: "8px" }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {review.business.name}
          </Typography>

          <Box className="flex flex-col items-start my-2 gap-1">
            <StarRating rating={review.ratings?.overallRating} size="size-5" />

            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#d1c4e9", fontSize: "1rem" }}
            >
              "{review.text || "No review text provided."}"
            </Typography>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="caption" color="text.secondary">
              {/* Date Posted: {format(new Date(review.createdAt), "MMMM dd, yyyy")} */}
              Date Posted:{" "}
              {new Date(review.createdAt ?? "").toLocaleDateString()}
            </Typography>
          </Stack>
          <ReviewActions reviewId={review._id} />
        </CardContent>
      </Stack>
    </Card>
  );
}

const ReviewActions = ({ reviewId }: { reviewId: string }) => {
  const handleEdit = async () => {
    if (!reviewId) return;
    try {
      const updatedReview: Rating = {
        _id: reviewId,
        text: "Updated review text",
        rating: {
          overallRating: 4,
          boardCondition: 4,
          throwingLaneConditions: 4,
          lightingConditions: 4,
          spaceAllocated: 4,
          gamingAmbience: 4,
        },
        img: "updated_image_url",
        business: "business_id",
      };
      const response = await updateReview(reviewId, updatedReview);
      if (response.success) {
        toast.success("Review updated successfully!");
      } else {
        toast.error("Failed to update review.");
      }
    } catch (error) {
      toast.error("Error editing review. Please try again.");
      console.error("Error editing review:", error);
    }
    // Handle edit action
    console.log("Edit review with ID:", reviewId);
  };

  const handleDelete = async () => {
    if (!reviewId) return;
    try {
      const response = await deleteReview(reviewId);
      if (response.success) {
        toast.success("Review deleted successfully!");
      } else {
        toast.error("Failed to delete review.");
      }
    } catch (error) {
      toast.error("Error deleting review. Please try again.");
      console.error("Error deleting review:", error);
    }
    // Handle delete action
    console.log("Delete review with ID:", reviewId);
  };

  return (
    <Stack direction="row" spacing={1}>
      <ThemeButton
        icon={<Edit fontSize="small" />}
        text="Edit"
        onClickEvent={handleEdit}
      />
      <ThemeButton
        icon={<Delete fontSize="small" />}
        text="Delete"
        onClickEvent={handleDelete}
      />
    </Stack>
  );
};

const StarRating = ({
  rating,
  size,
}: {
  rating: number | undefined;
  size: string;
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} cursor-pointer ${
            rating && star <= rating ? "text-yellow-500" : "text-gray"
          }`}
          fill={rating && star <= rating ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
};

export default ViewUserReviews;
