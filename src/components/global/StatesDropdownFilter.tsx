"use client";
import { cities_states } from "@/utils/cities_states";
import { createScrollHandler } from "@/utils/dropdowns";
import { useMemo, useState } from "react";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";

export const StatesDropdownFilter = ({
  handleChange,
  value,
}: {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  const [visibleStates, setVisibleStates] = useState(10);
  const [stateSearchInput, setStateSearchInput] = useState("");

  const handleScrollStates = createScrollHandler(
    setVisibleStates,
    cities_states.length
  );
  const handleStateInputChange = (
    event: React.SyntheticEvent,
    value: string,
    reason: any
  ) => {
    setStateSearchInput(value);
    if (value.trim()) {
      setVisibleStates(cities_states.length); // Load all cities while searching
    } else {
      setVisibleStates(10); // Reset to default when cleared
    }
  };
  const stateOptions = useMemo(() => {
    // 1. Extract all state names and remove duplicates
    const uniqueStates = Array.from(
      new Set(
        cities_states
          .map((cs) => cs.state.trim())
          .filter((state) =>
            state.toLowerCase().includes(stateSearchInput.toLowerCase())
          )
      )
    );

    // 2. Sort alphabetically
    const sortedStates = uniqueStates.sort((a, b) => a.localeCompare(b));

    // 3. Map to dropdown format
    const options = sortedStates.map((state) => ({
      label: state,
      value: state,
    }));

    return stateSearchInput ? options : options.slice(0, visibleStates);
  }, [visibleStates, stateSearchInput]);

  return (
    <SelectSearchDropDown
      label="State"
      name="state"
      value={value ?? ""}
      onScroll={handleScrollStates}
      options={stateOptions}
      onChange={handleChange}
      onInputChange={handleStateInputChange}
    />
  );
};
