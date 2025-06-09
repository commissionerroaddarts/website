"use client";

import React from "react";
import { Box, Drawer, Slider } from "@mui/material";
import { motion } from "framer-motion";
import ThemeButton from "@/components/buttons/ThemeButton";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import CustomInput from "@/components/global/CustomInput";
import { FilterValues } from "@/types/business";
import { boardTypeOptions, categoryOptions } from "@/utils/dropdowns";
import { useRouter } from "next/navigation";
import CloseIconButton from "@/components/global/CloseIconButton";
import { CityDropdownFilter } from "../global/CityDropdownFilter";
import { StatesDropdownFilter } from "../global/StatesDropdownFilter";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  updateQuery: () => void;
}

const FilterSidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  filters,
  setFilters,
  updateQuery,
}) => {
  const router = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name as keyof FilterValues]: value,
    });
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <motion.form
        onSubmit={onClose}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3 }}
        className="w-72 p-5 h-full overflow-y-auto overflow-x-hidden"
        style={{
          background:
            "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

        <CloseIconButton onClick={onClose} />
        {/* Category */}
        <Box mb={3}>
          <SelectSearchDropDown
            label="Category"
            name="category"
            options={categoryOptions}
            value={filters.category ?? ""}
            onChange={handleFilterChange}
          />
        </Box>

        {/* Age Limit */}
        <Box mb={3}>
          <label
            htmlFor="age-limit-slider"
            className="block text-white font-medium mb-2"
          >
            Age Limit
          </label>
          <Slider
            id="age-limit-slider"
            value={filters.agelimit ?? 0}
            name="agelimit"
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(_, value) =>
              setFilters({ ...filters, agelimit: value as number[] })
            }
            sx={{
              color: "#C45EEE",
            }}
          />
        </Box>

        {/* Board Type */}
        <Box mb={3}>
          <SelectSearchDropDown
            label="Board Type"
            name="bordtype"
            options={boardTypeOptions}
            value={filters.bordtype ?? ""}
            onChange={handleFilterChange}
          />
        </Box>

        {/* City */}
        <Box mb={3}>
          <CityDropdownFilter
            handleChange={handleFilterChange}
            value={filters?.city ?? ""}
          />
        </Box>

        {/* State */}
        <Box mb={3}>
          <StatesDropdownFilter
            handleChange={handleFilterChange}
            value={filters?.state ?? ""}
          />
        </Box>

        {/* Zipcode */}
        <Box mb={3}>
          <CustomInput
            label="Zipcode"
            name="zipcode"
            placeholder="Enter Zipcode"
            value={filters.zipcode ?? ""}
            onChange={handleFilterChange}
          />
        </Box>
        <div className="flex flex-col justify-center">
          {/* Apply Button */}
          <Box display="flex" justifyContent="flex-end">
            <ThemeButton
              text="Apply Filters"
              className="w-full"
              onClick={() => {
                updateQuery();
                onClose();
              }}
            />
          </Box>
        </div>
      </motion.form>
    </Drawer>
  );
};

export default FilterSidebar;
