import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "fastly.4sqi.net",
      "res.cloudinary.com",
      "images.unsplash.com",
      "picsum.photos",
      "media.istockphoto.com",
      "media.gettyimages.com",
      "images.pexels.com",
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
