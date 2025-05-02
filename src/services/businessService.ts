import { ApiResponse, Business, FilterValues } from "@/types/business";
import { baseUrl } from "@/constants/baseUrl";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = `${baseUrl}/businesses`;

export const fetchBusinesses = async (
  page = 1,
  limit = 10,
  filters: FilterValues = {}
): Promise<ApiResponse> => {
  try {
    // Start building the query string
    const params = new URLSearchParams();

    // Add static params
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    // Add dynamic filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          // If the value is an array, join it with commas (or use another separator)
          params.set(key, value.join(","));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    // Build the final URL with the query parameters
    const url = `${API_URL}?${params.toString()}`;

    // Make the API request
    const response = await axiosInstance.get<ApiResponse>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

export const insertBusiness = async (data: Partial<Business>) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key as keyof Business];
      if (value !== undefined && value !== null) {
        if (key === "businessLogo" && value instanceof File) {
          formData.append(key, value, value.name);
        } else if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append(key, file, file.name);
            }
          });
        } else {
          formData.append(key, value?.toString());
        }
      }
    }
    console.log(formData);

    const response = await axiosInstance.post(`${API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error inserting business:", error);
    throw error;
  }
};
