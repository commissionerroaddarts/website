import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "fastly.4sqi.net" },
      { hostname: "res.cloudinary.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "picsum.photos" },
      { hostname: "media.istockphoto.com" },
      { hostname: "media.gettyimages.com" },
      { hostname: "images.pexels.com" },
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
