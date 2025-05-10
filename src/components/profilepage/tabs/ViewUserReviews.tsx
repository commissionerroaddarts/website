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
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { FilterValues } from "@/types/business";
import { BusinessReview } from "@/types/ratings";
import { toast } from "react-toastify";
import { deleteReview } from "@/services/ratingService";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import { StarRating } from "@/components/global/StarRating";

const ViewUserReviews = () => {
  const { user } = useAppState();
  const { userDetails } = user;

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") ?? "";

  const [userReviews, setUserReviews] = useState<BusinessReview[] | []>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (err: any) {
      console.error("Error fetching user reviews:", err);
      toast.error("Failed to fetch reviews. Please try again.");
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
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1 }}>
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
          {userReviews.length > 0 ? (
            <>
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
                {userReviews.map((review: any) => (
                  <ReviewCard
                    key={review?._id}
                    review={review}
                    fetchUserReviews={fetchUserReviews}
                  />
                ))}
              </div>
            </>
          ) : (
            <Typography
              variant="h1"
              color="text.secondary"
              fontSize={"2rem"}
              align="center"
              textTransform={"capitalize"}
            >
              No reviews found
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

function ReviewCard({
  review,
  fetchUserReviews,
}: Readonly<{ review: BusinessReview; fetchUserReviews: () => void }>) {
  return (
    <Card sx={{ backgroundColor: "#2a1e2d", borderRadius: "16px", p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        position={"relative"}
      >
        <CardMedia
          component="img"
          image={review?.business?.media?.logo ?? "/images/road_darts.png"} // fallback image
          alt={review?.business?.name}
          sx={{ width: 200, height: 200, borderRadius: "8px" }}
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {review?.business?.name}
          </Typography>

          <Box className="flex flex-col items-start my-2 gap-1">
            <StarRating rating={review?.ratings?.overallRating} size="size-5" />

            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#d1c4e9", fontSize: "1rem" }}
            >
              "{review?.text || "No review text provided."}"
            </Typography>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="caption" color="text.secondary">
              {/* Date Posted: {format(new Date(review?.createdAt), "MMMM dd, yyyy")} */}
              Date Posted:{" "}
              {new Date(review?.createdAt ?? "").toLocaleDateString()}
            </Typography>
          </Stack>
          <ReviewActions
            reviewId={review?._id}
            businessId={review?.business?._id}
            fetchUserReviews={fetchUserReviews}
          />
        </CardContent>
      </Stack>
    </Card>
  );
}

const ReviewActions = ({
  reviewId,
  businessId,
  fetchUserReviews,
}: {
  reviewId: string;
  businessId: string;
  fetchUserReviews: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!reviewId) return;

    setLoading(true);
    try {
      const response = await deleteReview(reviewId);
      if (response.success) {
        setLoading(false);
        fetchUserReviews(); // Refetch reviews after deletions
        toast.success("Review deleted successfully!");
      } else {
        toast.error("Failed to delete review?.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting review?. Please try again.");
      console.error("Error deleting review:", error);
    }
    // Handle delete action
    console.log("Delete review with ID:", reviewId);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Link href={`/rate/${businessId}`} passHref>
        <ThemeButton icon={<Edit fontSize="small" />} text={"Edit"} />
      </Link>
      <ThemeButton
        icon={<Delete fontSize="small" />}
        text={loading ? "Deleting..." : "Delete"}
        disabled={loading}
        onClickEvent={handleDelete}
      />
    </Stack>
  );
};

export default ViewUserReviews;
