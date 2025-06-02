"use client";

import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";
import { Location } from "@/types/business";
import { googleMapStyles } from "@/utils/googleMapStyles";
import LoadingIndicator from "@/components/global/LoadingIndicator";

interface EstablishmentMapLocationProps {
  location: Location | null;
}

const containerStyle = {
  width: "100%",
  height: "30vh",
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
  if (!isLoaded) return <LoadingIndicator />;

  if (!coordinates) return <LoadingIndicator />;

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={14}
        onLoad={handleLoad}
        options={{
          disableDefaultUI: true,
          styles: googleMapStyles,
          zoomControl: true,
        }}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </Box>
  );
};

export default EstablishmentMapLocation;
