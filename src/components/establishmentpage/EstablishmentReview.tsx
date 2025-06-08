"use client";
import PastReviews from "@/components/ratings/PastReviews";
import { Box } from "@mui/material";
import { getBusinessReviews } from "@/services/ratingService";
import { useEffect, useState } from "react";
import { BusinessReview, SubmittedUserReview } from "@/types/ratings";
import ReviewForm from "./ReviewForm";
import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";

const EstablishmentReview = ({ id }: { id: string }) => {
  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;
  const [reviews, setReviews] = useState<BusinessReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [submittedReview, setSubmittedReview] =
    useState<SubmittedUserReview | null>(null);
  const fetchReviews = async () => {
    try {
      const response = await getBusinessReviews(id, "rating");
      setReviews(response.data);
      setAverageRating(response.averageRating);
      setTotalReviews(response.totalReviews);
      setSubmittedReview(response.submittedReview);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchReviews();
  }, [id]);

  if (userDetails && userDetails?.role === "owner") {
    return null;
  }

  return (
    <Box
      style={{
        margin: "2rem 0",
        padding: "2rem",
        borderRadius: "1rem",
        background:
          "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
    >
      {isLoggedIn ? (
        <ReviewForm
          id={id}
          selectedRating={0}
          submittedReview={submittedReview}
          establishmentName={reviews[0]?.business?.name ?? "The Establishment"}
          fetchReviews={fetchReviews}
        />
      ) : (
        <Box
          style={{
            padding: "1rem  0",
            borderRadius: "1rem",
            fontSize: "1.5rem",
          }}
        >
          <Link href={`/login?business=${id}&page=main`} passHref>
            Please login to leave a review
          </Link>
        </Box>
      )}
      {reviews && reviews.length > 0 && (
        <PastReviews
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
        />
      )}
    </Box>
  );
};

export default EstablishmentReview;
