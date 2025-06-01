import React from "react";
import { Socials } from "@/types/business";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

const TiktokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{ color: "white", width: "20px", fill: "white" }}
  >
    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
  </svg>
);

const SocialIcons = ({ socials }: { socials: Socials }) => {
  return (
    <div className="flex space-x-3 mt-2 px-4 pb-8">
      {socials?.facebook && (
        <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
          <FacebookIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
      {socials?.instagram && (
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
      {socials?.twitter && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <TwitterIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
      {socials?.youtube && (
        <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
      {socials?.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
      {socials?.tiktok && (
        <a
          href={socials.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <TiktokIcon />
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
