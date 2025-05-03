"use client";

import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Business } from "@/types/business";
import { Event } from "@/types/event";

interface Props {
  businesses: Business[] | Event[];
  isLoading: boolean;
}

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const MapSection = ({ businesses, isLoading }: Props) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const businessLocations = businesses
    .filter((b) => b.location?.geotag)
    .map((b) => ({
      id: String(b._id), // use _id for uniqueness
      name: b.name,
      city: b.location?.city,
      state: b.location?.state,
      description: b.shortDis,
      position: {
        lat: Number(b.location!.geotag!.lat),
        lng: Number(b.location!.geotag!.lng),
      },
    }));

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (businessLocations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      businessLocations.forEach((loc) => bounds.extend(loc.position));
      map.fitBounds(bounds);

      // Delay setting max zoom after bounds are applied
      google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        if ((map.getZoom() ?? 0) > 15) {
          map.setZoom(15); // Adjust this value as needed
        }
      });
    }
  };

  return (
    <section className="container mx-auto my-4">
      <div className="bg-white rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={handleLoad}
          onClick={() => setActiveMarker(null)}
        >
          {businessLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              onClick={() => setActiveMarker(loc.id)}
            >
              {activeMarker === loc.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
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
