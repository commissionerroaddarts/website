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
    const response = await axiosInstance.put("/auth/change-password", data);
    return response.data; // Expected { message: "Password updated successfully!" }
  } catch (error: any) {
    throw error;
  }
};

export const getUserRatings = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reviews?user=${id}`);
    return response.data; // Expected { message: "Ratings fetched successfully!", ratings: [...] }
  } catch (error: any) {
    throw error;
  }
};
