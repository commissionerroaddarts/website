import React from "react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import {
  FormControlLabel,
  Switch,
  IconButton,
  Typography,
  Grid2,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import CustomInput from "@/components/global/CustomInput";

const amenitiesList = [
  {
    name: "wheelchairAccessible",
    label: "Is your venue wheelchair accessible?",
  },
  { name: "outdoorSeating", label: "Do you have outdoor seating?" },
  { name: "heatedPatio", label: "Is the outdoor seating heated?" },
  { name: "outdoorSmoking", label: "Is smoking allowed outside?" },
  { name: "acceptsCreditCards", label: "Do you accept credit cards?" },
  { name: "petFriendly", label: "Is your venue pet friendly?" },
  { name: "freeWiFi", label: "Is free Wi-Fi available?" },
  { name: "tvOnSite", label: "Is there a TV on-site?" },
  { name: "happyHourSpecials", label: "Do you offer happy hour specials?" },
  { name: "reservationsAccepted", label: "Do you accept reservations?" },
  { name: "privateEventSpace", label: "Do you have private event space?" },
  { name: "bikeParking", label: "Do you provide bike parking?" },
  { name: "validatedParking", label: "Is validated parking available?" },
  { name: "billiards", label: "Do you have Billiards/Pool Tables?" },
  { name: "cornhole", label: "Do you offer Cornhole?" },
];

const Step4Form = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenities.other",
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Amenities
      </Typography>

      <Grid2 container spacing={2} className="mb-4 ">
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

      {/* Other Amenities Input */}
      <Typography variant="h6" className="ml-2">
        Other Amenities
      </Typography>

      {fields.map((field, index) => (
        <Grid2
          container
          spacing={1}
          alignItems="center"
          key={field.id}
          sx={{ mt: 1 }}
        >
          <Grid2 size={{ xs: 6 }}>
            <Controller
              name={`amenities.other.${index}`}
              control={control}
              defaultValue={field?.id ?? ""}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  label={`Custom amenity #${index + 1}`}
                  fullWidth
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <IconButton
              onClick={() => remove(index)}
              sx={{
                background: "#ec6dff",
                borderRadius: "50%",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "background 0.3s, transform 0.3s",
                padding: "0.5rem",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <Delete className="h-5 w-5 text-white" />
            </IconButton>
          </Grid2>
        </Grid2>
      ))}

      <Grid2 sx={{ mt: 2 }}>
        <IconButton
          onClick={() => append("")}
          sx={{
            background: "#ec6dff",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background 0.3s, transform 0.3s",
            padding: "0.5rem",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <Add className="h-5 w-5 text-white" />
        </IconButton>
        <Typography component="span" sx={{ ml: 1 }}>
          Add another custom amenity
        </Typography>
      </Grid2>
    </div>
  );
};

export default Step4Form;
