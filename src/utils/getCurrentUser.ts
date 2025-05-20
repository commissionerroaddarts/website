// // lib/auth/getCurrentUser.ts
// import { cookies } from "next/headers";
// import { verifyJWT } from "./jwt"; // Your JWT decoder

// export async function getCurrentUser() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value; // or your actual cookie name

//   if (!token) return null;

//   try {
//     const user = await verifyJWT(token); // decode and verify token
//     return user;
//   } catch {
//     return null;
//   }
// }
