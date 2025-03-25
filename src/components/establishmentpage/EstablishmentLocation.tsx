import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Business, Price } from "../../types/business";
import L, { marker } from "leaflet";
import Image from "next/image";
import TimingsPopup from "./TimingsPopup";
import SocialIcons from "../global/SocialIcons";
import { Box } from "@mui/material";
// Fix default marker icon path
const defaultIcon = L.icon({
  iconUrl: "/images/icons/marker-icon.png",
  shadowUrl: "/images/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface EstablishmentLocationProps {
  readonly business: Business;
}

export default function EstablishmentLocation({
  business,
}: Readonly<EstablishmentLocationProps>) {
  const { location, phone, website, timings, price, socials } = business;

  const coordinates: [number, number] = location?.geotag
    ? [location.geotag.lat, location.geotag.lng]
    : [0, 0]; // Default coordinates if geotag is not provided

  return (
    <div
      className="p-4  rounded-lg space-y-4"
      style={{
        background:
          "linear-gradient(109.46deg, rgba(201, 201, 201, 0.8) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
      }}
    >
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
      <div className="text-white space-y-4 font-light">
        {/* Basic Details */}
        <BasicDetails
          phone={phone}
          website={website}
          price={price || {}}
          city={location?.city}
          state={location?.state}
          country={location?.country}
          coordinates={coordinates}
        />

        {/* Timings */}
        <TimingsPopup timings={timings || {}} />

        {/* Social Icons */}
        <SocialIcons socials={socials || {}} />

        {/* Claim Now */}
        <div className="flex items-center space-x-2 mt-4">
          <Image
            src="/images/icons/claim.svg"
            alt="Claim"
            width={30}
            height={30}
          />
          <button className=" text-white  rounded-lg">
            Own or work here? <b> Claim Now</b>
          </button>
        </div>
      </div>
    </div>
  );
}

const BasicDetails = ({
  phone,
  website,
  price,
  state,
  city,
  country,
  coordinates,
}: {
  phone?: string;
  website?: string;
  price?: Price;
  city?: string;
  state?: string;
  country?: string;
  coordinates: [number, number];
}) => {
  return (
    <>
      <Box>
        <div className="flex items-center space-x-2">
          <Image
            src="/images/icons/location.svg"
            alt="Phone"
            width={30}
            height={30}
          />
          <span>
            {`${city} ${state !== null ? `, ${state}` : ""}, ${country}`}{" "}
          </span>
        </div>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`}
          className="text-purple-300"
        >
          Get Directions
        </a>
      </Box>
      <div className="flex mt-4 items-center space-x-2">
        <Image
          src="/images/icons/phone.svg"
          alt="Phone"
          width={30}
          height={30}
        />
        <span>{phone}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/icons/website.svg"
          alt="Phone"
          width={30}
          height={30}
        />
        <a href={website} className="text-purple-300">
          {website && website.length > 40
            ? `${website.substring(0, 40)}...`
            : website}
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/icons/pricing.svg"
          alt="Phone"
          width={30}
          height={30}
        />
        <span>
          {price?.category} {price?.min} - {price?.max}
        </span>
      </div>
    </>
  );
};
