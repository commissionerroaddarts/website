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
  insertBusinessImages,
} from "@/services/businessService";
import BannerImagePopup from "@/components/addestablishment/MediaUploader/BannerImageUploader";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

interface GalleryProps {
  readonly images: string[];
  readonly id: string;
  readonly logo: string;
  readonly name: string;
  readonly tagline: string;
}

const schema = yup.object().shape({
  media: yup.object().shape({
    logo: yup
      .mixed()
      .test("fileOrUrl", "Unsupported file format", (value: unknown) => {
        if (!value) return true;

        if (typeof value === "string") return true; // Accept URL

        const file = value as File;
        return SUPPORTED_FORMATS.includes(file.type);
      })
      .test("fileSize", "Max allowed size is 5MB", (value: unknown) => {
        if (!value || typeof value === "string") return true;

        const file = value as File;
        return file.size <= MAX_FILE_SIZE;
      }),

    images: yup.array().of(
      yup
        .mixed()
        .test(
          "fileOrUrl",
          "Only JPG,PNG or JPEG images allowed",
          (value: unknown) => {
            if (!value) return false;

            if (typeof value === "string") return true; // Accept URL

            return (
              value instanceof File && SUPPORTED_FORMATS.includes(value.type)
            );
          }
        )
        .test("fileSize", "Each image must be under 5MB", (value: unknown) => {
          if (!value || typeof value === "string") return true;

          return value instanceof File && value.size <= MAX_FILE_SIZE;
        })
    ),
  }),
});

export default function EstablishmentProfileHeader({
  images,
  id,
  logo,
  name,
  tagline,
}: GalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      media: {
        logo: logo ?? "",
        images: images ?? [],
      },
    },
    resolver: yupResolver(schema),
  });

  const { user } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  const isStoreOwner = role === "owner" || role === "admin";
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [uploadLogo, setUploadLogo] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);

  const handleOpenConfirm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleInsertBusinessCover = async (cover: File) => {
    try {
      const response = await insertBusinessCover(id, cover);
      if (response?.status === 200) {
        toast.success("Cover photo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const handleInsertBusinessLogo = async (logo: File) => {
    try {
      const response = await insertBusinessLogo(id, logo);
      if (response?.status === 200) {
        toast.success("Logo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  if (!images || images.length === 0) return null;

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
          src={images[0] ?? "/images/banners/img-placeholder-dark.jpg"}
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
              {images[0] ? "Edit Cover Photo" : "Add Cover Photo"}
            </button>

            {uploadMedia && (
              <BannerImagePopup
                open={uploadMedia}
                setOpen={setUploadMedia}
                handleInsertBusinessCover={handleInsertBusinessCover}
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
                logo &&
                typeof logo === "string" &&
                logo.toLowerCase().endsWith(".png")
                  ? "white"
                  : "transparent",
            }}
          >
            <Image
              src={logo ?? "/images/banners/business-placeholder.png"}
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
                  <EditIcon color="purple" size={20} />
                </IconButton>

                {uploadLogo && (
                  <LogoUploaderPopup
                    open={uploadLogo}
                    setOpen={setUploadLogo}
                    handleInsertBusinessLogo={handleInsertBusinessLogo}
                  />
                )}
              </>
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
    </FormProvider>
  );
}
