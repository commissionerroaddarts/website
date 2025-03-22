"use client";

import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import ThemeButton from "./buttons/ThemeButton";
import SearchIcon from "@mui/icons-material/Search";
import SelectSearchDropDown from "./SelectSearchDropDown";

const categories = [
  { value: "food", label: "Food" },
  { value: "service", label: "Service" },
  { value: "restaurant", label: "Restaurant" },
];

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const SearchComponent: React.FC = () => {
  const [category, setCategory] = React.useState("");
  const [city, setCity] = React.useState("");

  const handleSearch = () => {
    console.log("Searching for:", { category, city });
    // Implement search logic here
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 800,
        margin: "3rem auto -3rem",
        zIndex: 20,
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          filter: "blur(0.5px)",
          borderRadius: "23px",
          border: "1px solid border: 0.86px solid",
          borderImageSource:
            " linear-gradient(109.03deg, rgba(255, 255, 255, 0.8) 0.66%, rgba(211, 211, 211, 0.1) 99.26%)",

          width: "100%",
          height: "100%",
          opacity: 0.5,
          background:
            " linear-gradient(109.62deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 99.77%)",
        },
      }}
    >
      <SelectSearchDropDown
        options={categories}
        label="What are you looking for?"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* City Dropdown */}
      <SelectSearchDropDown
        options={cities}
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <ThemeButton
        onClickEvent={handleSearch}
        icon={null}
        //   icon={<SearchIcon />}
      />
    </Box>
  );
};

export default SearchComponent;
