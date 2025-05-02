import {
  PostRatingFormData,
  PostReviewResponse,
  RatingResponse,
  ReviewApiResponse,
} from "@/types/ratings";
import axiosInstance from "@/utils/axiosInstance";

export const getReviews = async (): Promise<RatingResponse> => {
  try {
    const response = await axiosInstance.get(`/reviews`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching all reviews:", error);
    throw error;
  }
};

export const getAReview = async (id: string): Promise<RatingResponse> => {
  try {
    const { data } = await axiosInstance.get(`/reviews/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error fetching review:", error.message ?? error);
    throw error;
  }
};

export const postReview = async (
  review: PostRatingFormData
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.post(`/reviews`, review);
    return response.data;
  } catch (error: any) {
    console.error("Error posting review:", error);
    throw error;
  }
};

export const deleteReview = async (id: string): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.delete(`/reviews/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const updateReview = async (
  id: string,
  review: Partial<PostRatingFormData>
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.patch(`/reviews/${id}`, review);
    return response.data;
  } catch (error: any) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const getBusinessReviews = async (
  id: string,
  params: string,
  pageNum: number = 1,
  limit: number = 3
): Promise<ReviewApiResponse> => {
  try {
    const response = await axiosInstance.get(
      `/reviews?business=${id}&ssort=${params}&page=${pageNum}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching business reviews:", error);
    throw error;
  }
};
