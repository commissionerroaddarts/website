"use client";

import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "@/components/global/CustomInput";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import ThemeButton from "@/components/buttons/ThemeButton";
import { useState } from "react";
import LogoUploaderPopup from "../MediaUploader/LogoUploaderPopup";
import { Plus, Upload, X } from "lucide-react";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import { boardTypeOptions, categoryOptions } from "@/utils/dropdowns";
import ImagesUploaderPopup from "../MediaUploader/ImagesUploader";
import BannerImagePopup from "../MediaUploader/BannerImageUploader";

const priceCategories = [
  { label: "Budget ($)", value: "$" },
  { label: "Mid Range ($$)", value: "$$" },
  { label: "Luxury ($$$)", value: "$$$" },
  { label: "Exclusive ($$$$)", value: "$$$$" },
];

export default function Step1Form() {
  const { control, setValue } = useFormContext(); // Notice: useFormContext instead of useForm!

  return (
    <Box>
      <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
        Basic Information
      </Typography>

      {/* Upload buttons here if needed */}

      <Grid2 container spacing={2} className="mb-8">
        <Grid2 size={{ xs: 12 }}>
          <UploadButtons />
        </Grid2>
        {/* Business Name */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Name"
                type="text"
                placeholder="Business Name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Tagline */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="tagline"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Tagline"
                type="text"
                placeholder="Business Tagline"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Phone Number */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Phone Number"
                type="tel"
                placeholder="Phone Number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Website */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="website"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Website"
                type="url"
                placeholder="Website"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Tags Field (multiple tags input) */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Tags"
                placeholder="Enter tags separated by commas"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) =>
                  setValue(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                value={field.value?.join(", ") ?? ""}
                fullWidth
              />
            )}
          />
        </Grid2>
        {/* Age Limit Field */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="agelimit"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Age Limit"
                onChange={(e) => setValue("agelimit", e.target.value)}
                value={field.value === 0 ? undefined : field.value}
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Enter minimum age (e.g., 18)"
                fullWidth
              />
            )}
          />
        </Grid2>
        {/* Category Dropdown */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <SelectSearchDropDown
                {...field}
                label="Category"
                options={categoryOptions}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(value) => setValue("category", value.target.value)}
              />
            )}
          />
        </Grid2>

        {/* Board Type Dropdown */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="bordtype"
            control={control}
            render={({ field, fieldState }) => (
              <SelectSearchDropDown
                {...field}
                label="Board Type"
                options={boardTypeOptions}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(value) => setValue("bordtype", value.target.value)}
              />
            )}
          />
        </Grid2>

        {/* Short Description */}
        <Grid2 size={{ xs: 12 }}>
          <Controller
            name="shortDis"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                multiline
                rows={4}
                label="Short Description"
                placeholder="Short Description"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => setValue("shortDis", e.target.value)}
                value={field.value}
              />
            )}
          />
        </Grid2>
      </Grid2>
      {/* Pricing Details */}
      <Box mb={4}>
        <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
          Pricing Details
        </Typography>

        <Controller
          name="price.category"
          control={control}
          render={({ field, fieldState }) => (
            <SelectSearchDropDown
              label="Price Category"
              {...field}
              value={field.value}
              onChange={(value) =>
                setValue("price.category", value.target.value)
              }
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              options={priceCategories}
            />
          )}
        />
      </Box>
    </Box>
  );
}

const UploadButtons = () => {
  const [uploadLogo, setUploadLogo] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);
  const [uploadCover, setUploadCover] = useState(false);

  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const logo = watch("media.logo");
  const cover = watch("media.cover");
  const images = watch("media.images") ?? [];

  // Remove functions
  const removeLogo = () => setValue("media.logo", null);
  const removeCoverPhoto = () => setValue("media.cover", null);
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_: any, i: number) => i !== index);
    setValue("media.images", updatedImages);
  };

  return (
    <div className="flex flex-wrap gap-10 justify-center mb-8">
      {/* === LOGO === */}
      <Box className="flex flex-col items-center justify-center gap-2">
        {logo ? (
          <Box
            className="flex flex-col items-center gap-2 relative p-5 rounded-2xl"
            sx={{
              background:
                "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
            }}
          >
            <Typography variant="h6">Logo Preview</Typography>
            <div className="relative">
              <img
                src={
                  typeof logo === "string" && logo.includes("http")
                    ? logo
                    : URL.createObjectURL(logo)
                }
                alt="Uploaded Logo"
                className="w-24 h-24 object-contain "
              />
              <CloseIconButton onClick={removeLogo} />
            </div>
          </Box>
        ) : (
          <>
            <ThemeButton
              text="Upload Logo"
              type="button"
              icon={<Upload className="w-5 h-5" />}
              onClickEvent={() => setUploadLogo(true)}
            />
            {typeof errors?.media === "object" &&
              errors.media !== null &&
              "logo" in errors.media &&
              typeof errors.media.logo?.message === "string" && (
                <Typography color="error" variant="body2" className="mt-2">
                  {errors?.media?.logo?.message}
                </Typography>
              )}
          </>
        )}
      </Box>

      {uploadLogo && (
        <LogoUploaderPopup open={uploadLogo} setOpen={setUploadLogo} />
      )}

      {/* === COVER PHOTO === */}
      <Box className="flex flex-col items-center justify-center gap-2">
        {cover ? (
          <Box
            className="flex flex-col items-center gap-2 relative p-5 rounded-2xl"
            sx={{
              background:
                "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
            }}
          >
            <Typography variant="h6">Cover Photo Preview</Typography>
            <div className="relative">
              <img
                src={
                  typeof cover === "string" && cover.includes("http")
                    ? cover
                    : URL.createObjectURL(cover)
                }
                alt="Business cover"
                className="w-24 h-24 object-contain "
              />
              <CloseIconButton onClick={removeCoverPhoto} />
            </div>
          </Box>
        ) : (
          <>
            <ThemeButton
              text="Upload Cover Photo"
              type="button"
              icon={<Upload className="w-5 h-5" />}
              onClickEvent={() => setUploadCover(true)}
            />
            {typeof errors?.media === "object" &&
              errors.media !== null &&
              "cover" in errors.media &&
              typeof errors.media.cover?.message === "string" && (
                <Typography color="error" variant="body2" className="mt-2">
                  {errors?.media?.cover?.message}
                </Typography>
              )}
          </>
        )}
      </Box>

      {uploadCover && (
        <BannerImagePopup open={uploadCover} setOpen={setUploadCover} />
      )}

      {/* === MEDIA IMAGES === */}
      <Box className="flex flex-col items-center gap-2 relative ">
        {images.length > 0 ? (
          <Box
            className="flex flex-col items-center gap-2 p-5 rounded-2xl justify-center"
            sx={{
              background:
                "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
            }}
          >
            <Typography variant="h6">Images Preview</Typography>
            <Box className="flex  items-center gap-2 ">
              <div className="flex gap-2 flex-wrap justify-center">
                {images.map((img: File, idx: number) => (
                  <div key={img.name} className="relative">
                    <img
                      src={
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      }
                      alt={`Uploaded ${idx}`}
                      className="w-24 h-24 object-contain "
                    />
                    <CloseIconButton onClick={() => removeImage(idx)} />
                  </div>
                ))}
              </div>

              <IconButton
                aria-label="Close"
                className="border-white rounded-full"
                onClick={() => setUploadMedia(true)}
              >
                <Plus className="w-5 h-5" color="white" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <>
            <ThemeButton
              text="Upload Media"
              type="button"
              icon={<Upload className="w-5 h-5" />}
              onClickEvent={() => setUploadMedia(true)}
            />
            {typeof errors?.media === "object" &&
              errors.media !== null &&
              "images" in errors.media &&
              typeof errors.media.images?.message === "string" && (
                <Typography color="error" variant="body2" className="mt-2">
                  {errors.media.images.message}
                </Typography>
              )}
          </>
        )}
      </Box>

      {uploadMedia && (
        <ImagesUploaderPopup open={uploadMedia} setOpen={setUploadMedia} />
      )}
    </div>
  );
};

const CloseIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "2px",
        right: "2px",
        color: "white",
        zIndex: 100,
        background: "red",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background 0.3s, transform 0.3s",
        padding: "0.2rem",
        "&:hover": {
          opacity: 0.9,
        },
      }}
      onClick={onClick}
      aria-label="Close"
    >
      <X className="size-3 text-white" />
    </IconButton>
  );
};
