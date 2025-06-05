// app/establishments/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import MapSection from "./MapSection";
import FilterSection from "./FilterSection";
import BusinessGrid from "./EstablishmentPageGrid";
import { fetchBusinesses } from "@/services/businessService";
import { Business, FilterValues } from "@/types/business";
import { SearchX } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { useAppState } from "@/hooks/useAppState";
import LoadingIndicator from "@/components/global/LoadingIndicator";

const maxLimit = 12;

export default function MainEstablishment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { wishlist } = useAppState();
  const { items } = wishlist;
  const isSavedVenues = items && items.length > 0;
  const saveVenueBool = searchParams.get("savedVenue") === "true";
  const [savedVenuesActive, setSavedVenuesActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<Business[]>([]); // Single object state for all filters
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(maxLimit);
  const search = searchParams.get("search") ?? null;
  const category = searchParams.get("category") ?? null;
  const bordtype = searchParams.get("boardtype") ?? null;
  const city = searchParams.get("city") ?? null;
  const state = searchParams.get("state") ?? null;
  const zipcode = searchParams.get("zipcode") ?? null;
  const agelimit = searchParams.get("agelimit")?.split(",").map(Number) ?? null;
  const searchPage = parseInt(searchParams.get("page") ?? "1", 10);
  const searchLimit = parseInt(
    searchParams.get("limit") ?? maxLimit.toString(),
    10
  );
  const [filterParams, setFilterParams] = useState<FilterValues>({
    search,
    category,
    bordtype,
    city,
    state,
    zipcode,
    agelimit,
  });
  const params = new URLSearchParams();

  const debouncedSearch = useDebounce(filterParams.search, 500);
  useEffect(() => {
    setPage(1); // Reset page
    setFilterParams((prev) => ({ ...prev, search: debouncedSearch }));
    getBusinesses();
  }, [debouncedSearch, filterParams?.category]);

  useEffect(() => {
    if (items.length === 0) {
      setSavedVenuesActive(false);
    }

    if (savedVenuesActive && !loading) {
      const filteredSavedBusinesses = businesses.filter((b) =>
        items.includes(b._id)
      );
      setBusinesses(filteredSavedBusinesses);
    } else {
      // Restore all businesses when savedVenuesActive is false
      setBusinesses(allBusinesses);
    }
  }, [savedVenuesActive, items, businesses, saveVenueBool]);

  useEffect(() => {
    if (searchPage && !isNaN(searchPage) && searchPage > 0) {
      setPage(searchPage);
    } else {
      setPage(1); // Fallback default
    }

    if (searchLimit && !isNaN(searchLimit) && searchLimit > 0) {
      setLimit(searchLimit);
    } else {
      setLimit(maxLimit); // Fallback default
    }
  }, []);

  useEffect(() => {
    updateQuery();
  }, [page, limit]);

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
    // Ensure page is always a number
    const validPage = Number.isInteger(page) && page > 0 ? page : 1;
    // Ensure limit is always a number
    const validLimit = Number.isInteger(limit) && limit > 0 ? limit : maxLimit;
    try {
      const { data, totalPages } = await fetchBusinesses(
        validPage,
        validLimit,
        validFilterParams
      );
      setAllBusinesses(data);
      setBusinesses(data);
      setTotalPages(totalPages);

      // 👇 Scroll to top after setting businesses
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update filter params state and query params in the URL
  const updateQuery = () => {
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
    if (!params.has("page")) {
      params.append("page", page.toString());
    }
    if (!params.has("limit")) {
      params.append("limit", limit.toString());
    }
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
        isSavedVenues={isSavedVenues}
        setSavedVenuesActive={setSavedVenuesActive}
        savedVenuesActive={savedVenuesActive}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
      />
      {(() => {
        if (loading) {
          return <LoadingIndicator />;
        }
        if (businesses.length > 0) {
          return <BusinessGrid businesses={businesses} isLoading={loading} />;
        }
        return <NoBusinessesFound setFilterParams={setFilterParams} />;
      })()}

      {businesses.length > 0 && totalPages > 1 && !savedVenuesActive && (
        <Box display="flex" justifyContent="center" my={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
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
