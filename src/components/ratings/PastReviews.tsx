import { BusinessReview } from "@/types/ratings";
import { Avatar, Box, Typography, Grid2, Divider } from "@mui/material";

interface PastReviewsProps {
  readonly reviews: BusinessReview[];
  readonly averageRating: number;
  readonly totalReviews: number;
}

export default function PastReviews({
  reviews,
  averageRating,
  totalReviews,
}: PastReviewsProps) {
  return (
    <Grid2 container sx={{ position: "relative" }} spacing={2}>
      <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Past Reviews
        </Typography>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            {averageRating?.toFixed(1)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Based on {totalReviews} reviews
          </Typography>
          <StarRating rating={averageRating} size="size-10" />
        </Box>
      </Grid2>

      {reviews.length > 0 && (
        <Grid2 container size={{ xs: 12, sm: 12, md: 8 }} spacing={4}>
          {reviews.map((review: BusinessReview) => (
            <Grid2 size={{ xs: 12 }} key={review._id}>
              <Box display="flex" alignItems="flex-start">
                <Avatar
                  src={review.user?.profileImage ?? "/placeholder.svg"}
                  alt={review.user?.username}
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 1,
                    backgroundColor: "rgb(130, 36, 227)",
                    color: "white",
                  }}
                />
                <Box flex={1}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontSize: "1rem" }}
                      >
                        {review.user?.username}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <StarRating rating={review.rating} size="size-4" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {review.rating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{review.text}</Typography>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Grid2>
  );
}

const StarRating = ({ rating, size }: { rating: number; size: string }) => {
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
