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
}

const FilterSection = ({
  filters,
  setFilters,
  updateQuery,
  isLoading,
  isFilteration = true,
}: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const closeSidebar = () => {
    setOpenSidebar(false);
    updateQuery();
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
    } else if (filters?.search !== "") {
      return (
        <button className="cursor-pointer" onClick={handleRemoveSearchFilter}>
          <Close />
        </button>
      );
    } else {
      return <Search color="white" />;
    }
  };

  const handleFilterIcon = () => {
    if (Object.values(filters).every((filter) => filter !== "")) {
      return <FunnelX color="white" />;
    } else {
      return <Filter color="white" />;
    }
  };

  return (
    <div className="bg-[#3a2a3e] bg-opacity-50 rounded-lg p-4 mb-8">
      <div className="flex gap-4">
        {isFilteration && (
          <>
            <ThemeButton
              text="Filter"
              startIcon={handleFilterIcon()}
              onClick={() => setOpenSidebar(true)}
            />

            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              open={openSidebar}
              onClose={closeSidebar}
            />
          </>
        )}
        <form onSubmit={updateQuery} className="flex gap-4 w-full">
          <div className="flex-grow">
            <CustomInput
              className="w-full"
              icon={handleSearchInputIcons()}
              iconPosition="end"
              label="Search"
              value={filters.search}
              placeholder="Search by name, tags, tagline etc."
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <ThemeButton text="Search" type="submit" onClick={updateQuery} />
        </form>
      </div>
    </div>
  );
};

export default FilterSection;
