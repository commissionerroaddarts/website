"use client";

import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import ThemeButton from "@/components/buttons/ThemeButton";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import { cities_states } from "@/utils/cities_states";
import { useRouter } from "next/navigation";
import CustomInput from "../global/CustomInput";
import { Search } from "lucide-react";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { boardTypeOptions } from "@/utils/dropdowns";
import { CityDropdownFilter } from "../global/CityDropdownFilter";

const schema = yup
  .object({
    search: yup.string().optional(),
    bordtype: yup.string().optional(),
    city: yup.string().optional(),
  })
  .test("at-least-one", "At least one field must be filled", (obj) => {
    const hasOne = obj.search === "" || obj.city === "" || obj.bordtype === "";

    return hasOne;
  });

type FormValues = {
  search?: string;
  city?: string;
  bordtype?: string;
};

const SearchComponent: React.FC = () => {
  const [visibleCities, setVisibleCities] = useState(10);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      bordtype: "",
      city: "",
    },
  });

  const filters = watch();

  const handleSearch = (data: FormValues) => {
    const { search, city, bordtype } = data;

    let query = "/establishments?";
    if (search) query += `search=${search}&`;
    if (city) query += `city=${city}`;
    if (bordtype) query += `boardtype=${bordtype}`;
    router.push(query);
  };

  const handleRemoveSearchFilter = () => {
    setValue("search", "");
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState(null, "", url.toString());
  };

  const handleSearchInputIcons = () => {
    return filters?.search !== "" ? (
      <button className="cursor-pointer" onClick={handleRemoveSearchFilter}>
        <Close />
      </button>
    ) : (
      <Search color="white" />
    );
  };

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
      className="relative z-20 flex flex-col gap-4 p-4 max-w-[90%] lg:max-w-[75%] mx-auto flex-wrap"
      sx={{
        margin: "3rem auto -3rem",
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
      <form onSubmit={handleSubmit(handleSearch)}>
        <Box
          className="grid gap-3"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            alignItems: "center",
          }}
        >
          {/* Search input */}
          <Controller
            name="search"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                className="w-full"
                icon={handleSearchInputIcons()}
                iconPosition="end"
                label="Search"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Search by Dartboard Type, Zip Code, Venue Type etc."
                onChange={(e) => setValue("search", e.target.value)}
                value={field.value ?? ""}
              />
            )}
          />

          {/* Board Type Dropdown */}
          <Controller
            name="bordtype"
            control={control}
            render={({ field, fieldState }) => (
              <SelectSearchDropDown
                options={boardTypeOptions}
                label="Board Type"
                value={field.value ?? ""}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => setValue("bordtype", e.target.value)}
              />
            )}
          />

          {/* City Dropdown */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CityDropdownFilter
                handleChange={(e) => setValue("city", e.target.value)}
                value={field.value ?? ""}
              />
            )}
          />

          <ThemeButton type="submit" text="Search" />
        </Box>
        {Object.keys(errors).length > 0 && (
          <h6 className="!text-red-500 text-xs text-center mt-2">
            Please provide at least one search parameter!
          </h6>
        )}
      </form>
    </Box>
  );
};

export default SearchComponent;
