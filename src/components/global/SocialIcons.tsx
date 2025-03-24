import React from "react";
import { Socials } from "../../types/business";
import Image from "next/image";

const SocialIcons = ({ socials }: { socials: Socials }) => {
  return (
    <div className="flex space-x-3 mt-2">
      {socials?.facebook && (
        <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Facebook"
            className="text-white cursor-pointer"
            style={{
              strokeWidth: 0.5,
              filter: "invert(1)",
            }}
            src="/images/social/facebook.svg"
            width={40}
            height={40}
          />
        </a>
      )}
      {socials?.instagram && (
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Instagram"
            className="text-white cursor-pointer"
            src="/images/social/instagram.svg"
            style={{
              strokeWidth: 0.5,
              filter: "invert(1)",
            }}
            width={40}
            height={40}
          />
        </a>
      )}
      {socials?.twitter && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <Image
            alt="X"
            className="text-white cursor-pointer"
            src="/images/social/twitter.svg"
            style={{
              strokeWidth: 0.5,
              filter: "invert(1)",
            }}
            width={40}
            height={40}
          />
        </a>
      )}
      {socials?.youtube && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Youtube"
            className="text-white cursor-pointer"
            src="/images/social/youtube.svg"
            style={{
              strokeWidth: 0.5,
              filter: "invert(1)",
            }}
            width={40}
            height={40}
          />
        </a>
      )}
      {socials?.linkedin && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Linkedin"
            className="text-white  cursor-pointer"
            style={{
              strokeWidth: 0.5,
              filter: "invert(1)",
            }}
            src="/images/social/linkedin.svg"
            width={40}
            height={40}
          />
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
