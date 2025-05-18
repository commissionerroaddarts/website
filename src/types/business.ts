export interface Location {
  geotag?: {
    lat: number;
    lng: number;
  };
  state?: string;
  city?: string;
  country?: string;
  zipcode?: string;
}

export interface LocationError {
  location: {
    geotag?: {
      lat: number;
      lng: number;
    };
    state?: string;
    city?: string;
    country?: string;
    zipcode?: string;
  };
}

// Helper to convert "12:37 PM" to minutes since midnight
export interface Timings {
  mon: { open: string; close: string };
  tue: { open: string; close: string };
  wed: { open: string; close: string };
  thu: { open: string; close: string };
  fri: { open: string; close: string };
  sat: { open: string; close: string };
  sun: { open: string; close: string };
}

export interface FieldErrorTimings {
  timings: {
    mon: { open: string; close: string };
    tue: { open: string; close: string };
    wed: { open: string; close: string };
    thu: { open: string; close: string };
    fri: { open: string; close: string };
    sat: { open: string; close: string };
    sun: { open: string; close: string };
  };
}

export interface Socials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Price {
  category?: "" | "$" | "$$" | "$$$" | "$$$$";
  min?: number | null;
  max?: number | null;
}

export interface Validation {
  date?: Date;
  status?: "Accredited" | "Validated" | "Not Validated";
}

export interface Business {
  _id: string;
  userId: string; // Uncomment if userId is needed
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
  promotion?: {
    title?: string;
    description?: string;
  };
  status?: "Active" | "Closed Down" | "Coming Soon" | "Under Remodel";
  validation?: Validation;
  bordtype?: "Steel Tip" | "Soft Tip" | "Both";
  averageRating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse {
  data: Business[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface FilterValues {
  search?: string | null;
  category?: string | null;
  boardtype?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  agelimit?: number[] | null;
}
