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
  PartyPopper,
  PawPrint,
  CalendarCheck2,
  UsersRound,
  Gamepad2,
  Dice6,
  Flame,
} from "lucide-react";
import { FC, ReactElement } from "react";
import { Amenities } from "@/types/business";

interface Props {
  amenities: Amenities;
}

const amenitiesMap: {
  key: keyof Omit<Amenities, "other">;
  label: string;
  icon: ReactElement;
}[] = [
  {
    key: "wheelchairAccessible",
    label: "Wheelchair accessible",
    icon: <Accessibility size={16} />,
  },
  { key: "outdoorSeating", label: "Outdoor seating", icon: <Sun size={16} /> },
  { key: "heatedPatio", label: "Heated patio", icon: <Flame size={16} /> },
  {
    key: "outdoorSmoking",
    label: "Outdoor smoking",
    icon: <Cigarette size={16} />,
  },
  {
    key: "acceptsCreditCards",
    label: "Credit cards accepted",
    icon: <CreditCard size={16} />,
  },
  { key: "petFriendly", label: "Pet Friendly", icon: <PawPrint size={16} /> },
  { key: "freeWiFi", label: "Free Wi-Fi", icon: <Wifi size={16} /> },
  { key: "tvOnSite", label: "TV on-site", icon: <Tv2 size={16} /> },
  {
    key: "happyHourSpecials",
    label: "Happy hour specials",
    icon: <PartyPopper size={16} />,
  },
  {
    key: "reservationsAccepted",
    label: "Reservations accepted",
    icon: <CalendarCheck2 size={16} />,
  },
  {
    key: "privateEventSpace",
    label: "Private event space",
    icon: <UsersRound size={16} />,
  },
  {
    key: "bikeParking",
    label: "Bike parking provided",
    icon: <Bike size={16} />,
  },
  {
    key: "validatedParking",
    label: "Validated parking available",
    icon: <ParkingCircle size={16} />,
  },
  {
    key: "billiards",
    label: "Billiards/Pool Tables",
    icon: <Gamepad2 size={16} />,
  },
  { key: "cornhole", label: "Cornhole", icon: <Dice6 size={16} /> },
];

const AmenityItem: FC<{
  label: string;
  icon: ReactElement;
  available: boolean;
}> = ({ label, icon, available }) => (
  <div className="flex items-center gap-2 text-sm text-white">
    {icon}
    <span className={available ? "text-white" : "text-gray-400 line-through"}>
      {label}
    </span>
    {available ? (
      <Check size={16} className="text-white ml-auto" />
    ) : (
      <X size={16} className="text-red-500 ml-auto" />
    )}
  </div>
);

const AmenitiesSection: FC<Props> = ({ amenities }) => {
  return (
    <div
      className="p-4 border rounded-md w-full max-w-xl"
      style={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-white">
        Amenities and More
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenitiesMap.map(({ key, label, icon }) => (
          <AmenityItem
            key={key}
            label={label}
            icon={icon}
            available={!!amenities?.[key]}
          />
        ))}
      </div>

      {Array.isArray(amenities.other) && amenities.other.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-sm text-white mb-2">
            Other Amenities
          </h3>
          <ul className="list-disc ml-5 text-sm text-white">
            {amenities.other.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
