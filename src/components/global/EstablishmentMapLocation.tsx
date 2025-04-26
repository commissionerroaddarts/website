"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Location } from "@/types/business";

interface EstablishmentMapLocationProps {
  location: Location | null;
}

interface DirectionsProps {
  destination: { lat: number; lng: number };
  travelMode: string;
}

const EstablishmentMapLocation = ({
  location,
}: EstablishmentMapLocationProps) => {
  const [showDirections, setShowDirections] = useState(false);
  const [isMapsReady, setIsMapsReady] = useState(false);

  const coordinates = location?.geotag
    ? { lat: location.geotag.lat, lng: location.geotag.lng }
    : null;

  const handleGetDirections = () => {
    if (coordinates) {
      setShowDirections(true);
    }
  };

  const handleMapLoad = () => {
    setIsMapsReady(true); // Google Maps API is now ready
  };

  if (!coordinates) return <Typography>Loading Map...</Typography>;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <Box>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetDirections}
          >
            Get Directions
          </Button>
        </Stack>

        <Map
          center={coordinates}
          zoom={14}
          style={{ height: "70vh", borderRadius: "8px" }}
          onIdle={handleMapLoad} // <-- ✅ replace onLoad with onIdle
          gestureHandling="greedy"
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          keyboardShortcuts
          scrollwheel
          zoomControl={isMapsReady} // only add options when ready
          zoomControlOptions={{ position: 18 }}
        >
          <Marker position={coordinates} />
          {showDirections && (
            <Directions destination={coordinates} travelMode={"DRIVING"} />
          )}
        </Map>
      </Box>
    </APIProvider>
  );
};

const Directions = ({ destination, travelMode }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  const selectedRoute = routes[routeIndex];
  const legs = selectedRoute?.legs[0];

  useEffect(() => {
    if (!map || !routesLibrary) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer();
    renderer.setMap(map);

    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  }, [map, routesLibrary]);

  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      !destination ||
      !travelMode ||
      !map
    )
      return;

    const fetchDirections = async () => {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const response = await directionsService.route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        });

        if (response.routes.length > 0) {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
          polyline?.setMap(null); // Remove fallback polyline if any
        } else {
          throw new Error("No route found");
        }
      } catch (error) {
        console.warn("Falling back to simple polyline:", error);

        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const line = new google.maps.Polyline({
          path: [origin, destination],
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });

        line.setMap(map);
        setPolyline(line);
        setRoutes([]);
      }
    };

    fetchDirections();
  }, [directionsService, directionsRenderer, destination, travelMode, map]);

  if (!legs) return null;

  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: "grey.200", borderRadius: 2 }}>
      <Typography variant="h6">{selectedRoute.summary}</Typography>
      <Typography>
        {legs.start_address.split(",")[0]} → {legs.end_address.split(",")[0]}
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
                key={route.summary}
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
  );
};

export default EstablishmentMapLocation;
