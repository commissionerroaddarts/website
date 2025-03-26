import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "picsum.photos",
      "media.istockphoto.com",
      "media.gettyimages.com",
      "images.pexels.com",
    ],
  },
};

export default nextConfig;
