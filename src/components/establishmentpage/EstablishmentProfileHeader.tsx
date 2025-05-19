"use client";
import { useMediaQuery } from "@mui/system";
import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import { useAppState } from "@/hooks/useAppState";
import { useState } from "react";
import Link from "next/link";
import ThemeButton from "../buttons/ThemeButton";
import { Camera, Edit, Trash } from "lucide-react";
import DeleteListingDialog from "../global/DeleteListingDialog";

interface GalleryProps {
  readonly images: string[];
  readonly id: string;
  readonly logo: string;
  readonly name: string;
  readonly tagline: string;
}

export default function EstablishmentProfileHeader({
  images,
  id,
  logo,
  name,
  tagline,
}: GalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  const isStoreOwner = role === "owner" || role === "admin";
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <DeleteListingDialog
        _id={id}
        loading={loading}
        setLoading={setLoading}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
      {/* Banner with logo */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "180px" : "300px",
          marginBottom: isMobile ? "3rem" : "5rem",
        }}
      >
        <Image
          src={images[0] ?? "/images/banners/img-placeholder-dark.jpg"}
          alt="Cover Banner"
          fill
          className="object-cover w-full h-full rounded-xl"
        />

        {isStoreOwner && (
          <button
            className="absolute top-2 right-2  px-3 py-1 text-sm rounded-full shadow hover:bg-opacity-100 transition flex items-center gap-2"
            style={{
              background:
                "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
            }}
            onClick={() => console.log("Edit Cover Photo Clicked")}
          >
            <Camera className="inline-block mr-1" size={20} />
            {images[0] ? "Edit Cover Photo" : "Add Cover Photo"}
          </button>
        )}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "-6.6rem" : "-6rem",
            left: isMobile ? "50%" : "-2rem",
            transform: isMobile ? "translateX(-50%)" : "translateX(0)",
          }}
          className="flex flex-col md:flex-row md:gap-2 items-start  md:items-end w-full md:w-auto"
        >
          <div
            style={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              width: isMobile ? "80px" : "160px",
              height: isMobile ? "80px" : "160px",
              border: "4px solid white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src={logo ?? "/images/banners/business-placeholder.png"}
              alt="Business Logo"
              fill
              className="object-cover w-full h-full"
            />
            {isStoreOwner && (
              <button
                className="absolute -top-10 -right-10 bg-white bg-opacity-90 text-lg z-[100] px-2 py-0.5 rounded-full shadow hover:bg-opacity-100 transition"
                onClick={() => console.log("Edit Logo Clicked")}
              >
                {logo ? "Edit" : "Add"}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h1 className="text-white text-3xl font-bold">{name}</h1>
            <p className="text-gray-400 text-sm">{tagline}</p>
          </div>
        </div>

        <div className="absolute -bottom-20  right-0 p-4 gap-2 hidden md:flex">
          {isStoreOwner && (
            <Box className="flex gap-2">
              <Link href={`/edit-establishment/${id}`}>
                <ThemeButton
                  text="Edit Details"
                  endIcon={<Edit className="inline-block ml-1" size={15} />}
                />
              </Link>

              <ThemeButton
                onClick={handleOpenConfirm}
                text={loading ? "Deleting" : "Delete"}
                backgroundColor="darkred"
                endIcon={<Trash className="inline-block ml-1" size={15} />}
              />
            </Box>
          )}
        </div>
      </div>
    </>
  );
}
