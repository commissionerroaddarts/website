// utils/generateMetadata.ts
export const generateMetadata = ({
  title,
  description,
  url,
  image = "/images/logos/road-darts-logo.png",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) => ({
  title,
  description,
  icon: "/images/logos/road-darts-logo.png",
  openGraph: {
    title,
    description,
    url,
    type: "website",
    images: [
      {
        url: image,
        width: 800,
        height: 600,
        alt: "Road Darts Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@roaddarts",
    title,
    description,
    image,
  },
});
