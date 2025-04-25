"use client";

import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import ThemeButton from "@/components/buttons/ThemeButton";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import { cities_states } from "@/utils/cities_states";
import { useRouter } from "next/navigation";

const categoryOptions = [
  { label: "Bar & Grill", value: "Bar & Grill" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Gaming Hall", value: "Gaming Hall" },
];

const SearchComponent: React.FC = () => {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/establishments?category=${category}&city=${city}`); // Implement search logic here
  };
  const [visibleCities, setVisibleCities] = useState(10);

  const cityOptions = useMemo(() => {
    return cities_states.slice(0, visibleCities).map((cs) => ({
      label: cs.city + ", " + cs.state,
      value: cs.city,
    }));
  }, [visibleCities]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleCities((prev) => Math.min(prev + 10, cities_states.length));
    }
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
        options={categoryOptions}
        label="What are you looking for?"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* City Dropdown */}
      <SelectSearchDropDown
        options={cityOptions}
        onScroll={handleScroll}
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <ThemeButton
        onClickEvent={handleSearch}
        icon={null}
        text="Search"
        //   icon={<SearchIcon />}
      />
    </Box>
  );
};

export default SearchComponent;
