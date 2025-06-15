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
    throw error;
  }
};

export const getUserDetails = async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    const data = response.data.data; // Assuming the user details are in `response.data.user`
    const userDetails = data?.user; // Assuming the user details are in `response.data.user`
    const subscription = data?.subscription; // Assuming the subscription details are in `response.data.subscription`
    const permissions = data?.permissions; // Assuming the permissions details are in `response.data.permissions`
    const canAdd = data?.canAdd; // Assuming the canAdd flag is in `response.data.canAdd`
    const businessCount = data?.businessCount; // Assuming the businessCount is in `response.data.businessCount`
    userDetails["canAdd"] = canAdd; // Add canAdd flag to userDetails
    userDetails["businessCount"] = businessCount; // Add businessCount to userDetails
    if (subscription) {
      userDetails["subscription"] = subscription; // Add subscription details to userDetails
    }
    if (permissions) {
      userDetails["permissions"] = permissions; // Add permissions details to userDetails
    }
    dispatch(setUserDetails(userDetails)); // Store user details in Redux
    // return response.data; // Return the full response if needed
  } catch (error: any) {
    console.error("Get user details error:", error);
    if (window.location.pathname === "/add-establishment") {
      window.location.href = "/plans";
    }
  }
};

export const registerUser = async (
  data: SignupFormData,
  dispatch: AppDispatch
) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    const userDetails = response.data.data; // Assuming the user details are in `response.data.user`
    const subscription = response.data?.subscription; // Assuming the subscription details are in `response.data.subscription`
    const permissions = response.data?.permissions; // Assuming the permissions details are in `response.data.permissions`
    if (subscription) {
      userDetails["subscription"] = subscription; // Add subscription details to userDetails
    }
    if (permissions) {
      userDetails["permissions"] = permissions; // Add permissions details to userDetails
    }
    dispatch(setUserDetails(userDetails)); // Store user details in Redux

    return response; // Expected { message: "Signup successful!" }
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message ?? "Signup failed");
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

export const resetPassword = async (newPassword: string, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/auth/reset-password?token=${token}`,
      { newPassword }
    );
    return response; // Expected { message: "Password reset successful!" }
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const verifyEmail = async (data: { email: string }) => {
  try {
    const response = await axiosInstance.post("/auth/resend", data);
    return response; // Expected { message: "Email verification link sent!" }
  } catch (error: any) {
    console.error("Email verification error:", error);
  }
};

export const recaptchaVerify = async (token: string) => {
  try {
    const response = await axiosInstance.get(
      `/auth/verify-captcha?token=${token}`
    );
    return response; // Expected { message: "reCAPTCHA verified!" }
  } catch (error: any) {
    console.error("reCAPTCHA verification error:", error);
  }
};
