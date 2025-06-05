"use client";

import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import LogoDropzone from "./FileDropzone";
import LogoPreviewCropper from "./LogoPreview";
import { Box, Dialog, Typography } from "@mui/material";
import CloseIconButton from "@/components/global/CloseIconButton";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const LogoUploaderPopup = ({
  open,
  setOpen,
  handleInsertBusinessLogo,
  loadingUpload,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  handleInsertBusinessLogo?: (file: File) => Promise<void>;
  loadingUpload?: boolean;
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
      <LogoUploader
        setOpen={setOpen}
        handleInsertBusinessLogo={handleInsertBusinessLogo}
        loadingUpload={loadingUpload}
      />
    </Dialog>
  );
};

const LogoUploader = ({
  setOpen,
  handleInsertBusinessLogo,
  loadingUpload,
}: {
  setOpen: (arg: boolean) => void;
  handleInsertBusinessLogo?: (file: File) => Promise<void>;
  loadingUpload?: boolean;
}) => {
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (selectedFile: File) => {
    if (!selectedFile) return;
    setLoading(true);

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error(
        "Invalid file format. Please upload a PNG, JPG, or JPEG image."
      );
      setLoading(false);
      setFile(null);
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds 5MB. Please upload a smaller image.");
      setLoading(false);
      setFile(null);
      return;
    }

    try {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      const shouldCompress = fileSizeMB > 0.3; // Only compress if bigger than 300KB

      const options = {
        maxSizeMB: shouldCompress ? 0.4 : fileSizeMB, // target ~400KB
        maxWidthOrHeight: 1024, // Resize large images down to reduce size
        useWebWorker: true,
        initialQuality: 0.9, // High starting quality (0 to 1)
        alwaysKeepResolution: false, // Let the lib resize
      };

      const compressedFile = await imageCompression(selectedFile, options);

      // Optional preview
      const fileUrl = URL.createObjectURL(compressedFile);
      setPreviewUrl(fileUrl);

      setLoading(false);

      // Sync compressed file with RHF and local state
      setFile(compressedFile);
      setValue("media.logo", compressedFile);

      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(compressedFile);

      simulateUpload();
    } catch (error) {
      console.error("Compression failed:", error);
      toast.error("Failed to compress the image.");
      setLoading(false);
      setFile(null);
      setPreviewUrl(null);
      return;
    }
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
    setFile(null);
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
    // setFile(croppedFile);
    // setImageSrc(croppedFileUrl);
    setPreviewUrl(croppedFileUrl);
  };

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
        render={() => {
          let content;
          if (!file) {
            if (!loading) {
              content = (
                <LogoDropzone
                  onFileSelect={handleFileChange}
                  fileInputRef={fileInputRef}
                />
              );
            } else {
              content = <span>Loading...</span>;
            }
          } else {
            content = (
              <LogoPreviewCropper
                imageSrc={imageSrc}
                fileName={file.name}
                previewUrl={previewUrl}
                uploadProgress={uploadProgress}
                onRemove={handleRemove}
                onSave={handleSaveCroppedImage}
              />
            );
          }
          return content;
        }}
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
            text={loading || loadingUpload ? "Uploading" : "Upload"}
            disabled={loading || loadingUpload}
            onClick={
              handleInsertBusinessLogo
                ? async () => {
                    if (file) await handleInsertBusinessLogo(file);
                  }
                : () => setOpen(false)
            }
            className="w-full"
          />
        </div>
      )}
    </Box>
  );
};

export default LogoUploaderPopup;
