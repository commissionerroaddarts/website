"use client";
import Image from "next/image";
import Card from "@mui/material/Card";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import ThemeButton from "../buttons/ThemeButton";
import Link from "next/link";
import { useState } from "react";
import BusinessMapPopup from "@/components/homepage/businesses/BusinessMapPopup";
import { Event } from "@/types/event";
import { useAppState } from "@/hooks/useAppState";
import { useRouter } from "next/navigation";

interface RestaurantCardProps {
  readonly event: Event;
}

export default function EventCard({ event }: RestaurantCardProps) {
  const {
    _id,
    media,
    category,
    status,
    name,
    price,
    location,
    timings,
    tags,
    shortDis,
    averageRating,
    // totalReviews,
  } = event;

  const [openMap, setOpenMap] = useState<boolean>(false);

  if (
    !_id ||
    !shortDis ||
    !media ||
    !category ||
    !status ||
    !name ||
    !price ||
    !location ||
    !timings ||
    !tags
  ) {
    console.error("Some properties are missing in the event object.");
    return null;
  }
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

  return (
    <>
      <Card className="!bg-[#2a1e2e] rounded-lg overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="relative h-48">
            <Image
              src={media?.images?.[0] ?? "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 flex-grow">
            {/* Tags and Open Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#3a2a3e] capitalize text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <FaClock className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary text-xs">{status}</span>
              </div>
            </div>

            {/* Restaurant Name */}
            <div className="flex items-center mb-1">
              <FaCheckCircle className="h-4 w-4 text-green-bright mr-2" />
              <h3 className="text-white font-medium text-2xl">{name}</h3>
            </div>

            <RatingStars id={_id} averageRating={averageRating ?? 0} />

            {/* Location */}
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="h-4 w-4 text-gray mr-2" />
              <span className="text-gray text-sm">
                {location?.state} {location?.city} , {location?.zipcode}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray text-xs mb-4">
              {shortDis}
              <span className="text-primary ml-1 cursor-pointer">more</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 mt-auto">
          <div className="grid grid-cols-1 gap-2">
            <Link
              href={{
                pathname: `/establishments/${_id}`,
              }}
              passHref
            >
              <ThemeButton text="View More" className="w-full" />
            </Link>
            <ThemeButton text="Show Map" onClickEvent={handleMapOpen} />
          </div>
        </div>
      </Card>
      <BusinessMapPopup
        handleMapClose={handleMapClose}
        openMap={openMap}
        location={location ?? {}}
      />
    </>
  );
}

const RatingStars = ({
  id,
  averageRating,
}: {
  id: string | number;
  averageRating: number;
}) => {
  const { user } = useAppState();
  const { isLoggedIn } = user || {};
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const router = useRouter();
  const handleMouseEnter = (star: number) => setHoveredStar(star);
  const handleMouseLeave = () => setHoveredStar(null);

  const handleStarClick = (star: number) => {
    if (!isLoggedIn) {
      router.push(`/login?event=${id}`);
    } else {
      router.push(`/rate/${id}?rating=${star}`);
    }
  };

  return (
    <>
      {/* Rating */}
      <div className="flex items-center mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              className={`h-4 w-4 cursor-pointer ${
                (hoveredStar && star <= hoveredStar) || star <= averageRating
                  ? "text-yellow-500"
                  : "text-gray"
              }`}
              fill={
                (hoveredStar && star <= hoveredStar) || star <= averageRating
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
        </div>
        {averageRating > 0 ? (
          <span className="text-gray text-xs ml-2">
            {averageRating?.toFixed(1)}
          </span>
        ) : (
          <span className="text-gray text-xs ml-2">
            Be the first to review!
          </span>
        )}
      </div>
    </>
  );
};
