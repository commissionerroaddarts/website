import { ApiResponse, FilterValues } from "@/types/business";
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

export const insertBusiness = async (data: any) => {
  try {
    const { media, ...rest } = data;
    const response = await axiosInstance.post(`${API_URL}`, rest);
    if (response.status === 201) {
      const { _id: businessId } = response.data;
      if (media?.images) {
        const formData = new FormData();
        if (media?.images.length > 0) {
          media?.images.forEach((file: File) => {
            formData.append("images", file);
          });
        }
        if (media?.logo) {
          formData.append("businessLogo", media.logo);
        }
        await axiosInstance.patch(`${API_URL}/media/${businessId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error("Error inserting business:", error);
    throw error;
  }
};
