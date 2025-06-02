"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import { Box } from "@mui/material";
import Image from "next/image";
import { googleMapStyles } from "@/utils/googleMapStyles";
import LoadingIndicator from "@/components/global/LoadingIndicator"

interface Props {
  businesses: Business[] | Event[];
  isLoading: boolean;
}

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const defaultCenter = {
  lat: 37.7749, // San Francisco fallback
  lng: -122.4194,
};

const MapSection = ({ businesses, isLoading }: Props) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapZoom, setMapZoom] = useState(10);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  useEffect(() => {
    if (isLoaded && !isLoading) {
      const timeout = setTimeout(() => setShowMap(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isLoading]);

  const businessLocations = businesses
    .filter((b) => b.location?.geotag)
    .map((b) => ({
      id: String(b._id),
      name: b.name,
      city: b.location?.city,
      state: b.location?.state,
      description: b.shortDis,
      position: {
        lat: Number(b.location!.geotag!.lat),
        lng: Number(b.location!.geotag!.lng),
      },
      logo: b.media?.logo,
    }))
    .filter(
      (loc, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.position.lat === loc.position.lat &&
            t.position.lng === loc.position.lng
        )
    );

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    if (businessLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      businessLocations.forEach((loc) => bounds.extend(loc.position));
      map.fitBounds(bounds);

      google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        if ((map.getZoom() ?? 0) > 15) {
          map.setZoom(15);
        }
      });
    }
  };

  const zoomIn = () => {
    const currentZoom = mapRef.current?.getZoom() ?? 10;
    mapRef.current?.setZoom(currentZoom + 1);
  };

  const zoomOut = () => {
    const currentZoom = mapRef.current?.getZoom() ?? 10;
    mapRef.current?.setZoom(currentZoom - 1);
  };

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded || !showMap || isLoading) return <LoadingIndicator />;

  return (
    <section className="container mx-auto my-4 relative">
      <div className="bg-white rounded-lg overflow-hidden relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={handleLoad}
          center={
            businessLocations.length > 0
              ? businessLocations[0].position
              : defaultCenter
          }
          zoom={mapZoom}
          options={{
            disableDefaultUI: true,
            styles: googleMapStyles,
            zoomControl: true,
          }}
          onClick={() => setActiveMarker(null)}
        >
          {businessLocations.length > 0 && (
            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {businessLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={loc.position}
                      clusterer={clusterer}
                      onClick={() => setActiveMarker(loc.id)}
                    >
                      {activeMarker === loc.id && (
                        <InfoWindow
                          position={loc.position}
                          onCloseClick={() => setActiveMarker(null)}
                        >
                          <div
                            className="p-3 rounded-lg shadow-lg text-white"
                            style={{
                              background:
                                "linear-gradient(135deg, #5D1178 0%, #3F0F50 100%)",
                              minWidth: "200px",
                              maxWidth: "250px",
                              fontFamily: "Lexend, sans-serif",
                              whiteSpace: "normal",
                            }}
                          >
                            <Box className="flex items-center mb-2">
                              {loc.logo && (
                                <Image
                                  src={loc.logo}
                                  alt={loc.name}
                                  width={50}
                                  height={50}
                                  className="rounded-full mr-2"
                                />
                              )}
                              <div className="flex flex-col">
                                <h3 className="font-bold text-[16px] mb-0">
                                  {loc.name}
                                </h3>
                                <p className="text-xs">
                                  {loc.city}, {loc.state}
                                </p>
                              </div>
                            </Box>
                            <p className="text-xs text-gray-300">
                              {loc.description}
                            </p>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </>
              )}
            </MarkerClusterer>
          )}
        </GoogleMap>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1]">
          <button
            onClick={zoomIn}
            className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded"
          >
            -
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
