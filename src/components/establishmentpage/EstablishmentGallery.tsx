"use client";
import { useState } from "react";
import { Grid2, Button, Dialog, DialogContent } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import CloseIconButton from "@/components/global/CloseIconButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageGalleryProps {
  images: string[];
  gridType?: "default" | "2x2";
  maxImages?: number;
  height?: string;
}

export default function EstablishmentGallery({
  images,
  gridType = "default",
  maxImages = 6,
  height = "200px",
}: Readonly<ImageGalleryProps>) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const sliderSettings = {
    initialSlide: selectedIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    dots: true,
  };

  const renderImage = (img: string, index: number) => (
    <Button
      key={img + index}
      onClick={() => handleOpen(index)}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        borderRadius: "1rem",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Image
        src={img}
        alt={`Image ${index + 1}`}
        fill
        className="object-cover w-full h-full"
      />
    </Button>
  );

  if (!images || images.length === 0) return null;

  return (
    <>
      <Grid2 container spacing={2}>
        {images.slice(0, 4).map((img, idx) => (
          <Grid2 key={img + idx} size={{ xs: 12, sm: 6 }}>
            {renderImage(img, idx)}
          </Grid2>
        ))}
      </Grid2>

      {/* Modal Slider */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          background: "transparent",
          backdropFilter: "blur(10px)",
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
            overflow: "hidden",
            height: { xs: "30vh", md: "70vh" },
          }}
        >
          <CloseIconButton onClick={handleClose} />
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <Image
                key={img + idx}
                src={img}
                alt={`Zoomed Image ${idx + 1}`}
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />
            ))}
          </Slider>
        </DialogContent>
      </Dialog>
    </>
  );
}
