import { Business, Price } from "@/types/business";
import Image from "next/image";
import TimingsPopup from "./TimingsPopup";
import SocialIcons from "@/components/global/SocialIcons";
import { Box } from "@mui/material";
import EstablishmentMapLocation from "@/components/modals/EstablishmentMapLocation";

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
          "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
      }}
    >
      {/* Map */}
      <EstablishmentMapLocation location={location || {}} />

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
            // Apply blur effect
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
            // Apply blur effect
          />
          <span>{`${city}${state ? `, ${state}` : ""}, ${country}`} </span>
        </div>
      </Box>
      <div className="flex mt-4 items-center space-x-2">
        <Image
          src="/images/icons/phone.svg"
          alt="Phone"
          width={30}
          height={30}
          // Apply blur effect
        />
        <span>{phone}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/icons/website.svg"
          alt="Phone"
          width={30}
          height={30}
          // Apply blur effect
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
          // Apply blur effect
        />
        <span>
          {price?.category} {price?.min} - {price?.max}
        </span>
      </div>
    </>
  );
};
