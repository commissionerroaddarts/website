"use client";
import { Grid } from "@mui/material";
import Image from "next/image";

interface GalleryProps {
  readonly images: string[];
}

export default function EstablishmentGallery({ images }: GalleryProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Image
          src={images[0]}
          alt="Main Image"
          width={400}
          height={200}
          className="w-full object-cover h-[410px]"
        />
      </Grid>
      <Grid item xs={12} md={6} spacing={1}>
        <Grid container spacing={1}>
          {images.slice(1, 5).map((img, index) => (
            <Grid item xs={2} md={6} key={index}>
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
    </Grid>
  );
}
