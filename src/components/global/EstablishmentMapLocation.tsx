"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { Location } from "@/types/business";

interface EstablishmentMapLocationProps {
  location: Location | null;
}

const EstablishmentMapLocation = ({
  location,
}: EstablishmentMapLocationProps) => {
  const [showDirections, setShowDirections] = useState(false);
  const [travelMode, setTravelMode] = useState<
    "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING"
  >("DRIVING");
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const coordinates: google.maps.LatLngLiteral = location?.geotag
    ? { lat: location.geotag.lat, lng: location.geotag.lng }
    : { lat: 0, lng: 0 }; // Default coordinates if geotag is not provided

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "", // Replace with your API key
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleShowDirections = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: { lat: latitude, lng: longitude },
            destination: coordinates,
            travelMode: google.maps.TravelMode[travelMode],
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirectionsResponse(result);
            } else {
              console.error("Error fetching directions:", status);
            }
          }
        );
      },
      (error) => console.error("Error getting location:", error)
    );
  };

  const handleOpenGoogleMaps = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${coordinates.lat},${coordinates.lng}`;
        window.open(directionsUrl, "_blank");
      },
      (error) => console.error("Error getting location: ", error)
    );
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box>
      {location?.geotag && (
        <>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setTravelMode("DRIVING");
                handleShowDirections();
              }}
            >
              Get Driving Directions
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setTravelMode("WALKING");
                handleShowDirections();
              }}
            >
              Get Walking Directions
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenGoogleMaps}
            >
              Open in Google Maps
            </Button>
          </Stack>

          <GoogleMap
            center={coordinates}
            zoom={13}
            mapContainerStyle={{ height: "70vh", borderRadius: "8px" }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <Marker
              position={coordinates}
              onClick={() => setInfoWindowOpen(true)}
            />
            {infoWindowOpen && (
              <InfoWindow
                position={coordinates}
                onCloseClick={() => setInfoWindowOpen(false)}
              >
                <div>
                  <h3>{"Location Name"}</h3>
                  <p>{"Location Address"}</p>
                </div>
              </InfoWindow>
            )}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </>
      )}
    </Box>
  );
};

export default EstablishmentMapLocation;
