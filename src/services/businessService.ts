import { ApiResponse, FilterValues } from "@/types/business";
import { baseUrl } from "@/constants/baseUrl";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = `${baseUrl}/businesses`;

export const fetchBusinesses = async (
  page = 1,
  limit = 10,
  filters: FilterValues = {},
  userId?: string
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
    let url = `${API_URL}?${params.toString()}`;

    // If userId is provided, append it to the URL
    if (userId) {
      const userParams = new URLSearchParams();
      userParams.set("user", userId);
      url += `&${userParams.toString()}`;
    }

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
      const hasImageFiles =
        Array.isArray(media?.images) &&
        media.images.some((img: any) => img instanceof Blob);
      const hasLogoFile = media?.logo instanceof Blob;
      if (hasImageFiles || hasLogoFile) {
        const formData = new FormData();
        if (hasImageFiles) {
          media.images.forEach((file: File) => {
            if (file instanceof Blob) {
              formData.append("images", file);
            }
          });
        }
        if (hasLogoFile) {
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

export const updateBusiness = async (data: any) => {
  try {
    const { media, _id, ...rest } = data;
    const response = await axiosInstance.patch(`${API_URL}/${_id}`, rest);
    if (response.status === 200) {
      if (
        Array.isArray(media?.images) &&
        media.images.every((img: any) => img instanceof Blob) &&
        media.logo instanceof Blob
      ) {
        const formData = new FormData();
        if (media.images.length > 0) {
          media.images.forEach((file: Blob) => {
            formData.append("images", file);
          });
        }
        formData.append("businessLogo", media.logo);
        await axiosInstance.patch(`${API_URL}/media/${_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    }

    return response;
  } catch (error) {
    console.error("Error updating business:", error);
    throw error;
  }
};

export const deleteBusiness = async (businessId: string) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${businessId}`);
    return response;
  } catch (error) {
    console.error("Error deleting business:", error);
    throw error;
  }
};

export const insertBusinessPromotion = async (
  inputValue: string,
  businessId: string
) => {
  try {
    const response = await axiosInstance.post(`/promotion/${businessId}`, {
      title: `Promotion ${businessId}`,
      description: inputValue,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting business promotion:", error);
    throw error;
  }
};

export const insertBusinessLogo = async (
  businessId: string,
  logo: File | null
) => {
  try {
    if (logo) {
      const formData = new FormData();
      formData.append("businessLogo", logo);

      const response = await axiosInstance.patch(
        `${API_URL}/media/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error inserting business media:", error);
    throw error;
  }
};

export const insertBusinessCover = async (businessId: string, cover: File) => {
  try {
    if (cover) {
      const formData = new FormData();
      formData.append("images[]", cover);

      const response = await axiosInstance.patch(
        `${API_URL}/media/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error inserting business media:", error);
    throw error;
  }
};

export const insertBusinessImages = async (
  businessId: string,
  images: File[] | null
) => {
  try {
    if (images && images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axiosInstance.patch(
        `${API_URL}/media/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error inserting business media:", error);
    throw error;
  }
};
