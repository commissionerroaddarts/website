import axiosInstance from "../utils/axiosInstance";
import { LoginFormData, SignupFormData } from "../types/auth";

export const loginUser = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data; // Expected { message: "Login successful!", token: "..." }
  } catch (error: any) {
    throw error;
  }
};

export const registerUser = async (data: SignupFormData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data; // Expected { message: "Signup successful!" }
  } catch (error: any) {
    throw error;
  }
};
