import { FilterValues } from "@/types/business";
import { PostReviewResponse } from "@/types/ratings";
import { PasswordChange, User } from "@/types/user";
import axiosInstance from "@/utils/axiosInstance";

export const getUserProfile = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data; // Expected { message: "Profile fetched successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfile = async (data: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(`/users`, data);
    return response.data; // Expected { message: "Profile updated successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserPassword = async (data: PasswordChange) => {
  try {
    const response = await axiosInstance.post("/auth/change-password", data);
    return response; // Expected { message: "Password updated successfully!" }
  } catch (error: any) {
    throw error;
  }
};

export const getUserRatings = async (
  id: string,
  filters: FilterValues = {},
  page = 1,
  limit = 10
) => {
  try {
    const response = await axiosInstance.get(
      `/reviews?user=${id}&page=${page}&limit=${limit}`,
      {
        params: filters,
      }
    );
    return response.data; // Expected { message: "Ratings fetched successfully!", ratings: [...] }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfileImage = async (
  formData: FormData
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.patch<PostReviewResponse>(
      `/users/update-profile-img`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Expected { message: "Profile image updated successfully!", user: {...} }
  } catch (error: any) {
    console.error("Error updating profile image:", error);
    throw error;
  }
};
