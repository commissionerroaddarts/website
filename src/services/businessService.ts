import { ApiResponse, Business, FilterValues } from "@/types/business";
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

const uploadBusinessMedia = async (media: any, businessId: string) => {
  const hasImageFiles =
    Array.isArray(media?.images) &&
    media.images.some((img: any) => img instanceof Blob);
  const hasLogoFile = media?.logo instanceof Blob;
  const hasCoverFile = media?.cover instanceof Blob;
  if (hasImageFiles || hasLogoFile || hasCoverFile) {
    const formData = new FormData();
    if (hasImageFiles) {
      media?.images?.forEach((file: any) => {
        if (file instanceof Blob) {
          formData.append("images", file);
        }
      });
    }
    if (hasLogoFile && media?.logo) {
      formData.append("businessLogo", media.logo);
    }
    if (hasCoverFile && media?.cover) {
      formData.append("businessCover", media.cover);
    }
    await axiosInstance.patch(`${API_URL}/media/${businessId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};

export const insertBusiness = async (data: Business) => {
  try {
    const { media, noAgeLimit, ...rest } = data;
    const response = await axiosInstance.post(`${API_URL}`, rest);
    if (response.status === 201) {
      const { _id: businessId } = response.data;
      await uploadBusinessMedia(media, businessId);
    }
    return response;
  } catch (error) {
    console.error("Error inserting business:", error);
    throw error;
  }
};
export const updateBusiness = async (data: any) => {
  try {
    const { media, _id, noAgeLimit, ...rest } = data;

    // Step 1: Update business non-media fields
    const response = await axiosInstance.patch(`${API_URL}/${_id}`, rest);

    // Step 2: Handle media separately
    if (response.status === 200 && media) {
      const { images = [], logo, cover } = media;

      const newImages = images.filter((img: any) => img instanceof Blob);
      const isNewLogo = logo instanceof Blob;
      const isNewCover = cover instanceof Blob;
      const imagesFormData = new FormData();
      const logoFormData = new FormData();
      const coverFormData = new FormData();

      if (newImages.length > 0) {
        // Append new image files
        newImages.forEach((file: Blob) => {
          imagesFormData.append("images", file);
        });
        await axiosInstance.patch(`${API_URL}/upload/${_id}`, imagesFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      // Logo handling
      if (isNewLogo) {
        logoFormData.append("businessLogo", logo);

        await axiosInstance.patch(`${API_URL}/media/${_id}`, logoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (isNewCover) {
        coverFormData.append("businessCover", cover);

        await axiosInstance.patch(`${API_URL}/media/${_id}`, coverFormData, {
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
      formData.append("businessCover", cover);

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
export const removeBusinessImage = async (url: string, businessId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/media/${businessId}`,
      { data: { url } } // <-- 'data' is required for axios DELETE body
    );
    return response;
  } catch (error) {
    console.error("Error deleting business media:", error);
    throw error;
  }
};

export const sendMsgToBusiness = async (
  businessId: string,
  data: { firstname: string; email: string; message: string }
) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/contact/${businessId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting business media:", error);
    throw error;
  }
};

// check business name availability
export const checkBusinessNameAvailability = async (businessName: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/check-name`, {
      name: businessName,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking business name availability:", error);
    throw error;
  }
};
