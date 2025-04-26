// components/Uploader/LogoThumbnail.tsx
import React from "react";

interface LogoThumbnailProps {
  previewUrl: string;
  uploadProgress: number | null;
  onRemove: () => void;
}

const LogoThumbnail: React.FC<LogoThumbnailProps> = ({
  previewUrl,
  uploadProgress,
  onRemove,
}) => {
  return (
    <div
      className="logo-thumbnail"
      style={{ position: "relative", width: "120px" }}
    >
      <img
        src={previewUrl}
        alt="Thumbnail"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {uploadProgress !== null && (
        <div
          className="progress-bar"
          style={{
            width: `${uploadProgress}%`,
            backgroundColor: "green",
            height: "5px",
            marginTop: "4px",
          }}
        />
      )}

      <button
        onClick={onRemove}
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default LogoThumbnail;
