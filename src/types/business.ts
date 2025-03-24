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

// Helper to convert "12:37 PM" to minutes since midnight
export interface Timings {
  [key: string]: {
    open: string;
    close: string;
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
  category?: "$" | "$$" | "$$$" | "$$$$";
  min?: number;
  max?: number;
}

interface Validation {
  date?: Date;
  status?: "Accredited" | "Validated" | "Not Validated";
}

export interface Business {
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
  category?: string;
  tags?: string[];
  status?: "Active" | "Closed Down" | "Coming Soon" | "Under Remodel";
  validation?: Validation;
  bordtype?: "Steel Tip" | "Plastic" | "Both";
}
