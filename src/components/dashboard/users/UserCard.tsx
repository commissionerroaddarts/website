"use client";

import { User } from "@/types/user";
import { Card, Avatar, Tooltip } from "@mui/material";
import { Mail, Phone, MapPin, UserCircle, BadgeCheck } from "lucide-react";
import ThemeButton from "@/components/buttons/ThemeButton";
import { Socials } from "@/types/business";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: Readonly<UserCardProps>) {
  const {
    firstname,
    lastname,
    profileImg,
    email,
    phone,
    role,
    status,
    username,
    address,
    socials,
    subscription,
  } = user;

  const handleSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      case "github":
        return <Github size={18} />;
      default:
        return <Globe size={18} />;
    }
  };

  return (
    <Card className="!bg-[#2a1e2e] text-white rounded-lg overflow-hidden p-3 w-full flex flex-col  items-start md:items-center gap-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar
          src={profileImg ?? undefined}
          alt={firstname + " " + lastname}
          sx={{ width: 80, height: 80 }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold capitalize">
            {firstname} {lastname}
          </h2>
          {status === "verified" && (
            <Tooltip title="Verified User">
              <BadgeCheck size={18} color="#00FF99" />
            </Tooltip>
          )}
        </div>

        {username && <p className="text-sm text-gray-400">@{username}</p>}

        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{email}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <UserCircle size={16} />
            <span className="capitalize">{role}</span>
          </div>

          {address && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>
                {address.city}, {address.state}, {address.country}
              </span>
            </div>
          )}
        </div>

        {subscription && (
          <div className="mt-3 text-sm bg-[#3a2a3e] p-2 rounded-md">
            <p className="font-semibold text-white">Subscription Plan:</p>
            <p className="text-gray-300">{subscription.plan}</p>
            <p className="text-gray-400 text-xs">
              Renewal:{" "}
              {new Date(
                subscription.currentPeriodEnd * 1000
              ).toLocaleDateString()}
            </p>
          </div>
        )}
        {Object.keys(socials ?? {}).length > 0 && (
          <div className="mt-3 flex gap-2">
            {Object.entries(socials ?? {}).map(([platform, url]) => (
              <Tooltip key={platform} title={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {handleSocialIcon(platform)}
                </a>
              </Tooltip>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1 w-full">
        <ThemeButton
          text="View Profile"
          type="button"
          fontSize="0.8rem"
          className="w-full"
        />
        <ThemeButton
          text="Manage User"
          type="button"
          fontSize="0.8rem"
          className="w-full"
        />
      </div>
    </Card>
  );
}
