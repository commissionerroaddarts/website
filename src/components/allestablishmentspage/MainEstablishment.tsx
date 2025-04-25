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

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const boardType = searchParams.get("boardType") ?? "";
  const city = searchParams.get("city") ?? "";
  const state = searchParams.get("state") ?? "";
  const zipcode = searchParams.get("zipcode") ?? "";
  const ageLimit = searchParams.get("ageLimit")?.split(",").map(Number) ?? [
    0,
    100, // Default age limit range
  ];

  const [filterParams, setFilterParams] = useState<FilterValues>({
    search,
    category,
    boardType,
    city,
    state,
    zipcode,
    ageLimit,
  });

  const debouncedSearch = useDebounce(filterParams.search, 500);
  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
    getBusinesses();
  }, [debouncedSearch]);

  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<Business[]>([]); // Single object state for all filters
  const getBusinesses = async () => {
    setLoading(true);
    const { data } = await fetchBusinesses(1, 10, filterParams);
    setBusinesses(data);
    setLoading(false);
  };

  // Update filter params state and query params in the URL
  const updateQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      console.log(key, value);
      if (Array.isArray(value)) {
        if (value.some((v) => v !== null && v !== undefined)) {
          value.forEach((v) => params.append(key, v.toString()));
        }
      } else if (value && value !== "") {
        params.set(key, value.toString());
      }
    });
    getBusinesses();
    router.push(`/establishments?${params.toString()}`);
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
      {businesses.length > 0 ? (
        <BusinessGrid businesses={businesses} isLoading={loading} />
      ) : (
        <NoBusinessesFound setFilterParams={setFilterParams} />
      )}
    </Box>
  );
}

const NoBusinessesFound = ({
  setFilterParams,
}: {
  setFilterParams: (params: FilterValues) => void;
}) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
      className="flex justify-center items-center flex-col py-4 gap-3  rounded-lg shadow-md"
    >
      <SearchX size={50} color="white" strokeWidth={2} />
      <h1 className="text-4xl font-bold capitalize ">No results found!</h1>
      <p>
        Try searching:{" "}
        <button
          className="underline"
          onClick={(e) => setFilterParams({ search: "Darts" })}
        >
          Darts
        </button>
      </p>
    </div>
  );
};
