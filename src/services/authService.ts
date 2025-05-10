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
    console.error("Login error:", error);
  }
};

export const getUserDetails = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    const userDetails = response.data.data.user; // Assuming the user details are in `response.data.user`
    const subscription = response.data.data?.subscription; // Assuming the subscription details are in `response.data.subscription`
    if (subscription) {
      userDetails["subscription"] = subscription; // Add subscription details to userDetails
    }
    dispatch(setUserDetails(userDetails)); // Store user details in Redux
    // return response.data; // Return the full response if needed
  } catch (error: any) {
    console.error("Get user details error:", error);
  }
};

export const registerUser = async (data: SignupFormData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data; // Expected { message: "Signup successful!" }
  } catch (error: any) {
    console.error("Signup error:", error);
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    // Clear user details from  Redux store
    dispatch(clearUserDetails());
    return response.data; // Expected { message: "Logout successful!" }
  } catch (error: any) {
    console.error("Logout error:", error);
  }
};

export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response; // Expected { message: "Password reset link sent!" }
  } catch (error: any) {
    console.error("Forgot password error:", error);
  }
};
