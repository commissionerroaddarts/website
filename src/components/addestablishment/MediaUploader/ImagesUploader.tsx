"use client";

import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ThemeButton from "../../buttons/ThemeButton";
import { Box, Dialog, IconButton } from "@mui/material";
import { Plus, X } from "lucide-react";
import CloseIconButton from "@/components/global/CloseIconButton";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, {
    type: blob.type || "image/png", // fallback type
    lastModified: Date.now(),
  });
}

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
  const [files, setFiles] = useState<Blob[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Show already uploaded images from form context on mount
  React.useEffect(() => {
    const existingImages = getValues("media.images");

    if (existingImages && Array.isArray(existingImages)) {
      const validFiles = existingImages.map((img: any, i: number) => {
        // If Blob but not File
        if (img instanceof Blob && !(img instanceof File)) {
          return blobToFile(img, `image_${i + 1}.png`);
        }
        return img;
      });

      const previewUrls = validFiles.map((img: any) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );

      setFiles(validFiles.filter((f: any) => f instanceof File));
      setPreviews(previewUrls);
      setValue("media.images", validFiles); // update form values
    }
  }, [getValues]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    setLoading(true);

    const invalidTypeFiles = selectedFiles.filter(
      (file) =>
        !["image/jpeg", "image/png", "image/jpg"].includes(
          file.type.toLowerCase()
        )
    );

    if (invalidTypeFiles.length > 0) {
      toast.error(
        "Invalid file format. Please upload PNG, JPG, or JPEG images."
      );
      setLoading(false);
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type.toLowerCase())
    );

    const compressedFiles: Blob[] = [];
    const previewUrls: string[] = [];

    for (const file of validFiles) {
      try {
        const fileSizeMB = file.size / (1024 * 1024);
        const shouldCompress = fileSizeMB > 0.3; // Only compress if bigger than 300KB

        const compressed = await imageCompression(file, {
          maxSizeMB: shouldCompress ? 0.4 : fileSizeMB, // target ~400KB
          maxWidthOrHeight: 1024, // Resize large images down to reduce size
          useWebWorker: true,
          initialQuality: 0.9, // High starting quality (0 to 1)
          alwaysKeepResolution: false, // Let the lib resize
        });

        compressedFiles.push(compressed);
        previewUrls.push(URL.createObjectURL(compressed));
      } catch (err) {
        console.error("Compression error:", err);
        toast.error("Error compressing image");
        setLoading(false);
        return;
      }
    }

    if (compressedFiles.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(false);
      return;
    }

    // ✅ Separate existing images (string URLs)
    const existing = getValues("media.images") ?? [];
    const existingUrls = existing.filter(
      (item: any) => typeof item === "string"
    );
    const updatedFiles = [...compressedFiles]; // only new blobs

    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]); // only blobs
    setValue("media.images", [...existingUrls, ...updatedFiles]); // mix of URL + new

    setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    setLoading(false);
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
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <ThemeButton
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  text={loading ? "Selecting..." : "Select Images"}
                  disabled={loading}
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
                    disabled={loading}
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
            text={loading ? "Uploading..." : "Upload"}
            onClick={() => setOpen(false)}
            className="w-full"
            disabled={loading}
          />
        </div>
      )}
    </Box>
  );
};

export default ImagesUploaderPopup;
