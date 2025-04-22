"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Business } from "@/types/business";

interface Props {
  businesses: Business[];
  isLoading: boolean;
}

const MapSection = ({ businesses, isLoading }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const businessLocations = businesses
    .filter((b) => b.location?.geotag)
    .map((b) => ({
      id: String(b._id),
      name: b.name,
      city: b.location?.city,
      state: b.location?.state,
      description: b.shortDis,
      position: {
        lat: b.location!.geotag!.lat,
        lng: b.location!.geotag!.lng,
      },
    }));

  useEffect(() => {
    if (mapRef.current && businessLocations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      businessLocations.forEach((loc) => bounds.extend(loc.position));
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, businessLocations]);

  if (!isLoaded || isLoading) return <div>Loading map...</div>;

  return (
    <section className="container mx-auto my-4">
      <div className="bg-white rounded-lg overflow-hidden">
        <GoogleMap
          center={{ lat: 37.7749, lng: -122.4194 }}
          zoom={12}
          mapContainerStyle={{ height: "50vh", borderRadius: "8px" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={() => setActiveMarker(null)} // close on map click
        >
          {businessLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              // label={{
              //   text: loc.name,
              //   fontSize: "12px",
              //   fontWeight: "bold",
              // }}
              onClick={() => setActiveMarker(loc.id)}
            >
              {activeMarker === loc.id && (
                <InfoWindow
                  position={loc.position}
                  onCloseClick={() => setActiveMarker(null)}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30),
                  }}
                >
                  <div className="!text-black">
                    <h3 className="font-bold">{loc.name}</h3>
                    <p>
                      {loc.city}, {loc.state}
                    </p>
                    <p className="text-sm text-gray-500">{loc.description}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </section>
  );
};

export default MapSection;
