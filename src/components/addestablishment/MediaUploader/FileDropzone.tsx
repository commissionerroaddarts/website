import React from "react";
import { Upload } from "lucide-react";

interface LogoDropzoneProps {
  onFileSelect: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const LogoDropzone: React.FC<LogoDropzoneProps> = ({
  onFileSelect,
  fileInputRef,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-white/40 rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer"
      onClick={triggerFileInput}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-4">
        <Upload className="h-10 w-10 text-white" />
      </div>
      <p className="text-white text-center">
        Drag & drop or click to upload your logo
      </p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default LogoDropzone;
