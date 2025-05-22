"use client";
import { useState } from "react";
import { Grid2, Button, Dialog, DialogContent, Box } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import CloseIconButton from "@/components/global/CloseIconButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";

interface ImageGalleryProps {
  images: string[];
  height?: string;
}

export default function EstablishmentGallery({
  images,
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
        padding: 0,
        backgroundColor:
          img && typeof img === "string" && img.toLowerCase().endsWith(".png")
            ? "white"
            : "transparent",
      }}
    >
      <Image
        src={img}
        alt={`Image ${index + 1}`}
        fill
        className="object-cover w-full h-full"
      />
      {/* Hover Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s",
          fontSize: "1rem",
          fontWeight: 500,
          zIndex: 100,
        }}
        className="hover:opacity-100"
      >
        Click to view
      </div>
    </Button>
  );

  if (!images || images.length === 0) return null;

  return (
    <>
      <Grid2 container spacing={2}>
        {images.slice(0, 4).map((img, idx) => (
          <Grid2 key={img + idx} size={{ xs: 12, md: 6 }}>
            {renderImage(img, idx)}
          </Grid2>
        ))}

        {/* Show More Button */}
        {images.length > 3 && (
          <Grid2 size={{ xs: 12 }}>
            <ThemeOutlineButton
              onClick={() => handleOpen(4)}
              text={`Show More Images (${images.length - 4} more)`}
            />
          </Grid2>
        )}
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
        className="gallery-slider"
      >
        <DialogContent
          sx={{
            padding: 0,
            overflow: "hidden",
          }}
        >
          <CloseIconButton onClick={handleClose} />
          <div style={{ height: "100%", position: "relative" }}>
            <Slider {...sliderSettings}>
              {images.map((img, idx) => (
                <Box
                  key={img + idx}
                  sx={{
                    height: { xs: "30vh", md: "70vh" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor:
                      img &&
                      typeof img === "string" &&
                      img.toLowerCase().endsWith(".png")
                        ? "white"
                        : "black",
                  }}
                >
                  <Image
                    src={img}
                    alt={`Zoomed Image ${idx + 1}`}
                    fill
                    className=" object-contain"
                  />
                </Box>
              ))}
            </Slider>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
