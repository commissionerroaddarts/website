"use client";

import { useRouter, useSearchParams } from "next/navigation";
import RatingForm from "@/components/ratings/RatingForm";
import PastReviews from "@/components/ratings/PastReviews";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getBusinessReviews } from "@/services/ratingService";
import { useEffect, useState } from "react";
import { BusinessReview, SubmittedUserReview } from "@/types/ratings";

export default function RatingModal({ id }: { readonly id: string }) {
  const router = useRouter();
  const search = useSearchParams();
  const rating = search.get("rating") ?? "1"; // Use the ID from the URL or default to "1"
  const [reviews, setReviews] = useState<BusinessReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [submittedReview, setSubmittedReview] =
    useState<SubmittedUserReview | null>(null);

  useEffect(() => {
    if (!id) return;
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
    fetchReviews();
  }, [id]);

  const handleClose = () => {
    const previousUrl = document.referrer;
    if (previousUrl.includes("/login")) {
      router.push("/establishments");
    } else {
      router.back();
    }
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className="!overflow-hidden"
      sx={{
        backdropFilter: "blur(10px)", // Add blur effect
      }}
    >
      <IconButton
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        style={{
          background:
            "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
        }}
      >
        <RatingForm
          id={id}
          selectedRating={parseInt(rating)}
          submittedReview={submittedReview}
          establishmentName={reviews[0]?.business?.name ?? "The Establishment"}
        />
        {reviews.length > 0 && (
          <PastReviews
            reviews={reviews}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
