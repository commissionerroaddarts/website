import React, { useCallback, useState } from "react";
import { X } from "lucide-react";
import Cropper from "react-easy-crop";
import Image from "next/image";
import { getCroppedImg } from "@/utils/cropImage";

interface LogoPreviewCropperProps {
  imageSrc: string | null;
  fileName: string;
  previewUrl: string | null;
  uploadProgress: number;
  onRemove: () => void;
  onSave: (croppedBlob: Blob, croppedFileUrl: string) => void;
}

const LogoPreviewCropper: React.FC<LogoPreviewCropperProps> = ({
  imageSrc,
  fileName,
  previewUrl,
  uploadProgress,
  onRemove,
  onSave,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false); // new state

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const { blob, fileUrl } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      onSave(blob, fileUrl);
      setIsCropping((prev) => !prev);
    }
  };

  return (
    <div className="w-full bg-[#3a2562] rounded-lg p-4 mb-6">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white rounded overflow-hidden mr-3 flex-shrink-0">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Logo thumbnail"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex-grow">
          <p className="text-white mb-1">{fileName}</p>
          {uploadProgress === 100 ? (
            <p className="text-green-500">Upload Complete</p>
          ) : (
            <div className="bg-[#d9d9d9]/30 rounded-full h-2 w-full">
              <div
                className="bg-white rounded-full h-2"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
        <button
          className="ml-2 bg-[#ec6dff] cursor-pointer rounded-full p-1 hover:bg-opacity-80 transition-colors"
          onClick={onRemove}
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Image Preview or Cropper */}
      <div className="relative w-full aspect-video bg-gray-400 rounded-lg overflow-hidden">
        {previewUrl &&
          (isCropping ? (
            <Cropper
              image={previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <Image
              src={previewUrl}
              alt="Logo preview"
              layout="fill"
              objectFit="contain"
            />
          ))}
      </div>

      {/* Zoom Slider for cropping mode */}
      {isCropping && (
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="mt-4 w-full"
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          className="bg-[#ec6dff] text-white py-2 px-4 rounded hover:bg-opacity-80 flex-1"
          onClick={() => setIsCropping((prev) => !prev)}
        >
          {isCropping ? "Preview Image" : "Crop Image"}
        </button>

        {isCropping && (
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-opacity-80 flex-1"
            onClick={handleSave}
          >
            Save Cropped Image
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoPreviewCropper;
