"use client";

import { useState } from "react";
import { Business } from "@/types/business";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

interface Props {
  businesses: Business[];
  isLoading: boolean;
}

const MapSection = ({ businesses, isLoading }: Props) => {
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

  // Set default map center to first business location if available
  const defaultCenter = businessLocations[0]
    ? businessLocations[0].position
    : { lat: 37.7749, lng: -122.4194 }; // Default fallback if no business

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <section className="container mx-auto my-4">
        <div className="bg-white rounded-lg overflow-hidden h-[50vh]">
          {/* Replace GoogleMap from @react-google-maps/api with @vis.gl/react-google-maps */}
          <Map
            center={defaultCenter}
            zoom={12}
            onClick={() => setActiveMarker(null)} // Close info window on map click
          >
            {businessLocations.map((loc) => (
              <>
                <Marker
                  key={loc.id}
                  position={loc.position}
                  onClick={() => setActiveMarker(loc.id)}
                />
                {activeMarker === loc.id && (
                  <InfoWindow
                    position={loc.position}
                    onCloseClick={() => setActiveMarker(null)}
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
              </>
            ))}
          </Map>
        </div>
      </section>
    </APIProvider>
  );
};

export default MapSection;
