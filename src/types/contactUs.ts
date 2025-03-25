export interface Inquiry {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
