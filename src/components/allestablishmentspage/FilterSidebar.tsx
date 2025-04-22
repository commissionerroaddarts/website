"use client";

import React from "react";
import { Box, Drawer, IconButton, Slider } from "@mui/material";
import { motion } from "framer-motion";
import ThemeButton from "@/components/buttons/ThemeButton";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import CustomInput from "@/components/global/CustomInput";
import { FilterValues } from "@/types/business";
import { Close } from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
}

const FilterSidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  filters,
  setFilters,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name as keyof FilterValues]: value,
    });
  };

  const categoryOptions = [
    { label: "Category 1", value: "category1" },
    { label: "Category 2", value: "category2" },
  ];

  const boardTypeOptions = [
    { label: "Type 1", value: "type1" },
    { label: "Type 2", value: "type2" },
  ];

  const cityOptions = [
    { label: "City 1", value: "city1" },
    { label: "City 2", value: "city2" },
  ];

  const stateOptions = [
    { label: "State 1", value: "state1" },
    { label: "State 2", value: "state2" },
  ];

  const handleRemoveFilters = () => {
    setFilters({
      category: "",
      boardType: "",
      city: "",
      state: "",
      zipcode: "",
      ageLimit: [0, 100],
    });
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <motion.form
        onSubmit={onClose}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3 }}
        className="w-72 p-5 h-full overflow-y-auto"
        style={{
          background:
            "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        {/* Category */}
        <Box mb={3}>
          <SelectSearchDropDown
            label="category"
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
            value={filters.ageLimit ?? 0}
            name="ageLimit"
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(_, value) =>
              setFilters({ ...filters, ageLimit: value as number[] })
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
            name="boardType"
            options={boardTypeOptions}
            value={filters.boardType ?? ""}
            onChange={handleFilterChange}
          />
        </Box>

        {/* City */}
        <Box mb={3}>
          <SelectSearchDropDown
            label="City"
            name="city"
            options={cityOptions}
            value={filters.city ?? ""}
            onChange={handleFilterChange}
          />
        </Box>

        {/* State */}
        <Box mb={3}>
          <SelectSearchDropDown
            label="State"
            name="state"
            options={stateOptions}
            value={filters.state ?? ""}
            onChange={handleFilterChange}
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
          {/* Remove Filters Button */}
          {Object.values(filters).some((filter) => filter !== "") && (
            <Box mb={3}>
              <ThemeButton
                text="Remove Filters"
                onClick={handleRemoveFilters}
                variant="outlined"
                color="secondary"
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                  borderRadius: "100px",
                  minWidth: "120px",
                  padding: "0.8rem 2rem",
                }}
                className="w-full"
              />
            </Box>
          )}

          {/* Apply Button */}
          <Box display="flex" justifyContent="flex-end">
            <ThemeButton
              text="Apply Filters"
              className="w-full"
              onClick={onClose}
              type="submit"
            />
          </Box>
        </div>
      </motion.form>
    </Drawer>
  );
};

export default FilterSidebar;
