"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllUserRatings } from "@/services/userService";
import useDebounce from "@/hooks/useDebounce";
import FilterSection from "@/components/allestablishmentspage/FilterSection";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Pagination,
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

const maxLimit = 10; // Define a maximum limit for pagination

const AllUserReviews = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") ?? "";
  const [userReviews, setUserReviews] = useState<BusinessReview[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<FilterValues>({
    search: initialSearch,
  });
  const debouncedSearch = useDebounce(filterParams.search, 500);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Fetch reviews
  const fetchUserReviews = useCallback(async () => {
    try {
      setLoading(true);

      // Create a cleaned version of filterParams
      const validFilterParams = Object.fromEntries(
        Object.entries(filterParams).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.some((v) => v !== null && v !== undefined && v !== "");
          }
          return (
            value !== null && value !== undefined && value !== "" && value !== 0
          );
        })
      );

      // Ensure page is always a number
      const validPage = Number.isInteger(page) && page > 0 ? page : 1;
      // Ensure limit is always a number
      const validLimit =
        Number.isInteger(limit) && limit > 0 ? limit : maxLimit;
      const response = await getAllUserRatings(
        validFilterParams,
        validPage,
        validLimit
      );

      if (!response.success) {
        throw new Error("Failed to fetch reviews");
      }
      setTotalPages(response.totalPages ?? 1);
      setUserReviews(response.data ?? []);
    } catch (err: any) {
      console.error("Error fetching user reviews:", err);
      toast.error("Failed to fetch reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filterParams]);

  // Update query params
  const updateQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });

    router.push(`/dashboard/reviews?${params.toString()}`);
  };

  // Refetch when debounced search changes
  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Fetch when userDetails or filter changes
  useEffect(() => {
    fetchUserReviews();
  }, [filterParams, fetchUserReviews]);

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FilterSection
        isLoading={loading}
        filters={filterParams}
        setFilters={setFilterParams}
        updateQuery={updateQuery}
        isFilteration={false}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
      />

      {userReviews.length > 0 ? (
        <>
          {/* Reviews list */}
          <div className="space-y-6 ">
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

      {userReviews.length > 0 && totalPages > 1 && (
        <Box display="flex" justifyContent="center" my={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
      )}
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
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CardMedia
          component="img"
          image={
            review?.business?.media?.logo ??
            "/images/banners/business-placeholder.png"
          } // fallback image
          alt={review?.business?.name}
          sx={{ width: 250, height: 250, borderRadius: "8px" }}
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
            slug={review?.business?.slug ?? review?.business?._id}
            fetchUserReviews={fetchUserReviews}
          />
        </CardContent>
      </Stack>
    </Card>
  );
}

const ReviewActions = ({
  reviewId,
  slug,
  fetchUserReviews,
}: {
  reviewId: string;
  slug: string;
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
  };

  return (
    <Stack direction="row" spacing={1}>
      <Link href={`/rate/${slug}`} passHref>
        <ThemeButton
          icon={<Edit fontSize="small" />}
          text={"Edit"}
          fontSize="0.8rem"
        />
      </Link>
      <ThemeButton
        icon={<Delete fontSize="small" />}
        text={loading ? "Deleting..." : "Delete"}
        disabled={loading}
        onClickEvent={handleDelete}
        fontSize="0.8rem"
      />
    </Stack>
  );
};

export default AllUserReviews;
