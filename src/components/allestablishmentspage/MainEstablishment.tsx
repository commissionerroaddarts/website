// app/establishments/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MapSection from "./MapSection";
import FilterSection from "./FilterSection";
import BusinessGrid from "./EstablishmentPageGrid";
import { fetchBusinesses } from "@/services/businessService";
import { Business, FilterValues } from "@/types/business";
import { SearchX } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";

export default function MainEstablishment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<Business[]>([]); // Single object state for all filters
  const search = searchParams.get("search") ?? null;
  const category = searchParams.get("category") ?? null;
  const bordtype = searchParams.get("boardtype") ?? null;
  const city = searchParams.get("city") ?? null;
  const state = searchParams.get("state") ?? null;
  const zipcode = searchParams.get("zipcode") ?? null;
  const agelimit = searchParams.get("agelimit")?.split(",").map(Number) ?? null;

  const [filterParams, setFilterParams] = useState<FilterValues>({
    search,
    category,
    bordtype,
    city,
    state,
    zipcode,
    agelimit,
  });

  const debouncedSearch = useDebounce(filterParams.search, 500);
  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
    getBusinesses();
  }, [debouncedSearch, filterParams?.category]);

  const getBusinesses = async () => {
    setLoading(true);
    // Create a cleaned version of filterParams
    const validFilterParams = Object.fromEntries(
      Object.entries(filterParams).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.some((v) => v !== null && v !== undefined && v !== "");
        }
        return (
          value !== null && value !== undefined && value !== "" && value !== 0
        );
      })
    );

    try {
      const { data } = await fetchBusinesses(1, 10, validFilterParams);
      setBusinesses(data);
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update filter params state and query params in the URL
  const updateQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const validValues = value.filter(
          (v) => v !== null && v !== undefined && v !== ""
        );
        if (validValues.length > 0) {
          validValues.forEach((v) => params.append(key, v.toString()));
        }
      } else if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        params.set(key, value.toString());
      }
    });
    router.push(`/establishments?${params.toString()}`);
    getBusinesses();
  };

  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
      <MapSection businesses={businesses} isLoading={loading} />
      <FilterSection
        isLoading={loading}
        filters={filterParams}
        setFilters={setFilterParams}
        updateQuery={updateQuery}
      />
      {(() => {
        if (loading) {
          return (
            <div className="w-full flex justify-center items-center h-20">
              <svg
                className="animate-spin h-10 w-10 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-5 0h-4a2.5 2.5 0 0 1-4.5-1z"
                />
              </svg>
            </div>
          );
        }
        if (businesses.length > 0) {
          return <BusinessGrid businesses={businesses} isLoading={loading} />;
        }
        return <NoBusinessesFound setFilterParams={setFilterParams} />;
      })()}
    </Box>
  );
}

const NoBusinessesFound = ({
  setFilterParams,
}: {
  setFilterParams: (params: FilterValues) => void;
}) => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
      className="flex justify-center items-center flex-col py-4 gap-3   rounded-lg shadow-md"
    >
      <SearchX size={50} color="white" strokeWidth={2} />
      <h1 className="text-2xl md:text-4xl text-center font-bold capitalize ">
        No results found!
      </h1>
      <p>
        Try searching:{" "}
        <button
          className="underline"
          onClick={(e) => setFilterParams({ search: "Darts" })}
        >
          Darts
        </button>
      </p>
    </Box>
  );
};
