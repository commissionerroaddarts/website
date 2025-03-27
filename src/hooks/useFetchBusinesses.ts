"use client";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusiness } from "../store/slices/businessSlice"; // Adjust path if needed
import type { AppDispatch, RootState } from "../store"; // Adjust path if needed

const useFetchBusinesses = (page = 1, limit = 3, loadingDelay = 1000) => {
  const dispatch = useDispatch<AppDispatch>();
  const { businesses, status, error } = useSelector(
    (state: RootState) => state.businesses
  );

  // Intentional loading state
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true); // Start intentional loading
    dispatch(fetchBusiness({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (status === "succeeded") {
      setTimeout(() => setIsLoading(false), loadingDelay);
    }
  }, [status, loadingDelay]);

  return { businesses, isLoading, error, refresh: fetchData };
};

export default useFetchBusinesses;
