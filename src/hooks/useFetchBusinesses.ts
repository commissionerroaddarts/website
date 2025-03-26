import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusiness } from "../store/slices/businessSlice"; // Adjust the path if needed
import type { AppDispatch, RootState } from "../store"; // Adjust the path if needed

const useFetchBusinesses = (page = 1, limit = 3) => {
  const dispatch = useDispatch<AppDispatch>();
  const businesses = useSelector(
    (state: RootState) => state.businesses.businesses
  );
  const status = useSelector((state: RootState) => state.businesses.status);
  const error = useSelector((state: RootState) => state.businesses.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBusiness({ page, limit }));
    }
  }, [status, dispatch, page, limit]);

  return { businesses, status, error };
};

export default useFetchBusinesses;
