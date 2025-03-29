import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${baseUrl}/`, // Base URL for all API requests
  withCredentials: true, // Include cookies in requests
  timeout: 10000, // Set a timeout for requests (10 seconds)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Since the token is stored in an HTTP-only cookie, it will be automatically sent with requests
    // No need to manually add the token to the headers
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(
      error instanceof Error
        ? error
        : new Error(error?.message || "An unknown error occurred")
    );
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "API Error:",
        error?.response?.data?.message || error?.message
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error?.message);
    } else {
      // Something else caused the error
      console.error("Error:", error?.message);
    }
    return Promise.reject(
      error instanceof Error
        ? error
        : new Error(error?.message || "An unknown error occurred")
    );
  }
);

export default axiosInstance;
