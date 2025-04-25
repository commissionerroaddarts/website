"use client";

import React, { useState } from "react";
import { Box, Drawer, IconButton, Slider } from "@mui/material";
import { motion } from "framer-motion";
import ThemeButton from "@/components/buttons/ThemeButton";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import CustomInput from "@/components/global/CustomInput";
import { FilterValues } from "@/types/business";
import { Close } from "@mui/icons-material";
import { useMemo } from "react";
import { cities_states } from "@/utils/cities_states"; // Assume this is a JSON file with all US cities

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
  const [visibleCities, setVisibleCities] = useState(10);
  const [visibleStates, setVisiblesStates] = useState(10);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name as keyof FilterValues]: value,
    });
  };

  const categoryOptions = [
    { label: "Bar & Grill", value: "Bar & Grill" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Gaming Hall", value: "Gaming Hall" },
  ];

  const boardTypeOptions = [
    { label: "Steel Tip", value: "Steel Tip" },
    { label: "Plastic", value: "Plastic" },
    { label: "Both", value: "Both" },
  ];

  const cityOptions = useMemo(() => {
    return cities_states.slice(0, visibleCities).map((cs) => ({
      label: cs.city + ", " + cs.state,
      value: cs.city,
    }));
  }, [visibleCities]);

  const stateOptions = useMemo(() => {
    return cities_states.slice(0, visibleStates).map((cs) => ({
      label: cs.state,
      value: cs.state,
    }));
  }, []);

  const handleScrollCities = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleCities((prev) => Math.min(prev + 10, cities_states.length));
    }
  };

  const handleScrollStates = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisiblesStates((prev) => Math.min(prev + 10, cities_states.length));
    }
  };

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
            onScroll={handleScrollCities}
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
            onScroll={handleScrollStates}
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
          {/* Apply Button */}
          <Box display="flex" justifyContent="flex-end">
            <ThemeButton
              text="Apply Filters"
              className="w-full"
              onClick={onClose}
              type="submit"
            />
          </Box>

          {/* Remove Filters Button */}
          {Object.values(filters).some((filter) => filter !== "") && (
            <Box mb={3}>
              <ThemeButton
                text="Clear Filters"
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
        </div>
      </motion.form>
    </Drawer>
  );
};

export default FilterSidebar;
