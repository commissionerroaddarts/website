"use client";
import { Box, Button, Stack } from "@mui/material";
import L from "leaflet";
import "leaflet-routing-machine";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Location } from "../../types/business";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix default marker icon path
const defaultIcon = L.icon({
  iconUrl: "/images/icons/marker-icon.png",
  shadowUrl: "/images/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface EstablishmentMapLocationProps {
  location: Location | null;
}

// Component to handle routing logic inside the map
const RoutingMachine = ({
  destination,
  showDirections,
  travelMode,
}: {
  destination: [number, number];
  showDirections: boolean;
  travelMode: "road" | "air";
}) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const airRouteLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!showDirections) return;

    // Remove existing route
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    // Remove existing air route
    if (airRouteLayerRef.current) {
      map.removeLayer(airRouteLayerRef.current);
      airRouteLayerRef.current = null;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (travelMode === "road") {
          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(latitude, longitude),
              L.latLng(destination[0], destination[1]),
            ],
            routeWhileDragging: true,
            addWaypoints: false,
            showAlternatives: false,
            lineOptions: {
              styles: [{ color: "#007bff", weight: 5 }],
            },
          } as any).addTo(map);
        } else if (travelMode === "air") {
          // Draw a straight line to simulate the air route
          airRouteLayerRef.current = L.polyline(
            [
              [latitude, longitude],
              [destination[0], destination[1]],
            ],
            { color: "red", weight: 3, dashArray: "5, 10" } // Red dashed line for air travel
          ).addTo(map);
        }

        map.flyTo([latitude, longitude], 5);
      },
      (error) => console.error("Error getting location:", error)
    );
  }, [showDirections, travelMode, destination, map]);

  return null;
};

const EstablishmentMapLocation = ({
  location,
}: EstablishmentMapLocationProps) => {
  const [showDirections, setShowDirections] = useState(false);
  const [travelMode, setTravelMode] = useState<"road" | "air">("road");

  const coordinates: [number, number] = location?.geotag
    ? [location.geotag.lat, location.geotag.lng]
    : [0, 0]; // Default coordinates if geotag is not provided

  const handleShowDirections = () => setShowDirections(true);

  const handleOpenGoogleMaps = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${coordinates[0]},${coordinates[1]}`;
        window.open(directionsUrl, "_blank");
      },
      (error) => console.error("Error getting location: ", error)
    );
  };

  return (
    <Box>
      {location?.geotag && (
        <>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setTravelMode("road");
                handleShowDirections();
              }}
            >
              Get Road Directions
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setTravelMode("air");
                handleShowDirections();
              }}
            >
              Get Air Route
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenGoogleMaps}
            >
              Open in Google Maps
            </Button>
          </Stack>

          <MapContainer
            center={coordinates}
            zoom={13}
            style={{ height: "70vh", borderRadius: "8px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coordinates} icon={defaultIcon}>
              <Popup>{`${location.city}, ${location.state}, ${location.country}`}</Popup>
            </Marker>
            <RoutingMachine
              destination={coordinates}
              showDirections={showDirections}
              travelMode={travelMode}
            />
          </MapContainer>
        </>
      )}
    </Box>
  );
};

export default EstablishmentMapLocation;
