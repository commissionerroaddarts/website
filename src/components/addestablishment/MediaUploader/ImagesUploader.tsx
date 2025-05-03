"use client";

import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import { Box, Dialog, IconButton } from "@mui/material";
import { X } from "lucide-react";

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
      <IconButton
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
          zIndex: 1,
          background: "#ec6dff",
          borderRadius: "50%",
          padding: "0.5rem",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={() => setOpen(false)}
        aria-label="Close"
      >
        <X className="h-5 w-5 text-white" />
      </IconButton>

      <ImagesUploader setOpen={setOpen} />
    </Dialog>
  );
};

const ImagesUploader = ({ setOpen }: { setOpen: (arg: boolean) => void }) => {
  const { control, setValue } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    const validFiles = selectedFiles.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      );

      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(",")[1]; // Extract the base64 string
      setValue("media.images", base64String); // <-- Sync with RHF
    };
    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    setFiles(validFiles);
    setPreviews(previewUrls);
    setValue("media.images", validFiles);
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
      style={{
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
            {!files.length ? (
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fieldState?.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState?.error.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white border border-white px-4 py-2 rounded-md"
                >
                  Select Images
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {previews.map((src, i) => (
                  <div key={src} className="relative">
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
              </div>
            )}
          </>
        )}
      />

      <div className="flex justify-center">
        <ThemeButton
          text={"Upload"}
          onClick={() => setOpen(false)}
          className="w-full"
        />
      </div>
    </Box>
  );
};

export default ImagesUploaderPopup;
