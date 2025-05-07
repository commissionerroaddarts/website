import React from "react";
import { Socials } from "@/types/business";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";

const TiktokIcon = (props: any) => (
  <SvgIcon {...props}>
    {/* TikTok SVG path (simplified) */}
    <path d="M12 2v3.5c1.2.7 2.6 1 4 1V10c-1.4 0-2.8-.3-4-1v7a4 4 0 1 1-4-4h1.5a2.5 2.5 0 1 0 2.5 2.5V2h1Z" />
  </SvgIcon>
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
        <a href={socials.tiktok} target="_blank" rel="noopener noreferrer">
          <TiktokIcon
            sx={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
            }}
          />
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
