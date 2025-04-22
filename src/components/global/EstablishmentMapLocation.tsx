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

interface Props {
  location: Location | null;
}
interface DirectionsProps {
  destination: google.maps.LatLngLiteral;
  travelMode: google.maps.TravelMode;
}

const EstablishmentMapLocation = ({ location }: Props) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [directionsOn, setDirectionsOn] = useState<boolean>(false);

  const coordinates = location?.geotag
    ? { lat: location.geotag.lat, lng: location.geotag.lng }
    : null;

  const getDirections = async () => {
    if (!coordinates) return;
    setDirectionsOn(true);
  };

  if (!coordinates) return <Typography>Loading Map...</Typography>;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <Box>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getDirections()}
          >
            Get Directions
          </Button>
        </Stack>
        <Map
          center={coordinates}
          zoom={14}
          style={{ height: "70vh", borderRadius: "8px" }}
          zoomControl={true} // ✅ Show zoom in/out buttons
          zoomControlOptions={{
            position: google.maps.ControlPosition.RIGHT_BOTTOM, // You can change position
          }}
          gestureHandling="greedy" // ✅ Allow map to be movable
          mapTypeControl={false} // Optional: hide map type buttons
          streetViewControl={false} // Optional: hide Street View button
          fullscreenControl={false} // Optional: hide fullscreen button
          keyboardShortcuts={true}
          scrollwheel={true}
        >
          <Marker
            position={coordinates}
            onClick={() => setInfoWindowOpen((prev) => !prev)}
          />
          {directionsOn && (
            <Directions
              destination={coordinates}
              travelMode={google.maps.TravelMode.DRIVING}
            />
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
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const selected = routes[routeIndex];
  const legs = selected?.legs[0] || [];

  useEffect(() => {
    if (!map || !routesLibrary) return;
    const service = new routesLibrary.DirectionsService();
    setDirectionsService(service);
    const renderer = new routesLibrary.DirectionsRenderer();
    renderer.setMap(map);
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
          travelMode,
          provideRouteAlternatives: true,
        });

        if (response.routes.length > 0) {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
          // Remove any fallback polyline
          polyline?.setMap(null);
        } else {
          throw new Error("No route found");
        }
      } catch (error) {
        console.warn("Falling back to polyline:", error);

        // Remove previous directions from renderer if any
        // directionsRenderer.setDirections({ routes: [] });

        // Get current location again
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // Fallback polyline path
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

  if (!legs || !selected) return null;

  return (
    <div className="bg-slate-500 p-3">
      <h2>{selected.summary}</h2>
      <p>
        {legs.start_address.split(",")[0]} to {legs.end_address.split(",")[0]}
      </p>
      <p>Distance: {legs.distance?.text}</p>
      <p>Duration: {legs.duration?.text}</p>
      <h3>Other Routes:</h3>
      <ul>
        {routes.map((route, index) => (
          <li
            key={route.summary}
            className={`cursor-pointer ${
              index === routeIndex ? "font-bold" : ""
            }`}
          >
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstablishmentMapLocation;
