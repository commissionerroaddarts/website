import { User } from "@/types/user";
import axiosInstance from "@/utils/axiosInstance";

export const getUserProfile = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data; // Expected { message: "Profile fetched successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};
