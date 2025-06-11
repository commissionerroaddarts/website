import { useAppDispatch } from "@/store";
import { getLocationDetails, getUserLocation } from "@/services/userService";
import {
  setLocation,
  setLoading,
  setError,
  setLocationDetails,
} from "@/store/slices/locationSlice";

const DEFAULT_US_LOCATION = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

const useFetchLocation = (): (() => Promise<void>) => {
  const dispatch = useAppDispatch();

  const fetchLocation = async (): Promise<void> => {
    dispatch(setLoading());

    try {
      const coords = await getUserLocation();
      const locationDetails: any = await getLocationDetails(
        coords.lat,
        coords.lng
      );

      const countryCode = locationDetails?.address?.country_code?.toUpperCase();

      if (countryCode !== "US") {
        // User is outside the US – set default location
        dispatch(setLocation(DEFAULT_US_LOCATION));
        const defaultLocationDetails = await getLocationDetails(
          DEFAULT_US_LOCATION.lat,
          DEFAULT_US_LOCATION.lng
        );

        dispatch(setLocationDetails(defaultLocationDetails));
      } else {
        // User is in the US – set actual location
        dispatch(setLocation(coords));
        dispatch(setLocationDetails(locationDetails));
      }
    } catch (error: any) {
      dispatch(setError(error?.message ?? "Unknown error"));
    }
  };

  return fetchLocation;
};

export default useFetchLocation;
