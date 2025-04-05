import axiosInstance from "@/utils/axiosInstance";
import { LoginFormData, SignupFormData } from "@/types/auth";
import { clearUserDetails, setUserDetails } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store";

export const loginUser = async (data: LoginFormData, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    const userDetails = response.data.data; // Assuming the user details are in `response.data.user`
    dispatch(setUserDetails(userDetails)); // Store user details in Redux
    return response.data; // Return the full response if needed
  } catch (error: any) {
    throw error;
  }
};

export const getUserDetails = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    const userDetails = response.data.data; // Assuming the user details are in `response.data.user`
    dispatch(setUserDetails(userDetails)); // Store user details in Redux
    return response.data; // Return the full response if needed
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

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    // Clear user details from  Redux store
    dispatch(clearUserDetails());
    return response.data; // Expected { message: "Logout successful!" }
  } catch (error: any) {
    throw error;
  }
};
