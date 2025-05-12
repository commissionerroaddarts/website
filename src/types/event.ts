import { FAQ, Location, Price, Socials, Timings, Validation } from "./business";

export interface Event {
  _id: number | string;
  // userId: string;  // Uncomment if userId is needed
  name: string;
  tagline: string;
  media?: {
    images?: string[];
    video?: string;
    logo?: string;
  };
  shortDis: string;
  location?: Location;
  phone?: string;
  website?: string;
  timings?: Timings;
  socials?: Socials;
  faqs?: FAQ[];
  price?: Price;
  agelimit?: number;
  category: string;
  tags?: string[];
  status?: "Active" | "Closed Down" | "Coming Soon" | "Under Remodel";
  validation?: Validation;
  bordtype?: "Steel Tip" | "Soft Tip" | "Both";
  averageRating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
