"use client";
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBusiness } from "@/store/slices/businessSlice"; // Adjust path if needed
import type { AppDispatch } from "@/store"; // Adjust path if needed
import { useAppState } from "./useAppState";

const useFetchBusinesses = (page = 1, limit = 3, loadingDelay = 1000) => {
  const dispatch = useDispatch<AppDispatch>();
  const { business } = useAppState();
  const { businesses, status, error } = business; // Destructure from business slice

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
