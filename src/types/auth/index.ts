export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface PreCheckoutFormData {
  email: string;
  promoCode: string;
}
