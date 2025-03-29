export interface Address {
  state?: string;
  city?: string;
  country?: string;
  zipcode?: string;
}

export interface User {
  firstname: string;
  lastname: string;
  gender?: "Male" | "Female" | "Other";
  dob?: Date;
  email: string;
  password: string;
  username?: string;
  address?: Address;
  socials?: Record<string, string>; // Using a Record to represent a Map
  status?: "verified" | "unverified" | "deleted";
  role?: "admin" | "user" | "owner";
}
