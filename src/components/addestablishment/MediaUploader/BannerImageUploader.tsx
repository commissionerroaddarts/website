"use client";

import React, { useRef, useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import { Box, Dialog } from "@mui/material";
import { X } from "lucide-react";
import CloseIconButton from "@/components/global/CloseIconButton";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const BannerImagePopup = ({
  open,
  setOpen,
  handleInsertBusinessCover,
  loadingUpload,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  handleInsertBusinessCover?: (file: File) => Promise<void>;
  loadingUpload?: boolean;
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      className="rounded-3xl backdrop-blur-sm relative"
    >
      <CloseIconButton onClick={() => setOpen(false)} />
      <BannerUploader
        setOpen={setOpen}
        handleInsertBusinessCover={handleInsertBusinessCover}
        loadingUpload={loadingUpload}
      />
    </Dialog>
  );
};
const BannerUploader = ({
  setOpen,
  handleInsertBusinessCover,
  loadingUpload,
}: {
  setOpen: (arg: boolean) => void;
  handleInsertBusinessCover?: (file: File) => Promise<void>;
  loadingUpload?: boolean;
}) => {
  const { control, setValue, getValues } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existingImage = getValues("media.cover");

    if (existingImage) {
      if (existingImage instanceof File) {
        setPreview(URL.createObjectURL(existingImage));
        setFile(existingImage);
      } else {
        setPreview(existingImage);
      }
    }
  }, [getValues]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(
        selectedFile.type.toLowerCase()
      )
    ) {
      toast.error(
        "Invalid file format. Please upload a PNG, JPG or JPEG image."
      );
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image exceeds 5MB size limit.");
      return;
    }

    try {
      setLoading(true);
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

      setFile(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
      setValue("media.cover", compressedFile); // 👈 set as array
      setLoading(false);
    } catch (error) {
      console.error("Error compressing image:", error);
      toast.error("Error compressing image. Please try again.");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setValue("media.cover", null); // 👈 empty array
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box
      className="flex flex-col items-center justify-center py-10 p-4"
      sx={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Upload Cover Photo
      </h1>

      <Controller
        name="media.cover" // 👈 points to first item
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => (
          <>
            {!preview ? (
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <ThemeButton
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  disabled={loading}
                  text={loading ? "Selecting" : "Select Cover Photo"}
                />
              </div>
            ) : (
              <div className="relative mb-4">
                <img
                  src={preview}
                  alt="Cover Preview"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  onClick={handleRemove}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </>
        )}
      />

      {preview && (
        <div className="flex justify-center w-full">
          <ThemeButton
            text={loadingUpload ? "Saving..." : "Save"}
            disabled={loadingUpload}
            onClick={
              handleInsertBusinessCover
                ? async () => {
                    if (file) {
                      await handleInsertBusinessCover(file);
                      setOpen(false);
                    }
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

export default BannerImagePopup;
