"use client";
import Image from "next/image";
import Card from "@mui/material/Card";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import { useState } from "react";
import BusinessMapPopup from "@/components/homepage/businesses/BusinessMapPopup";
import { Business } from "@/types/business";
import {
  StarRating,
  StarRatingWithPopup,
} from "@/components/global/StarRating";
import { useAppState } from "@/hooks/useAppState";
import { CircleDot, Edit, Heart, PersonStanding, Trash } from "lucide-react";
import { Box, IconButton } from "@mui/material";
import DeleteListingDialog from "../global/DeleteListingDialog";
import { useAppDispatch } from "@/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

interface RestaurantCardProps {
  readonly business: Business;
}

interface WishlistButtonProps {
  onClick: () => void;
  isAlreadyAddedToWishlist: boolean;
}

interface OwnerActionsProps {
  _id: string;
  loading: boolean;
  handleOpenConfirm: (e: any) => void;
  handleWishlist: () => void;
  isAlreadyAddedToWishlist: boolean;
}

function WishlistButton({
  onClick,
  isAlreadyAddedToWishlist,
}: Readonly<WishlistButtonProps>) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: "2.5rem",
        height: "2.5rem",
        background: "#ec6dff",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background 0.3s, transform 0.3s",
        padding: "0.5rem",
        "&:hover": {
          opacity: "0.9!important",
        },
      }}
    >
      <Heart
        color="white"
        fill={isAlreadyAddedToWishlist ? "white" : "none"}
        size={17}
      />
    </IconButton>
  );
}

function OwnerActions({
  _id,
  loading,
  handleOpenConfirm,
  handleWishlist,
  isAlreadyAddedToWishlist,
}: Readonly<OwnerActionsProps>) {
  return (
    <>
      <Link
        href={`/edit-establishment/${_id}`}
        className="bg-purple-700 text-white text-xs px-2 py-1 rounded flex items-center justify-around"
      >
        Edit <Edit className="inline-block ml-1" size={15} />
      </Link>

      <button
        onClick={handleOpenConfirm}
        className="bg-red-500 cursor-pointer text-white text-xs px-2 py-1 rounded  flex items-center justify-around"
      >
        {loading ? "Deleting" : "Delete"}{" "}
        <Trash className="inline-block ml-1" size={15} />
      </button>

      <div className="flex justify-end items-center">
        <WishlistButton
          onClick={handleWishlist}
          isAlreadyAddedToWishlist={isAlreadyAddedToWishlist}
        />
      </div>
    </>
  );
}

function TagsList({ tags }: Readonly<{ tags: string[] }>) {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-[#3a2a3e] capitalize text-white text-xs px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </>
  );
}

export default function BusinessCard({ business }: RestaurantCardProps) {
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
    userId,
    bordtype,
    agelimit,
    // totalReviews,
  } = business;

  const { user, wishlist } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  const { items } = wishlist;
  const isAlreadyAddedToWishlist = items?.includes(_id);
  const isStoreOwner =
    (role === "owner" || role === "admin") && userId === userDetails?._id;
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  if (
    !_id ||
    !shortDis ||
    !category ||
    !status ||
    !name ||
    !price ||
    !location ||
    !timings ||
    !tags
  ) {
    console.error("Some properties are missing in the business object.");
    return null;
  }
  const handleMapOpen = () => setOpenMap(true);
  const handleMapClose = () => setOpenMap(false);

  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleWishlist = () => {
    if (isAlreadyAddedToWishlist) {
      dispatch(removeFromWishlist(_id));
    } else {
      dispatch(addToWishlist(_id));
    }
  };

  return (
    <>
      <DeleteListingDialog
        _id={_id}
        loading={loading}
        setLoading={setLoading}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
      <Card className="!bg-[#2a1e2e] rounded-lg overflow-hidden flex flex-col justify-between h-full md:min-h-[400px]">
        <div>
          <div
            className="relative h-60"
            style={{
              background:
                media?.logo &&
                typeof media?.logo === "string" &&
                media?.logo.toLowerCase().endsWith(".png")
                  ? "white"
                  : "transparent",
            }}
          >
            <Box
              className="absolute top-2 right-2 flex flex-col gap-2"
              zIndex={10}
            >
              {isStoreOwner ? (
                <OwnerActions
                  _id={_id}
                  loading={loading}
                  handleOpenConfirm={handleOpenConfirm}
                  handleWishlist={handleWishlist}
                  isAlreadyAddedToWishlist={isAlreadyAddedToWishlist}
                />
              ) : (
                <div className="flex justify-end items-center">
                  <WishlistButton
                    onClick={handleWishlist}
                    isAlreadyAddedToWishlist={isAlreadyAddedToWishlist}
                  />
                </div>
              )}
            </Box>
            <Image
              src={
                media?.logo ??
                media?.images?.[0] ??
                "/images/banners/business-placeholder.png"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 pb-0 flex-grow">
            {/* Tags and Open Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 flex-wrap">
                <TagsList tags={tags} />
              </div>
              <div className="flex items-center">
                <FaClock className="h-4 w-4 text-primary mr-1" />
                <span className="text-primary text-xs">{status}</span>
              </div>
            </div>

            {/* Restaurant Name */}
            <div className="flex items-center mb-1">
              <h3 className="text-white font-medium text-lg capitalize">
                {name}
              </h3>
            </div>

            {userDetails &&
            (userDetails?.role === "admin" || userDetails?.role === "owner") ? (
              <StarRating rating={averageRating ?? 0} size="size-5" />
            ) : (
              <StarRatingWithPopup
                id={_id}
                averageRating={averageRating ?? 0}
              />
            )}

            {bordtype && (
              <div className="flex items-center  gap-1 mt-2">
                <CircleDot size={17} />
                <span className="capitalize text-white text-xs  py-1 rounded-full">
                  Board Type: {bordtype}
                </span>
              </div>
            )}

            <div className="flex items-center  gap-1">
              <PersonStanding color="white" size={17} />
              <span className="capitalize text-white text-xs  py-1 rounded-full">
                {agelimit ? "Age Limit: " + agelimit + "+" : "No Age Limit"}{" "}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="size-3 text-gray mr-1" />
              <span className="text-gray text-xs text-left">
                {location?.address ??
                  `${location?.city}, ${location?.state}, ${location?.country}`}
              </span>
            </div>

            <p className="text-gray text-xs mb-4 text-left">
              {shortDis.length > 100 && !showFullDesc
                ? `${shortDis.slice(0, 100)}...`
                : shortDis}
              {shortDis.length > 100 && (
                <button
                  type="button"
                  className="!text-white cursor-pointer ml-1 underline"
                  onClick={() => setShowFullDesc((prev) => !prev)}
                >
                  {showFullDesc ? "Show Less" : "Show More"}
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 pt-0 mt-auto">
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-2">
            <Link
              href={{
                pathname: `/establishments/${_id}`,
              }}
              passHref
            >
              <ThemeButton
                text="View More"
                className="w-full"
                fontSize="0.8rem"
              />
            </Link>
            <ThemeButton
              text="Show Map"
              onClickEvent={handleMapOpen}
              fontSize="0.8rem"
            />
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
