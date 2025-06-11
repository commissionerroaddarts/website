export interface Location {
  geotag?: {
    lat: number;
    lng: number;
  };
  state?: string;
  city?: string;
  country?: string;
  zipcode?: string;
  address?: string; // Optional field for full address
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
  [key: string]: {
    open: string;
    close: string;
  };
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
  _id?: string;
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
  _id: string; // Use string | undefined to handle cases where _id might not be set
  userId: string; // Uncomment if userId is needed
  name: string;
  tagline: string;
  media?: {
    images?: string[]; // Array of image URLs or File objects
    video?: string;
    logo?: string; // Single logo URL or File object
    cover?: string;
  };
  shortDis: string;
  location?: Location;
  phone?: string;
  website?: string;
  timings?: Timings;
  slug?: string; // Slug for SEO-friendly URLs
  socials?: Socials;
  faqs?: FAQ[];
  price?: Price;
  noAgeLimit?: boolean;
  agelimit?: number;
  category: string;
  tags?: string[];
  promotion?: {
    title?: string;
    description?: string;
  };
  amenities?: Amenities;
  status?: "Active" | "Closed Down" | "Coming Soon" | "Under Remodel";
  validation?: Validation;
  bordtype?: "Steel Tip" | "Soft Tip" | "Both";
  averageRating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Amenities {
  wheelchairAccessible: boolean;
  validatedParking: boolean;
  smokingOutsideOnly: boolean;
  outdoorSeating: boolean;
  heatedOutdoorSeating: boolean;
  bikeParking: boolean;
  acceptsCreditCards: boolean;
  freeWiFi: boolean;
  tv: boolean;
  happyHourSpecials: boolean;
  coveredOutdoorSeating: boolean;
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
  bordtype?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  agelimit?: number[] | null;
  lat?: number;
  lng?: number;
  sort?: string;
}
