import { BusinessReview } from "@/types/ratings";
import { Avatar, Box, Typography, Grid2 } from "@mui/material";
import { StarRating } from "@/components/global/StarRating";

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

        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {averageRating?.toFixed(1)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Based on {totalReviews} reviews
          </Typography>
          <StarRating rating={averageRating} size="size-6 md:size-8" />
        </Box>
      </Grid2>

      <Grid2 container size={{ xs: 12, sm: 12, md: 8 }} spacing={4}>
        {reviews.map((review: BusinessReview) => (
          <Grid2 size={{ xs: 12 }} key={review._id}>
            <Box display="flex" alignItems="flex-start">
              <Avatar
                src={review.user?.profileImg ?? "/placeholder.svg"}
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
                      <StarRating
                        rating={review.ratings?.overallRating}
                        size="size-4"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {review.ratings?.overallRating}
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
    </Grid2>
  );
}
