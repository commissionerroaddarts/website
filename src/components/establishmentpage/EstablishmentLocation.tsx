import { Business, Price } from "@/types/business";
import TimingsPopup from "./TimingsPopup";
import SocialIcons from "@/components/global/SocialIcons";
import { Box } from "@mui/material";
import EstablishmentMapLocation from "@/components/modals/EstablishmentMapLocation";
import { CircleDollarSign, Globe, MapPinned, Phone } from "lucide-react";
import Link from "next/link";

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
      className="  rounded-lg space-y-4"
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
        />

        {/* Timings */}
        <TimingsPopup timings={timings || {}} />

        {/* Social Icons */}
        <SocialIcons socials={socials || {}} />
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
}: {
  phone?: string;
  website?: string;
  price?: Price;
  city?: string;
  state?: string;
  country?: string;
}) => {
  return (
    <Box className="p-4 flex flex-col gap-4 " sx={{ margin: 0 }}>
      <div className="flex items-center gap-2">
        <MapPinned color="white" size={25} />
        <span>{`${city}${state ? `, ${state}` : ""}, ${country}`} </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Phone color="white" size={25} />
        <Link href={`tel:${phone}`} passHref target="_blank">
          {phone}
        </Link>
      </div>
      {website && (
        <div className="flex items-center gap-2 flex-wrap">
          <Globe color="white" size={25} />
          <Link href={website} passHref className="text-purple-300">
            {website.length > 25 ? `${website.substring(0, 25)}...` : website}
          </Link>
        </div>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <CircleDollarSign color="white" size={25} />
        <span>{price?.category}</span>
      </div>
    </Box>
  );
};
