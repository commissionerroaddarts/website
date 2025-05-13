import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "fastly.4sqi.net" },
      { hostname: "res.cloudinary.com" },
      { hostname: "picsum.photos" },
      { hostname: "media.istockphoto.com" },
      { hostname: "media.gettyimages.com" },
      { hostname: "images.pexels.com" },
      { hostname: "t3.ftcdn.net" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "www.roaddarts.com" },
      { hostname: "roaddarts.com" },
      { hostname: "www.roaddarts.com" },
      { hostname: "roaddarts.com" },
      { hostname: "api.roaddarts.com" },
      { hostname: "www.google.com" },
      { hostname: "maps.gstatic.com" },
      { hostname: "maps.googleapis.com" },
      { hostname: "www.gstatic.com" },
      { hostname: "fonts.gstatic.com" },
      { hostname: "fonts.googleapis.com" },
      { hostname: "www.shutterstock.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "images.pexels.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "media.istockphoto.com" },
      { hostname: "media.gettyimages.com" },
      { hostname: "cdn.vectorstock.com" },
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
