import { User } from "../types/user";
import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>("/users/ibrarullah");
    console.log(response);
    return response.data; // Expected { message: "Profile fetched successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};
