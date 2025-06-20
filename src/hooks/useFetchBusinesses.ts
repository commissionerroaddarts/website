"use client";
import { useEffect, useCallback } from "react";
import { fetchBusiness } from "@/store/slices/businessSlice"; // Adjust path if needed
import { useAppState } from "./useAppState";
import { useAppDispatch } from "@/store";

const useFetchBusinesses = (
  page = 1,
  limit = 3,
  lat?: number,
  lng?: number,
  sort?: string
) => {
  const dispatch = useAppDispatch();
  const { business } = useAppState();
  const { businesses, status, error } = business; // Destructure from business slice

  const fetchData = useCallback(() => {
    dispatch(fetchBusiness({ page, limit, lat, lng, sort }));
  }, [dispatch, page, limit, lat, lng, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.error(error);
  return { businesses, status, error, refresh: fetchData };
};

export default useFetchBusinesses;
