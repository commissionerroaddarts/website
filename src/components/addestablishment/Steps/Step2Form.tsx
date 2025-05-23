"use client";

import { useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Box, Typography, CircularProgress } from "@mui/material";
import CustomInput from "@/components/global/CustomInput";
import { Search } from "lucide-react";

export default function Step2Form() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { geotag } = watch("location") ?? {};
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [center, setCenter] = useState(
    geotag ?? { lat: 33.00122, lng: -117.06517 }
  ); // 14026 Stoney Gate PL, San Diego, CA
  const [markerPosition, setMarkerPosition] = useState(center);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setCenter({ lat, lng });
        setMarkerPosition({ lat, lng });

        setValue("location.geotag.lat", lat);
        setValue("location.geotag.lng", lng);

        const addressComponents: any = {};
        place.address_components?.forEach((component: any) => {
          const types = component.types;
          if (types.includes("country"))
            addressComponents.country = component.long_name;
          if (types.includes("administrative_area_level_1"))
            addressComponents.state = component.long_name;
          if (types.includes("locality"))
            addressComponents.city = component.long_name;
          if (types.includes("postal_code"))
            addressComponents.zipcode = component.long_name;
        });

        if (addressComponents.country)
          setValue("location.country", addressComponents.country);
        if (addressComponents.state)
          setValue("location.state", addressComponents.state);
        if (addressComponents.city)
          setValue("location.city", addressComponents.city);
        if (addressComponents.zipcode)
          setValue("location.zipcode", addressComponents.zipcode ?? "90210");
      }
    }
  };

  if (!isLoaded) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Location Details
      </Typography>

      <Box className="mb-4 flex flex-col gap-2 items-center">
        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={onPlaceChanged}
          className="w-full"
        >
          <CustomInput
            label="Search for a location"
            icon={<Search color="white" size={30} />}
            iconPosition="end"
            className="w-[100%]"
          />
        </Autocomplete>
        {typeof errors?.location === "object" &&
          Object.values(errors.location).some(
            (err: any) => typeof err?.message === "string"
          ) && (
            <Typography color="error" variant="body2">
              Please correct the location details.
            </Typography>
          )}
      </Box>

      <Box
        mb={6}
        sx={{
          height: "400px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </Box>

      {/* <Grid2 container spacing={2} mb={8}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="location.country"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                label="Country"
                {...field}
                placeholder="Country"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="location.state"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                label="State"
                {...field}
                placeholder="State"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="location.city"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                label="City"
                {...field}
                placeholder="City"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="location.zipcode"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                label="Zipcode"
                {...field}
                placeholder="Zipcode"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid2>
      </Grid2> */}
    </Box>
  );
}
