"use client";

import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import LogoDropzone from "./FileDropzone";
import LogoPreviewCropper from "./LogoPreview";

interface FormData {
  file: File | null;
}

const LogoUploaderPopup: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: { file: null },
  });
  const file = watch("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
    setValue("file", selectedFile);
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
    setValue("file", null);
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

  const onSubmit = (data: FormData) => {
    if (data.file) {
      simulateUpload(); // Simulate upload progress
      // Handle the file upload logic here
      console.log("File ready for upload:", data.file);
    } else {
      console.error("No file selected for upload.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center py-10 p-4"
      style={{
        background: "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
      }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Upload Logo
      </h1>

      <Controller
        name="file"
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
          text={isSubmitting ? "Uploading..." : "Upload"}
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default LogoUploaderPopup;
