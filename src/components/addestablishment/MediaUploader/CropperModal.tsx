// components/Uploader/CropperModal.tsx
import React from "react";

interface CropperModalProps {
  file: File;
  onCropComplete: () => void;
  onCancel: () => void;
}

const CropperModal: React.FC<CropperModalProps> = ({
  file,
  onCropComplete,
  onCancel,
}) => {
  return (
    <div className="cropper-modal">
      <h3>Crop your logo</h3>
      {/* Cropper UI comes here */}

      <button onClick={onCropComplete}>Crop</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CropperModal;
