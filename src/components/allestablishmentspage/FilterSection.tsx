"use client";
import React, { useState } from "react";
import { Filter, FunnelX, Loader, Search } from "lucide-react";
import ThemeButton from "@/components/buttons/ThemeButton";
import CustomInput from "@/components/global/CustomInput";
import FilterSidebar from "./FilterSidebar";
import { FilterValues } from "@/types/business";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Box, MenuItem, Select, Switch, Typography } from "@mui/material";
import SelectSearchDropDown from "../global/SelectSearchDropDown";

interface Props {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  updateQuery: () => void;
  isLoading: boolean;
  isFilteration?: boolean;
  isSavedVenues?: boolean;
  savedVenuesActive?: boolean;
  setSavedVenuesActive?: (arg: boolean) => void;
  setLimit?: (limit: number) => void;
  maxLimit?: number;
  limit?: number;
  setPage?: (page: number) => void;
  userCity?: string | null;
  userCountry?: string | null;
  businessCount?: number; // Optional prop for business count
}

const FilterSection = ({
  filters,
  setFilters,
  updateQuery,
  isLoading,
  isFilteration = true,
  isSavedVenues,
  setSavedVenuesActive,
  savedVenuesActive,
  setLimit = () => {}, // Default to a no-op function if not provided
  maxLimit = 12,
  limit,
  setPage = () => {}, // Default to a no-op function if not provided
  userCity,
  userCountry,
  businessCount = 0, // Optional prop for business count
}: Props) => {
  const newLimit = limit === maxLimit ? 24 : maxLimit;
  const hasFilters = Object.entries(filters).some(
    ([key, value]) =>
      !["lat", "lng", "sort", "page", "limit"].includes(key) &&
      value !== "" &&
      value !== null &&
      value !== undefined
  );
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  const handleRemoveSearchFilter = () => {
    setFilters({ ...filters, search: "" });
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState(null, "", url.toString());
  };

  const handleSearchInputIcons = () => {
    if (isLoading) {
      return <Loader color="white" />;
    } else if (filters?.search !== null && filters?.search !== "") {
      return (
        <button
          className="cursor-pointer bg-transparent border-none p-0"
          onClick={handleRemoveSearchFilter}
          aria-label="Remove search filter"
          type="button"
        >
          <Close />
        </button>
      );
    } else {
      return <Search color="white" />;
    }
  };
  const handleFilterIcon = () => {
    if (hasFilters) {
      return <FunnelX color="white" />;
    } else {
      return <Filter color="white" />;
    }
  };

  const handleRemoveFilters = () => {
    setFilters({
      category: null,
      bordtype: null,
      city: null,
      state: null,
      zipcode: null,
      agelimit: null,
    });

    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("boardtype");
    url.searchParams.delete("city");
    url.searchParams.delete("state");
    url.searchParams.delete("zipcode");
    url.searchParams.delete("agelimit");

    router.push("/establishments");
  };

  const sortOptions = [
    {
      label: "Nearest",
      value: "nearest",
    },
    {
      label: "Top Rated",
      value: "rating_desc",
    },
    {
      label: "Most Reviewed",
      value: "reviews_desc",
    },
  ];

  const userAddress =
    userCity && userCountry
      ? `Establishments near ${userCity}, ${userCountry}`
      : null;

  return (
    <div className="bg-[#3a2a3e] bg-opacity-50 rounded-lg p-4 mb-8 container mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {isFilteration && (
          <Box className="flex items-center justify-between flex-wrap">
            <Typography variant="h5" p={1}>
              {filters.sort === "nearest" ? userAddress : `All Establishments`}
            </Typography>
            <div className="flex max-md:w-full md:min-w-[20%]">
              <SelectSearchDropDown
                options={sortOptions}
                label="Sort By"
                value={filters.sort || ""}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
              />
            </div>
          </Box>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateQuery();
          }}
          className="flex flex-col md:flex-row gap-4 w-full flex-grow"
        >
          <div className="flex-grow">
            <CustomInput
              className="w-full"
              icon={handleSearchInputIcons()}
              iconPosition="end"
              label="Search"
              value={filters.search}
              placeholder="Search by Dartboard Type, Zip Code, Venue Type etc."
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <ThemeButton text="Search" type="submit" />
        </form>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            {isFilteration && (
              <>
                <ThemeButton
                  text="Filter"
                  startIcon={handleFilterIcon()}
                  onClick={() => setOpenSidebar(true)}
                />
                {hasFilters && (
                  <ThemeButton
                    text="Clear Filters"
                    onClick={handleRemoveFilters}
                    backgroundColor="red"
                  />
                )}
              </>
            )}
            {isSavedVenues && setSavedVenuesActive && (
              <ThemeButton
                text={savedVenuesActive ? "All Venues" : "Saved Venues"}
                onClick={() => setSavedVenuesActive(!savedVenuesActive)}
              />
            )}
          </div>

          {setLimit && !savedVenuesActive && businessCount > 12 && (
            <ThemeButton
              text={`Show ${newLimit} venues per page`}
              onClick={() => {
                setLimit(newLimit);
                setPage(1); // Reset to first page when changing limit
              }}
            />
          )}
        </div>
        {isFilteration && (
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            open={openSidebar}
            onClose={closeSidebar}
            updateQuery={updateQuery}
          />
        )}
      </div>
    </div>
  );
};

export default FilterSection;
