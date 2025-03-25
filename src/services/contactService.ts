import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
import { Inquiry } from "../types/contactUs";

export const submitContactForm = async (data: Inquiry) => {
  const response = await axios.post(`${baseUrl}/contactus`, data);
  return response.data;
};
