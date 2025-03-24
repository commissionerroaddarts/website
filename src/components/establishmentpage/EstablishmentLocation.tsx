import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Phone,
  Public,
  AccessTime,
  AttachMoney,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { Business } from "../../types/business";
import L from "leaflet";
const markerIcon = require("leaflet/dist/images/marker-icon.png");
const markerShadow = require("leaflet/dist/images/marker-shadow.png");

// Fix default marker icon path
const defaultIcon = L.icon({
  iconUrl: "/images/icons/marker-icon.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

console.log(defaultIcon);
interface EstablishmentLocationProps {
  business: Business;
}

export default function EstablishmentLocation({
  business,
}: EstablishmentLocationProps) {
  const { location, phone, website, timings, price, socials } = business;

  const coordinates: [number, number] = location?.geotag
    ? [location.geotag.lat, location.geotag.lng]
    : [0, 0]; // Default coordinates if geotag is not provided

  return (
    <div className="p-4 bg-purple-900 rounded-lg space-y-4">
      {/* Map */}
      {location?.geotag && (
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "200px", borderRadius: "8px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coordinates} icon={defaultIcon}>
            <Popup>{`${location.city}, ${location.state}, ${location.country}`}</Popup>
          </Marker>
        </MapContainer>
      )}

      {/* Details */}
      <div className="text-white space-y-2">
        <p>{`${location?.city}, ${location?.state}, ${location?.country}`}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`}
          className="text-purple-300"
        >
          Get Directions
        </a>
        <div className="flex items-center space-x-2">
          <Phone fontSize="small" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Public fontSize="small" />
          <a href={website} className="text-purple-300">
            {website}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <AccessTime fontSize="small" />
          <span>Today</span>
          <button className="text-sm text-purple-300">See All</button>
        </div>
        <div className="flex items-center space-x-2">
          <AttachMoney fontSize="small" />
          <span>
            {price?.category} {price?.min} - {price?.max}
          </span>
        </div>
        {/* Social Icons */}
        <div className="flex space-x-3 mt-2">
          {socials?.facebook && (
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="text-white cursor-pointer" />
            </a>
          )}
          {socials?.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="text-white cursor-pointer" />
            </a>
          )}
          {socials?.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="text-white cursor-pointer" />
            </a>
          )}
        </div>
        {/* Claim Now */}
        <div className="mt-4">
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg">
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
}
