// app/establishments/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FilterSection from "../allestablishmentspage/FilterSection";
import { FilterValues } from "@/types/business";
import { SearchX } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { Event } from "@/types/event";
import MapSection from "../allestablishmentspage/MapSection";
import { fetchEvents } from "@/services/eventService";

export default function MainEvents() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]); // Single object state for all filters
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const bordtype = searchParams.get("boardtype") ?? "";
  const city = searchParams.get("city") ?? "";
  const state = searchParams.get("state") ?? "";
  const zipcode = searchParams.get("zipcode") ?? "";
  const agelimit = searchParams.get("agelimit")?.split(",").map(Number) ?? [
    0,
    100, // Default age limit range
  ];

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
    getEvents();
  }, [debouncedSearch]);

  const getEvents = async () => {
    setLoading(true);
    const { data } = await fetchEvents(1, 10, filterParams);
    setEvents(data);
    setLoading(false);
  };

  // Update filter params state and query params in the URL
  const updateQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.some((v) => v !== null && v !== undefined)) {
          value.forEach((v) => params.append(key, v.toString()));
        }
      } else if (value && value !== "") {
        params.set(key, value.toString());
      }
    });
    getEvents();
    router.push(`/establishments?${params.toString()}`);
  };

  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
      <MapSection businesses={events} isLoading={loading} />
      <FilterSection
        isLoading={loading}
        filters={filterParams}
        setFilters={setFilterParams}
        updateQuery={updateQuery}
      />
      {events.length > 0 ? (
        // <EstablishmentPageGrid businesses={events} isLoading={loading} />
        <p></p>
      ) : (
        <NoEventsFound setFilterParams={setFilterParams} />
      )}
    </Box>
  );
}

const NoEventsFound = ({
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
