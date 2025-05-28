import { Business, Price } from "@/types/business";
import TimingsPopup from "./TimingsPopup";
import SocialIcons from "@/components/global/SocialIcons";
import { Box } from "@mui/material";
import EstablishmentMapLocation from "@/components/modals/EstablishmentMapLocation";
import { CircleDollarSign, Globe, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

interface EstablishmentLocationProps {
  readonly business: Business;
}

export default function EstablishmentLocation({
  business,
}: Readonly<EstablishmentLocationProps>) {
  const { location, phone, website, timings, price, socials, tags, status } =
    business;

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
          address={location?.address}
          tags={tags}
          status={status}
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
  tags,
  status,
  address,
}: {
  phone?: string;
  website?: string;
  price?: Price;
  city?: string;
  state?: string;
  country?: string;
  tags?: string[];
  status?: string;
  address?: string;
}) => {
  return (
    <Box className="p-4 flex flex-col gap-4 " sx={{ margin: 0 }}>
      {/* Tags and Open Status */}
      <div className="flex justify-between items-center ">
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#200c27] capitalize text-white text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center">
          <FaClock className="h-4 w-4 text-primary mr-1" />
          <span className="text-primary text-xs">{status}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <MapPinned color="white" size={25} />
        {address ? (
          <span>
            {address.length > 50 ? `${address.substring(0, 50)}...` : address}
          </span>
        ) : (
          <span>{`${city}${state ? `, ${state}` : ""}, ${country}`} </span>
        )}
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
