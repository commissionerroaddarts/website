import { FilterValues } from "@/types/business";
import { PostReviewResponse } from "@/types/ratings";
import { PasswordChange, User } from "@/types/user";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export const getUserProfile = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data; // Expected { message: "Profile fetched successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfile = async (data: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(`/users`, data);
    return response.data; // Expected { message: "Profile updated successfully!", user: {...} }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserPassword = async (data: PasswordChange) => {
  try {
    const response = await axiosInstance.post("/auth/change-password", data);
    return response; // Expected { message: "Password updated successfully!" }
  } catch (error: any) {
    throw error;
  }
};

export const getUserRatings = async (
  id: string,
  filters: FilterValues = {},
  page = 1,
  limit = 10
) => {
  try {
    const response = await axiosInstance.get(
      `/reviews?user=${id}&page=${page}&limit=${limit}`,
      {
        params: filters,
      }
    );
    return response.data; // Expected { message: "Ratings fetched successfully!", ratings: [...] }
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfileImage = async (
  formData: FormData
): Promise<PostReviewResponse> => {
  try {
    const response = await axiosInstance.patch<PostReviewResponse>(
      `/users/update-profile-img`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Expected { message: "Profile image updated successfully!", user: {...} }
  } catch (error: any) {
    console.error("Error updating profile image:", error);
    throw error;
  }
};

export const getUserLocation = (): Promise<{ lat: number; lng: number }> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => reject(new Error(error.message || String(error)))
    );
  });

const GOOGLE_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_GEOCODING_API_KEY as string;

interface LocationDetails {
  city: string | null;
  country: string | null;
  zipcode: string | null;
  address: string | null;
}

export const getLocationDetails = async (
  lat: number,
  lng: number
): Promise<LocationDetails> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const results = response.data.results[0];
    const addressComponents: Array<{
      long_name: string;
      types: string[];
    }> = results?.address_components ?? [];

    let city: string | null = null;
    let country: string | null = null;
    let zipcode: string | null = null;
    let address: string | null = null;

    addressComponents.forEach((component) => {
      const types = component.types;
      if (types.includes("locality")) {
        city = component.long_name;
      }
      if (types.includes("country")) {
        country = component.long_name;
      }
      if (types.includes("postal_code")) {
        zipcode = component.long_name;
      }
    });

    if (results?.formatted_address) {
      address = results?.formatted_address;
    }

    return { city, country, zipcode, address };
  } catch (error) {
    console.error("Error fetching location details:", error);
    return { city: null, country: null, zipcode: null, address: null };
  }
};
