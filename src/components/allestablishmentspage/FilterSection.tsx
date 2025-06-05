"use client";
import React, { useState } from "react";
import { Filter, FunnelX, Loader, Search } from "lucide-react";
import ThemeButton from "@/components/buttons/ThemeButton";
import CustomInput from "@/components/global/CustomInput";
import FilterSidebar from "./FilterSidebar";
import { FilterValues } from "@/types/business";
import { Close } from "@mui/icons-material";

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
  limit?: number;
  setPage?: (page: number) => void;
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
  limit = 12,
  setPage = () => {}, // Default to a no-op function if not provided
}: Props) => {
  const newLimit = limit === 12 ? 24 : 12;
  const [openSidebar, setOpenSidebar] = useState(false);
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
    if (
      Object.values(filters).every((filter) => filter !== "" && filter !== null)
    ) {
      return <FunnelX color="white" />;
    } else {
      return <Filter color="white" />;
    }
  };

  return (
    <div className="bg-[#3a2a3e] bg-opacity-50 rounded-lg p-4 mb-8 container mx-auto">
      <div className="grid grid-cols-1 gap-4">
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
        {isFilteration && (
          <>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4">
                <ThemeButton
                  text="Filter"
                  startIcon={handleFilterIcon()}
                  onClick={() => setOpenSidebar(true)}
                />
                {isSavedVenues && setSavedVenuesActive && (
                  <ThemeButton
                    text={savedVenuesActive ? "All Venues" : "Saved Venues"}
                    onClick={() => setSavedVenuesActive(!savedVenuesActive)}
                  />
                )}
              </div>
              {setLimit && (
                <ThemeButton
                  text={`Show ${newLimit} venues per page`}
                  onClick={() => {
                    setLimit(newLimit);
                    setPage(1); // Reset to first page when changing limit
                  }}
                />
              )}
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              open={openSidebar}
              onClose={closeSidebar}
              updateQuery={updateQuery}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
