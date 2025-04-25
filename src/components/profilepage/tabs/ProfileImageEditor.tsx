import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Button,
} from "@mui/material";
import { getCroppedImg } from "@/utils/cropImage";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (blob: Blob, fileUrl: string) => void;
};

const ProfileImageEditor: React.FC<Props> = ({ open, onClose, onSave }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      const { blob, fileUrl } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      onSave(blob, fileUrl);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile Image</DialogTitle>
      <DialogContent>
        {!imageSrc ? (
          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        ) : (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(_, value) => setZoom(value as number)}
              sx={{ mt: 2 }}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {imageSrc && <Button onClick={handleSave}>Save</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default ProfileImageEditor;
