"use client";

import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import LogoDropzone from "./FileDropzone";
import LogoPreviewCropper from "./LogoPreview";
import { Box, Dialog, IconButton } from "@mui/material";
import { X } from "lucide-react";

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

      <LogoUploader setOpen={setOpen} />
    </Dialog>
  );
};

const LogoUploader = ({ setOpen }: { setOpen: (arg: boolean) => void }) => {
  const { control, setValue } = useFormContext();
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
    setValue("businessLogo", selectedFile); // <-- Sync with RHF

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
    setValue("businessLogo", null);
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
    setValue("file", croppedFile);
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
        name="businessLogo"
        defaultValue={null}
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

export default LogoUploaderPopup;
