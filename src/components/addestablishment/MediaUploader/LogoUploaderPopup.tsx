"use client";

import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import LogoDropzone from "./FileDropzone";
import LogoPreviewCropper from "./LogoPreview";
import { Box, Dialog, Typography } from "@mui/material";
import CloseIconButton from "@/components/global/CloseIconButton";

const LogoUploaderPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      className=" rounded-3xl backdrop-blur-sm relative"
    >
      <CloseIconButton onClick={() => setOpen(false)} />
      <LogoUploader setOpen={setOpen} />
    </Dialog>
  );
};

const LogoUploader = ({ setOpen }: { setOpen: (arg: boolean) => void }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File) => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(selectedFile);

    setFile(selectedFile); // <-- Local state
    setValue("media.logo", selectedFile); // <-- Sync with RHF

    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleRemove = () => {
    setValue("media.logo", null);
    setPreviewUrl(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveCroppedImage = (
    croppedBlob: Blob,
    croppedFileUrl: string
  ) => {
    const croppedFile = new File(
      [croppedBlob],
      file?.name ?? "cropped-image.png",
      { type: croppedBlob.type }
    );
    setValue("media.logo", croppedFile);
    setFile(croppedFile);
    setImageSrc(croppedFileUrl);
    setPreviewUrl(croppedFileUrl);
  };
  console.log(errors);

  return (
    <Box
      className="flex flex-col items-center justify-center py-10 p-4"
      style={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Upload Logo
      </h1>

      <Controller
        name="media.logo"
        control={control}
        render={() =>
          !file ? (
            <LogoDropzone
              onFileSelect={handleFileChange}
              fileInputRef={fileInputRef}
            />
          ) : (
            <LogoPreviewCropper
              imageSrc={imageSrc}
              fileName={file.name}
              previewUrl={previewUrl}
              uploadProgress={uploadProgress}
              onRemove={handleRemove}
              onSave={handleSaveCroppedImage}
            />
          )
        }
      />
      {typeof errors?.media === "object" &&
        errors.media !== null &&
        "logo" in errors.media &&
        typeof errors.media.logo?.message === "string" && (
          <Typography color="error" variant="body2" className="mt-2">
            {errors?.media?.logo?.message}
          </Typography>
        )}
      {file && (
        <div className="flex justify-center">
          <ThemeButton
            text={"Upload"}
            onClick={() => setOpen(false)}
            className="w-full"
          />
        </div>
      )}
    </Box>
  );
};

export default LogoUploaderPopup;
