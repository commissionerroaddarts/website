import { useAppDispatch } from "@/store";
import {
  getLocationDetails,
  getUserLocation,
  getApproxLocationFromIP,
} from "@/services/userService";
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
      let coords;

      try {
        coords = await getUserLocation(); // try browser geolocation
      } catch (geoError: any) {
        console.warn(
          "Geolocation denied, falling back to IP:",
          geoError.message
        );
        coords = await getApproxLocationFromIP(); // fallback to IP-based
      }

      const locationDetails: any = await getLocationDetails(
        coords.lat,
        coords.lng
      );
      const countryCode =
        locationDetails?.address?.country_code?.toUpperCase() ??
        locationDetails?.country;
      console.log({ countryCode });

      if (countryCode !== "US" && countryCode !== "United States") {
        dispatch(setLocation(DEFAULT_US_LOCATION));
        const defaultLocationDetails = await getLocationDetails(
          DEFAULT_US_LOCATION.lat,
          DEFAULT_US_LOCATION.lng
        );
        dispatch(setLocationDetails(defaultLocationDetails));
      } else {
        dispatch(setLocation(coords));
        dispatch(setLocationDetails(locationDetails));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setError(error?.message ?? "Unknown error"));
    }
  };

  return fetchLocation;
};

export default useFetchLocation;
