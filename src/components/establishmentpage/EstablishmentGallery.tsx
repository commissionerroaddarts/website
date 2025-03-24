"use client";
import { Grid } from "@mui/material";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export default function EstablishmentGallery({ images }: GalleryProps) {
  return (
    <Grid container className="gap-0">
      <Grid item xs={12} md={6}>
        <Image
          src={images[0]}
          alt="Main Image"
          width={400}
          height={200}
          className="w-full object-cover h-[430px]"
        />
      </Grid>
      <Grid container md={6} className="gap-0">
        {images.slice(1, 5).map((img, index) => (
          <Grid item xs={6} key={index}>
            <Image
              src={img}
              alt="Gallery Image"
              width={400}
              height={100}
              className="w-full h-[200px] object-cover"
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
