import React, { useCallback, useState } from "react";
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

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      setZoom(1);
      const { blob, fileUrl } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      onSave(blob, fileUrl);
    }
  };

  return (
    <div className="w-full bg-[#3a2562] rounded-lg p-4 mb-6">
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
            <Image
              src={previewUrl}
              alt="Circular Logo Preview"
              layout="fill"
              objectFit="cover"
            />
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

      {/* Placement Area */}
      <div className="relative w-full aspect-video bg-gray-400 rounded-lg overflow-hidden">
        {previewUrl && (
          <Cropper
            image={previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square or adjust to your frame
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect" // or "round" if you want a circular frame
            showGrid={false}
          />
        )}
      </div>

      {/* Zoom Slider */}
      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
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
