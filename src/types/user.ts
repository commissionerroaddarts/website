export interface Address {
  state?: string;
  city?: string;
  country?: string;
  zipcode?: string;
}

export interface User {
  _id: string;
  canAdd?: boolean; // Optional field to indicate if the user can add listings
  businessCount?: number; // Optional field to track the number of businesses owned by the user
  firstname: string;
  lastname: string;
  profileImg?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: Date;
  email: string;
  phone: string;
  password: string;
  username?: string;
  address?: Address;
  socials?: Record<string, string>; // Using a Record to represent a Map
  status?: "verified" | "unverified" | "deleted";
  role?: "admin" | "user" | "owner";
  permissions?: {
    maxListings: number;
  };
  subscription?: UserSubscription;
  stripeSubscriptionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSubscription {
  plan: string;
  currentPeriodEnd: number; // assuming it's a UNIX timestamp
  isAutoRenew: boolean;
  status: string;
}

export interface PasswordChange {
  newPassword: string;
  confirmPassword?: string;
}
