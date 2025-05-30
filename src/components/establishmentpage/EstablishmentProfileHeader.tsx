"use client";
import { useMediaQuery } from "@mui/system";
import { Box, IconButton, useTheme } from "@mui/material";
import Image from "next/image";
import { useAppState } from "@/hooks/useAppState";
import { useState } from "react";
import Link from "next/link";
import ThemeButton from "../buttons/ThemeButton";
import { Camera, Edit, EditIcon, Trash } from "lucide-react";
import DeleteListingDialog from "@/components/global/DeleteListingDialog";
import LogoUploaderPopup from "@/components/addestablishment/MediaUploader/LogoUploaderPopup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  insertBusinessCover,
  insertBusinessLogo,
  // insertBusinessImages,
} from "@/services/businessService";
import BannerImagePopup from "@/components/addestablishment/MediaUploader/BannerImageUploader";
import { mediaSchema } from "@/yupSchemas/mediaSchema";

interface GalleryProps {
  readonly id: string;
  readonly businessUserId: string;
  readonly name: string;
  readonly tagline: string;
  readonly media?: {
    logo?: string;
    images: string[];
    cover?: string;
  };
  readonly bordtype?: string;
}

const schema = yup.object().shape({
  media: mediaSchema,
});

export default function EstablishmentProfileHeader({
  id,
  businessUserId,
  name,
  tagline,
  media,
  bordtype,
}: GalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      media: {
        logo: media?.logo ?? "",
        cover: media?.cover ?? "",
        images: media?.images ?? [],
      },
    },
    resolver: yupResolver(schema),
  });

  const { user } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  const isStoreOwner =
    (role === "owner" || role === "admin") &&
    userDetails?._id === businessUserId;
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState({
    images: false,
    logo: false,
    cover: false,
  });

  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleInsertBusinessCover = async (cover: File) => {
    try {
      setLoadingUpload((prev) => ({ ...prev, cover: true }));
      const response = await insertBusinessCover(id, cover);
      if (response?.status === 200) {
        toast.success("Cover photo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");

      setLoadingUpload((prev) => ({ ...prev, cover: false }));
    }
  };

  const handleInsertBusinessLogo = async (logo: File) => {
    try {
      setLoadingUpload((prev) => ({ ...prev, logo: true }));
      const response = await insertBusinessLogo(id, logo);
      if (response?.status === 200) {
        toast.success("Logo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
      setLoadingUpload((prev) => ({ ...prev, logo: false }));
    }
  };

  return (
    <FormProvider {...methods}>
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
          src={media?.cover ?? "/images/banners/img-placeholder-dark.jpg"}
          alt="Cover Banner"
          fill
          className="object-cover w-full h-full rounded-xl"
        />

        {isStoreOwner && (
          <>
            <button
              className="absolute cursor-pointer top-2 right-2  px-3 py-1 text-sm rounded-full shadow hover:bg-opacity-100 transition flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
              }}
              onClick={() => setUploadMedia(true)}
            >
              <Camera className="inline-block mr-1" size={20} />
              {media?.cover ? "Edit Cover Photo" : "Add Cover Photo"}
            </button>

            {uploadMedia && (
              <BannerImagePopup
                open={uploadMedia}
                setOpen={setUploadMedia}
                handleInsertBusinessCover={handleInsertBusinessCover}
                loadingUpload={loadingUpload.cover}
              />
            )}
          </>
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
              width: isMobile ? "80px" : "160px",
              height: isMobile ? "80px" : "160px",
              border: "4px solid white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              background:
                media?.logo &&
                typeof media?.logo === "string" &&
                media?.logo.toLowerCase().endsWith(".png")
                  ? "white"
                  : "transparent",
            }}
          >
            <Image
              src={media?.logo ?? "/images/banners/business-placeholder.png"}
              alt="Business Logo"
              fill
              className="object-cover w-full h-full rounded-full"
            />

            {isStoreOwner && (
              <>
                <IconButton
                  onClick={() => setUploadLogo(true)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "grey.200" },
                  }}
                >
                  <EditIcon color="purple" size={isMobile ? 15 : 20} />
                </IconButton>

                {uploadLogo && (
                  <LogoUploaderPopup
                    open={uploadLogo}
                    setOpen={setUploadLogo}
                    handleInsertBusinessLogo={handleInsertBusinessLogo}
                    loadingUpload={loadingUpload.logo}
                  />
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <div className="flex gap-2 items-center flex-wrap">
              <h1 className="text-white text-3xl font-bold">{name}</h1>
              {bordtype && bordtype !== "" && (
                <span className="bg-[#3a2a3e] capitalize text-white text-xs px-3 py-1 rounded-full">
                  Board Type: {bordtype}
                </span>
              )}
              {/* <h5 className="text-white text-xl">({bordtype})</h5> */}
            </div>
            <p className="text-gray-400 text-sm capitalize">{tagline}</p>
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
    </FormProvider>
  );
}
