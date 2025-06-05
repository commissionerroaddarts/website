import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Cropper from "react-easy-crop";
import Image from "next/image";
import { getCroppedImg } from "@/utils/cropImage"; // still used to render final result
import { useMediaQuery } from "@mui/system";
import theme from "@/theme/theme";

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [minZoom, setMinZoom] = useState(1);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  const calculateMinZoom = (
    imageWidth: number,
    imageHeight: number,
    containerWidth: number,
    containerHeight: number
  ) => {
    const zoomX = containerWidth / imageWidth;
    const zoomY = containerHeight / imageHeight;
    return Math.min(zoomX, zoomY); // Use max to ensure full image is visible
  };

  useEffect(() => {
    if (!previewUrl) return;

    const image = new window.Image();
    image.src = previewUrl;
    image.onload = () => {
      const containerSize = 250; // match your cropper box
      const minZoomCalculated = calculateMinZoom(
        image.width,
        image.height,
        containerSize,
        containerSize
      );
      setMinZoom(minZoomCalculated);
      setZoom(minZoomCalculated); // Set zoom to minimum initially
    };
  }, []);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      setZoom(minZoom); // Reset zoom to minimum before cropping
      const { blob, fileUrl } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      onSave(blob, fileUrl);
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="rounded-full overflow-hidden border-4 border-white mx-auto mb-4 relative"
          style={{
            width: isMobile ? "80px" : "160px",
            height: isMobile ? "80px" : "160px",
          }}
        >
          {previewUrl && (
            <>
              {/* Blurred full image as background */}
              <img
                src={previewUrl}
                alt="Blurred background"
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110 z-0"
              />

              {/* Cropper */}
              <div className="absolute inset-0 z-10">
                <Image
                  src={previewUrl}
                  alt="Circular Logo Preview"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex-grow">
          <p className="text-white mb-1">{fileName}</p>
          {uploadProgress === 100 ? (
            <p className="text-purple-700">Upload Complete</p>
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

      {imageSrc && (
        <div
          ref={cropContainerRef}
          className="relative w-full aspect-square bg-black rounded-lg overflow-hidden"
        >
          {/* Blurred full image as background */}
          <img
            src={imageSrc}
            alt="Blurred background"
            className="absolute inset-0 w-full h-full object-cover blur-md scale-110 z-0"
          />

          {/* Cropper */}
          <div className="absolute inset-0 z-10">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="round"
              restrictPosition={false}
              showGrid={false}
            />
          </div>
        </div>
      )}

      {/* Zoom Slider */}
      <input
        type="range"
        min={minZoom}
        max={3}
        step={0.01}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="mt-4 w-full"
      />

      {/* Save Button */}
      <button
        type="button"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-opacity-80 mt-4 w-full"
        onClick={handleSave}
      >
        Save Logo Placement
      </button>
    </div>
  );
};

export default LogoPreviewCropper;
