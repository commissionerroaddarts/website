"use client";

import React, { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { StarIcon } from "lucide-react";
import ThemeButton from "../buttons/ThemeButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import { Rating, SubmittedUserReview } from "@/types/ratings";
import {
  postReview,
  updateReview,
  deleteReview,
} from "@/services/ratingService";

const schema = yup.object({
  review: yup
    .string()
    .required("Review is required")
    .min(10, "Review must be at least 10 characters"),
});

interface RatingFormProps {
  readonly id: string;
  readonly selectedRating?: number;
  readonly establishmentName?: string;
  readonly submittedReview?: SubmittedUserReview | null;
}

export default function RatingForm({
  id: businessId,
  selectedRating = 1,
  establishmentName = "this place",
  submittedReview,
}: RatingFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(
    submittedReview?.rating ?? selectedRating
  );
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ review: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      review: submittedReview?.text ?? "",
    },
  });

  const resetUI = () => {
    setRating(0);
    setHoveredStar(null);
    router.back();
  };

  const handlePost = async (data: { review: string }) => {
    const payload: Rating = {
      business: businessId,
      rating,
      text: data.review,
      img: "",
    };
    const res = await postReview(payload);
    if (res.error)
      return toast.error(res.error.message ?? "Error posting review");
    toast.success("Review posted successfully!");
    resetUI();
  };

  const handleUpdate = async (data: { review: string }) => {
    const payload: Rating = {
      business: businessId,
      rating,
      text: data.review,
      img: "",
    };
    const res = await updateReview(businessId, payload);
    if (res.error)
      return toast.error(res.error.message ?? "Error updating review");
    toast.success("Review updated successfully!");
    resetUI();
  };

  const handleDelete = async () => {
    const res = await deleteReview(businessId);
    if (res.error)
      return toast.error(res.error.message ?? "Error deleting review");
    toast.success("Review deleted successfully!");
    resetUI();
  };

  const onSubmit = submittedReview ? handleUpdate : handlePost;

  const renderStars = () =>
    [...Array(5)].map((_, i) => {
      const star = i + 1;
      return (
        <IconButton
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          sx={{
            padding: 0,
            color: star <= (hoveredStar ?? rating) ? "#ffc341" : "white",
          }}
        >
          <StarIcon
            size={20}
            fill={star <= (hoveredStar ?? rating) ? "#ffc341" : "white"}
            stroke={star <= (hoveredStar ?? rating) ? "#ffc341" : "white"}
          />
        </IconButton>
      );
    });

  const handleGetButtonText = () => {
    if (submittedReview) {
      return isSubmitting ? "Updating..." : "Update Review";
    } else {
      return isSubmitting ? "Posting..." : "Post Review";
    }
  };

  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {submittedReview ? "Edit Your Review for" : "Rate"}{" "}
          <span className="capitalize">{establishmentName}</span>
        </Typography>

        <Box sx={{ display: "flex", gap: 0, mb: 2 }}>{renderStars()}</Box>

        <Box sx={{ mb: 2 }}>
          <Controller
            name="review"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                defaultValue={submittedReview?.text ?? field.value}
                placeholder="Tell us about your experience..."
                variant="standard"
                error={!!errors.review}
                helperText={errors.review?.message}
                slotProps={{
                  input: { style: { fontSize: "1rem" } },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ThemeButton
            type="submit"
            text={handleGetButtonText()}
            disabled={isSubmitting}
          />
          {submittedReview && (
            <ThemeButton
              text={"Delete Review"}
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
            />
          )}
        </Box>
      </form>
    </Box>
  );
}
