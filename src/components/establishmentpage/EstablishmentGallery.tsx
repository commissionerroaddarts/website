"use client";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export default function EstablishmentGallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <Image
          src={images[0]}
          alt="Main Image"
          width={600}
          height={400}
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-rows-3 gap-2">
        {images.slice(1, 5).map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Gallery Image ${index + 1}`}
            width={200}
            height={120}
            className="rounded-lg w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}
