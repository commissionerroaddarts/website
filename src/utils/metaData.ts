import type { Metadata as NextMetadata } from "next";

interface Metadata extends Omit<NextMetadata, "openGraph" | "twitter"> {
  openGraph?: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  twitter?: {
    card: string;
    site: string;
    title: string;
    description: string;
    images: string[];
  };
}

interface MetadataOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const METADATA_BASE =
  process.env.NEXT_PUBLIC_DOMAIN_NAME ?? "https://www.roaddarts.com"; // ✅ Define outside to avoid circular reference

export const generateMetadata = ({
  title,
  description,
  url,
  image = "/images/logos/road-darts-logo.png",
}: MetadataOptions): Metadata => {
  const fullImageUrl = new URL(image, METADATA_BASE).toString(); // ✅ Convert image URL properly
  const fullPageUrl = new URL(url, METADATA_BASE).toString(); // ✅ Convert page URL properly

  return {
    title,
    description,
    icons: {
      icon: "/images/favicons/favicon.ico",
    },
    openGraph: {
      title,
      description,
      url: fullPageUrl,
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 800,
          height: 600,
          alt: `${title} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@roaddarts",
      title,
      description,
      images: [fullImageUrl],
    },
  };
};
