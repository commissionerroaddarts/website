import { Amenities } from "@/types/business";
import {
  Check,
  X,
  ParkingCircle,
  Wifi,
  CreditCard,
  Accessibility,
  Cigarette,
  Tv2,
  Bike,
  Sun,
  Umbrella,
  PartyPopper,
} from "lucide-react";
import { FC, ReactElement } from "react";

interface Props {
  amenities: Amenities;
}

const amenitiesMap: {
  key: keyof Amenities;
  label: string;
  icon: ReactElement;
}[] = [
  {
    key: "wheelchairAccessible",
    label: "Wheelchair accessible",
    icon: <Accessibility size={16} />,
  },
  {
    key: "validatedParking",
    label: "Validated parking",
    icon: <ParkingCircle size={16} />,
  },
  {
    key: "acceptsCreditCards",
    label: "Accepts credit cards",
    icon: <CreditCard size={16} />,
  },
  { key: "freeWiFi", label: "Free Wi-Fi", icon: <Wifi size={16} /> },
  {
    key: "smokingOutsideOnly",
    label: "Smoking outside only",
    icon: <Cigarette size={16} />,
  },
  { key: "tv", label: "TV available", icon: <Tv2 size={16} /> },
  { key: "bikeParking", label: "Bike parking", icon: <Bike size={16} /> },
  { key: "outdoorSeating", label: "Outdoor seating", icon: <Sun size={16} /> },
  {
    key: "heatedOutdoorSeating",
    label: "Heated seating",
    icon: <PartyPopper size={16} />,
  },
  {
    key: "coveredOutdoorSeating",
    label: "Covered seating",
    icon: <Umbrella size={16} />,
  },
  {
    key: "happyHourSpecials",
    label: "Happy hour specials",
    icon: <PartyPopper size={16} />,
  },
];

const AmenitiesSection: FC<Props> = ({ amenities }) => {
  return (
    <div
      className="p-4 border rounded-md  w-full max-w-xl"
      style={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Amenities and More</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenitiesMap.map(({ key, label, icon }) => {
          const available = amenities[key];
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              {icon}
              <span
                className={
                  available ? "text-gray-800" : "text-gray-400 line-through"
                }
              >
                {label}
              </span>
              {available ? (
                <Check size={16} className="text-white ml-auto" />
              ) : (
                <X size={16} className="text-red-500 ml-auto" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesSection;
