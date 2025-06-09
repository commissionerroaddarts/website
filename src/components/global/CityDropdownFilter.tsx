"use client";
import { cities_states } from "@/utils/cities_states";
import { createScrollHandler } from "@/utils/dropdowns";
import { useMemo, useState } from "react";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";

export const CityDropdownFilter = ({
  handleChange,
  value,
}: {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const [visibleCities, setVisibleCities] = useState(10);
  const handleScrollCities = createScrollHandler(
    setVisibleCities,
    cities_states.length
  );
  const handleCityInputChange = (
    event: React.SyntheticEvent,
    value: string,
    reason: any
  ) => {
    setCitySearchInput(value);
    if (value.trim()) {
      setVisibleCities(cities_states.length); // Load all cities while searching
    } else {
      setVisibleCities(10); // Reset to default when cleared
    }
  };

  const cityOptions = useMemo(() => {
    const filtered = cities_states
      .filter((cs) =>
        cs.city.toLowerCase().includes(citySearchInput.toLowerCase())
      )
      .map((cs) => ({
        label: cs.city + ", " + cs.state,
        value: cs.city,
      }));

    return citySearchInput ? filtered : filtered.slice(0, visibleCities);
  }, [visibleCities, citySearchInput]);

  return (
    <SelectSearchDropDown
      options={cityOptions}
      label="City"
      value={value ?? ""}
      onInputChange={handleCityInputChange}
      onScroll={handleScrollCities}
      name="city"
      onChange={handleChange}
    />
  );
};
