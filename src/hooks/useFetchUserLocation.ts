import { useAppDispatch } from "@/store"; // Make sure to import your AppDispatch type
import { getLocationDetails, getUserLocation } from "@/services/userService";
import {
  setLocation,
  setLoading,
  setError,
  setLocationDetails,
} from "@/store/slices/locationSlice";

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
      dispatch(setLocation(coords));
      dispatch(setLocationDetails(locationDetails));
    } catch (error: any) {
      dispatch(setError(error?.message ?? "Unknown error"));
    }
  };

  return fetchLocation;
};

export default useFetchLocation;
