"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box, Button, Stack, Typography } from "@mui/material";
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
  const [showDirections, setShowDirections] = useState(false);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const mapRef = useRef<google.maps.Map | null>(null);
  console.log(mapRef);

  const coordinates = location?.geotag
    ? { lat: location.geotag.lat, lng: location.geotag.lng }
    : null;

  const handleLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleGetDirections = async () => {
    if (!coordinates) return;

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const origin = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin,
        destination: coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      });

      if (result.routes.length > 0) {
        setDirectionsResponse(result);
        setRoutes(result.routes);
        setRouteIndex(0);
        setShowDirections(true);
      } else {
        throw new Error("No route found");
      }
    } catch (err) {
      console.warn("Directions error:", err);
    }
  };
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  if (!coordinates) return <Typography>Loading Map...</Typography>;

  const selectedRoute = routes[routeIndex];
  const legs = selectedRoute?.legs?.[0];

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
        {showDirections && directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            routeIndex={routeIndex}
            options={{ suppressMarkers: false }}
          />
        )}
      </GoogleMap>

      {legs && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "grey.200", borderRadius: 2 }}>
          <Typography variant="h6">{selectedRoute.summary}</Typography>
          <Typography>
            {legs.start_address.split(",")[0]} →{" "}
            {legs.end_address.split(",")[0]}
          </Typography>
          <Typography>Distance: {legs.distance?.text}</Typography>
          <Typography>Duration: {legs.duration?.text}</Typography>

          {routes.length > 1 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Other Routes:
              </Typography>
              <Stack spacing={1}>
                {routes.map((route, idx) => (
                  <Button
                    key={route.summary + idx}
                    variant={idx === routeIndex ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setRouteIndex(idx)}
                  >
                    {route.summary}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EstablishmentMapLocation;
