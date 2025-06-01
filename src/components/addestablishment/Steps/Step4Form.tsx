import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch, Grid2, Typography } from "@mui/material";

const amenitiesList = [
  {
    name: "wheelchairAccessible",
    label: "Is your venue wheelchair accessible?",
  },
  { name: "validatedParking", label: "Do you offer validated parking?" },
  { name: "smokingOutsideOnly", label: "Is smoking allowed outside only?" },
  { name: "outdoorSeating", label: "Do you have outdoor seating?" },
  { name: "heatedOutdoorSeating", label: "Is the outdoor seating heated?" },
  { name: "bikeParking", label: "Do you provide bike parking?" },
  { name: "acceptsCreditCards", label: "Do you accept credit cards?" },
  { name: "freeWiFi", label: "Is free Wi-Fi available?" },
  { name: "tv", label: "Is there a TV available?" },
  { name: "happyHourSpecials", label: "Do you offer happy hour specials?" },
  { name: "coveredOutdoorSeating", label: "Is the outdoor seating covered?" },
];

const Step4Form = () => {
  const { control } = useFormContext();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Amenities
      </Typography>
      <Grid2 container spacing={2}>
        {amenitiesList.map((amenity) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={amenity.name}>
            <Controller
              name={`amenities.${amenity.name}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={amenity.label}
                />
              )}
            />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Step4Form;
