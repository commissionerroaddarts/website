"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { StarIcon } from "lucide-react";
import ThemeButton from "../buttons/ThemeButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import {
  PostRatingFormData,
  RatingsObject,
  SubmittedUserReview,
} from "@/types/ratings";
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
  id: string;
  selectedRating?: number;
  establishmentName?: string;
  submittedReview?: SubmittedUserReview | null;
  fetchReviews: () => void;
}

export default function ReviewForm({
  id: businessId,
  selectedRating = 0,
  establishmentName = "The Establishment",
  submittedReview = null,
  fetchReviews,
}: Readonly<RatingFormProps>) {
  const router = useRouter();
  const [rating, setRating] = useState<RatingsObject>({
    boardCondition: selectedRating ?? 0,
    throwingLaneConditions: selectedRating ?? 0,
    lightingConditions: selectedRating ?? 0,
    spaceAllocated: selectedRating ?? 0,
    gamingAmbience: selectedRating ?? 0,
  });

  useEffect(() => {
    const {
      boardCondition,
      throwingLaneConditions,
      lightingConditions,
      spaceAllocated,
      gamingAmbience,
    } = submittedReview?.ratings ?? {};

    if (!submittedReview) return;
    setRating({
      boardCondition: boardCondition ?? 0,
      throwingLaneConditions: throwingLaneConditions ?? 0,
      lightingConditions: lightingConditions ?? 0,
      spaceAllocated: spaceAllocated ?? 0,
      gamingAmbience: gamingAmbience ?? 0,
    });
  }, [submittedReview]);

  const [hoveredStar, setHoveredStar] = useState<{
    [key in keyof RatingsObject]: number | null;
  }>({
    boardCondition: null,
    throwingLaneConditions: null,
    lightingConditions: null,
    spaceAllocated: null,
    gamingAmbience: null,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ review: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      review: submittedReview?.text ?? "",
    },
  });

  // Set value when `submittedReview.text` is loaded
  useEffect(() => {
    if (submittedReview?.text) {
      setValue("review", submittedReview.text);
    }
  }, [submittedReview, setValue]);

  const handlePost = async (data: { review: string }) => {
    if (
      rating.boardCondition < 1 ||
      rating.throwingLaneConditions < 1 ||
      rating.lightingConditions < 1 ||
      rating.spaceAllocated < 1 ||
      rating.gamingAmbience < 1
    ) {
      toast.error("All ratings must be at least 1 star.");
      return;
    }

    try {
      const payload: PostRatingFormData = {
        business: businessId,
        ...rating,
        text: data.review,
        // img: "",
      };
      const res = await postReview(payload);
      if (res.error) {
        toast.error(res.error.message ?? "Error posting review");
        return;
      }
      if (res.success) {
        toast.success("Review posted successfully!");
        fetchReviews();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (data: { review: string }) => {
    const payload: PostRatingFormData = {
      ...rating,
      text: data.review,
      // img: "",
    };
    if (!submittedReview?._id) {
      toast.error("Review ID is missing. Unable to update review.");
      return;
    }
    const res = await updateReview(submittedReview._id, payload);
    if (res.error) {
      toast.error(res.error.message ?? "Error updating review");
      return;
    }
    if (res.success) {
      toast.success("Review updated successfully!");
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    if (!submittedReview?._id) {
      toast.error("Review ID is missing. Unable to delete review.");
      return;
    }
    const res = await deleteReview(submittedReview?._id);
    if (res.error) {
      toast.error(res.error.message ?? "Error deleting review");
      return;
    }
    if (res.success) {
      toast.success("Review deleted successfully!");
      window.location.reload();
    }
  };

  const onSubmit = submittedReview ? handleUpdate : handlePost;

  const renderStars = (category: keyof RatingsObject) =>
    [...Array(5)].map((_, i) => {
      const star = i + 1;
      const isActive = star <= (hoveredStar[category] ?? rating[category] ?? 0);

      return (
        <IconButton
          key={`${category}-${star}`}
          onClick={() => {
            setRating((prev) => ({
              ...prev,
              [category]: star,
            }));
            // Apply validation for minimum rating
            if (star < 1) {
              toast.error(`${category} rating must be at least 1 star.`);
            }
          }}
          onMouseEnter={() =>
            setHoveredStar((prev) => ({
              ...prev,
              [category]: star, // ✅ dynamic key usage
            }))
          }
          onMouseLeave={() =>
            setHoveredStar((prev) => ({
              ...prev,
              [category]: null, // ✅ dynamic key usage
            }))
          }
          sx={{
            padding: 0,
            color: isActive ? "#ffc341" : "white",
          }}
        >
          <StarIcon
            size={20}
            fill={isActive ? "#ffc341" : "white"}
            stroke={isActive ? "#ffc341" : "white"}
          />
        </IconButton>
      );
    });

  const renderRatingCategories = () => {
    const categories = [
      { key: "boardCondition", label: "Board Condition" },
      { key: "throwingLaneConditions", label: "Toe Line (Oche) Conditions" },
      { key: "lightingConditions", label: "Lighting Conditions" },
      { key: "spaceAllocated", label: "Space Allocated" },
      { key: "gamingAmbience", label: "Gaming Ambience" },
    ];

    return (
      <Grid2 container spacing={2}>
        {categories.map(({ key, label }) => (
          <Grid2 size={{ sm: 12, md: 6 }} key={key} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {label}
            </Typography>
            <Box sx={{ display: "flex", gap: 0 }}>
              {renderStars(key as keyof RatingsObject)}
            </Box>
          </Grid2>
        ))}
      </Grid2>
    );
  };

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

        <Box sx={{ display: "flex", gap: 0, mb: 2 }}>
          {renderRatingCategories()}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Controller
            name="review"
            control={control}
            defaultValue={submittedReview?.text ?? ""}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                value={field.value} // controlled value
                onChange={field.onChange} // must handle changes
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
