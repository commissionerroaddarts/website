import axios from "axios";
import { LoginFormData, SignupFormData } from "../types/auth";
import { baseUrl } from "../constants/baseUrl";

const API_URL = `${baseUrl}/auth`;

export const loginUser = async (data: LoginFormData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data; // Expected { message: "Login successful!", token: "..." }
  } catch (error: any) {
    throw error;
  }
};

export const registerUser = async (data: SignupFormData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data; // Expected { message: "Login successful!", token: "..." }
  } catch (error: any) {
    throw error;
  }
};
