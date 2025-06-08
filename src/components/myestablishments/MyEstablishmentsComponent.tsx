// app/profile/view-your-listings/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Container, Pagination } from "@mui/material";
import BusinessGrid from "@/components/allestablishmentspage/EstablishmentPageGrid";
import { fetchBusinesses } from "@/services/businessService";
import { Business, FilterValues } from "@/types/business";
import { SearchX } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import FilterSection from "@/components/allestablishmentspage/FilterSection";
import { useAppState } from "@/hooks/useAppState";
import { TabsComponent } from "@/components/profilepage/TabsComponent";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import LoadingIndicator from "../global/LoadingIndicator";

const maxLimit = 6;

export default function MyEstablishmentsComponent() {
  const { user, wishlist } = useAppState();
  const { userDetails } = user;
  const { _id } = userDetails ?? {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<Business[]>([]); // Single object state for all filters
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(maxLimit);
  const searchPage = parseInt(searchParams.get("page") ?? "1", 10);
  const searchLimit = parseInt(
    searchParams.get("limit") ?? maxLimit.toString(),
    10
  );
  const search = searchParams.get("search") ?? null;
  const [filterParams, setFilterParams] = useState<FilterValues>({
    search,
  });
  const { items } = wishlist;
  const isSavedVenues = items && items.length > 0;
  const [savedVenuesActive, setSavedVenuesActive] = useState(
    searchParams.get("savedVenue") === "true"
  );
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
  }, [savedVenuesActive, items, loading]);

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
  }, [page, limit, savedVenuesActive]);

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
        validFilterParams,
        _id
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
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    router.push(`/profile/view-your-listings?${params.toString()}`);
    getBusinesses();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1, py: 2 }}>
        <TabsComponent userDetails={userDetails} />

        <Box
          sx={{
            maxWidth: businesses.length > 0 ? "100%" : "maxLimit0%",
            margin: "0 auto",
          }}
        >
          <FilterSection
            isLoading={loading}
            filters={filterParams}
            setFilters={setFilterParams}
            updateQuery={updateQuery}
            isFilteration={false}
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
              return (
                <BusinessGrid businesses={businesses} isLoading={loading} />
              );
            }
            return <NoBusinessesFound />;
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
      </Container>
    </Box>
  );
}

const NoBusinessesFound = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(152.7maxLimitdeg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
      className="flex justify-center items-center flex-col py-maxLimit gap-3   rounded-4xl shadow-md"
    >
      <SearchX size={50} color="white" strokeWidth={2} />
      <h1 className="text-2xl md:text-4xl text-center font-bold capitalize ">
        You have no Listings yet!
      </h1>
      <Link href="/add-establishment" passHref>
        <ThemeButton text="Add Listing Now" />
      </Link>
    </Box>
  );
};
