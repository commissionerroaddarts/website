"use client";

import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import { Box, Dialog, IconButton } from "@mui/material";
import { Plus, X } from "lucide-react";
import CloseIconButton from "@/components/global/CloseIconButton";
import { toast } from "react-toastify";

const ImagesUploaderPopup = ({
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
      className="rounded-3xl backdrop-blur-sm relative"
    >
      <CloseIconButton onClick={() => setOpen(false)} />
      <ImagesUploader setOpen={setOpen} />
    </Dialog>
  );
};
const ImagesUploader = ({ setOpen }: { setOpen: (arg: boolean) => void }) => {
  const { control, setValue, getValues } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Show already uploaded images from form context on mount
  React.useEffect(() => {
    const existingImages = getValues("media.images");
    if (
      existingImages &&
      Array.isArray(existingImages) &&
      existingImages.length > 0
    ) {
      // If images are File objects, generate previews; if strings (URLs/base64), use directly
      const previewUrls = existingImages.map((img: any) => {
        if (img instanceof File) {
          return URL.createObjectURL(img);
        }
        return img; // assume it's a URL or base64 string
      });
      setFiles(existingImages.filter((img: any) => img instanceof File));
      setPreviews(previewUrls);
    }
  }, [getValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    const invalidTypeFiles = selectedFiles.filter(
      (file) => !["image/jpeg", "image/png"].includes(file.type.toLowerCase())
    );
    const invalidSizeFiles = selectedFiles.filter(
      (file) => file.size > 5 * 1024 * 1024
    );
    const validFiles = selectedFiles.filter(
      (file) =>
        ["image/jpg", "image/png"].includes(file.type.toLowerCase()) &&
        file.size <= 5 * 1024 * 1024
    );

    if (invalidTypeFiles.length > 0) {
      toast.error("Invalid file format. Please upload a PNG or JPG  image.");
    }
    if (invalidSizeFiles.length > 0) {
      toast.error("Some files exceed the 5MB size limit.");
    }
    if (validFiles.length === 0) {
      // Reset file input so user can re-upload the same file if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    // Append new files to existing ones
    const newFiles = [...files, ...validFiles];
    const newPreviews = [...previews, ...previewUrls];

    setFiles(newFiles);
    setPreviews(newPreviews);
    setValue("media.images", newFiles);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setValue("media.images", updatedFiles);
  };

  return (
    <Box
      className="flex flex-col items-center justify-center py-10 p-4"
      sx={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Upload Images
      </h1>

      <Controller
        name="media.images"
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => (
          <>
            {!previews.length ? (
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <ThemeButton
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  text="Select Images"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {previews.map((src, i) => (
                  <div key={src + i} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      onClick={() => handleRemove(i)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <div className="mb-4 flex items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <IconButton
                    aria-label="Close"
                    className="border-white rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    <Plus className="w-5 h-5" color="white" />
                  </IconButton>
                </div>
              </div>
            )}
          </>
        )}
      />

      {previews.length > 0 && (
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

export default ImagesUploaderPopup;
