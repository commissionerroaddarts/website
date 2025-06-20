const isProduction = process.env.NODE_ENV === "production";
export const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_TEST_URL;
