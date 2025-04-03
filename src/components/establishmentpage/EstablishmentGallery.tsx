"use client";
import { Grid2 } from "@mui/material";
import Image from "next/image";

interface GalleryProps {
  readonly images: string[];
}

export default function EstablishmentGallery({ images }: GalleryProps) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Image
          src={images[0]}
          alt="Main Image"
          width={400}
          height={200}
          className="w-full object-cover h-[410px]"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} spacing={1}>
        <Grid2 container spacing={1}>
          {images.slice(1, 5).map((img, index) => (
            <Grid2 size={{ xs: 2, md: 6 }} key={img + index}>
              <Image
                src={img}
                alt="Gallery Image"
                width={400}
                height={100}
                className="w-full h-[200px] object-cover"
              />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
