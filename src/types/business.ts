interface Location {
  geotag?: {
    lat: number;
    lng: number;
  };
  state?: string;
  city?: string;
  country?: string;
  zipcode?: string;
}

interface Timings {
  open: string;
  close: string;
}

interface Socials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

interface Price {
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
  timings?: {
    mon?: Timings;
    tue?: Timings;
    wed?: Timings;
    thu?: Timings;
    fri?: Timings;
    sat?: Timings;
    sun?: Timings;
  };
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
