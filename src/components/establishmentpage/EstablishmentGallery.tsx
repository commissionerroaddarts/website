"use client";
import { useState } from "react";
import { Grid2, Button, Dialog, DialogContent } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIconButton from "@/components/global/CloseIconButton";
import { useMediaQuery } from "@mui/system";
import theme from "@/theme/theme";

interface GalleryProps {
  readonly images: string[];
}

export default function EstablishmentGallery({ images }: GalleryProps) {
  const imageCount = images.length;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  if (imageCount === 0) return null;

  const renderImage = (
    img: string,
    index: number,
    height: string = "200px"
  ) => (
    <Button
      key={img + index}
      onClick={() => handleOpen(index)}
      style={{
        position: "relative",
        height: height,
        maxHeight: "410px",
        minHeight: "200px",
        overflow: "hidden",
        borderRadius: "1rem",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Image
        src={img}
        alt={`Gallery Image ${index + 1}`}
        fill
        className={`w-full object-cover h-full`}
      />
    </Button>
  );

  return (
    <>
      {!isMobile ? (
        <Grid2 container spacing={2}>
          {imageCount === 1 && (
            <Grid2 size={{ xs: 12 }}>
              {renderImage(images[0], 0, "410px")}
            </Grid2>
          )}

          {imageCount === 2 && (
            <>
              <Grid2 size={{ xs: 12, md: 6 }}>
                {renderImage(images[0], 0, "410px")}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                {renderImage(images[1], 1, "410px")}
              </Grid2>
            </>
          )}

          {imageCount === 3 && (
            <>
              <Grid2 size={{ xs: 12, md: 6 }}>
                {renderImage(images[0], 0, "410px")}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12 }}>{renderImage(images[1], 1)}</Grid2>
                  <Grid2 size={{ xs: 12 }}>{renderImage(images[2], 2)}</Grid2>
                </Grid2>
              </Grid2>
            </>
          )}

          {imageCount === 4 && (
            <>
              <Grid2 size={{ xs: 12, md: 6 }}>
                {renderImage(images[0], 0, "410px")}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    {renderImage(images[1], 1)}
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    {renderImage(images[2], 2)}
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>{renderImage(images[3], 3)}</Grid2>
                </Grid2>
              </Grid2>
            </>
          )}

          {imageCount >= 5 && (
            <>
              <Grid2 size={{ xs: 12, md: 6 }}>
                {renderImage(images[0], 0, "410px")}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Grid2 container spacing={2}>
                  {images.slice(1, 5).map((img, idx) => (
                    <Grid2 size={{ xs: 12, md: 6 }} key={img + idx}>
                      {renderImage(img, idx + 1, "200px")}
                    </Grid2>
                  ))}
                </Grid2>
              </Grid2>
            </>
          )}
        </Grid2>
      ) : (
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>{renderImage(images[0], 0)}</Grid2>
        </Grid2>
      )}

      {/* Modal for Full View */}
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
