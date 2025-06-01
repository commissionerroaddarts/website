"use client";

import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";
import { Location } from "@/types/business";

interface EstablishmentMapLocationProps {
  location: Location | null;
}

const containerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "8px 8px 0 0",
};

const EstablishmentMapLocation = ({
  location,
}: EstablishmentMapLocationProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const coordinates = location?.geotag
    ? { lat: location.geotag.lat, lng: location.geotag.lng }
    : null;

  const handleLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded)
    return (
      <div className="w-full flex justify-center items-center h-20">
        <svg
          className="animate-spin h-10 w-10 text-purple-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-5 0h-4a2.5 2.5 0 0 1-4.5-1z"
          />
        </svg>
      </div>
    );

  if (!coordinates)
    return (
      <div className="w-full flex justify-center items-center h-20">
        <svg
          className="animate-spin h-10 w-10 text-purple-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-5 0h-4a2.5 2.5 0 0 1-4.5-1z"
          />
        </svg>
      </div>
    );

  return (
    <Box>
      {/* <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetDirections}
          >
            Get Directions
          </Button>
        </Stack> */}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={14}
        onLoad={handleLoad}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </Box>
  );
};

export default EstablishmentMapLocation;
