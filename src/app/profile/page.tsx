import AccountManagementPage from "@/components/profilepage/AccountManagement";
// import { cookies } from "next/headers";
// import type { Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: { username: string };
// }): Promise<Metadata> {
//   const cookieStore = await cookies();
//   console.log(cookieStore.getAll());
//   const cookieHeader = cookieStore
//     .getAll()
//     .map((c) => `${c.name}=${c.value}`)
//     .join("; ");

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
//     headers: {
//       Cookie: cookieHeader, // forward cookies to the API
//     },
//     cache: "no-store", // disable caching to ensure fresh user data
//   });

//   const user = res.ok ? await res.json() : null;

//   const fallbackDetails = {
//     name: "User",
//     id: "unknown",
//     profileImage: "/images/banners/banner-icon.png",
//   };

//   const name =
//     user?.firstname && user?.lastname
//       ? `${user.firstname} ${user.lastname}`
//       : fallbackDetails.name;

//   const title = `${name}'s Profile - Road Darts`;
//   const description = `View ${name}'s profile details and activity.`;
//   const imgUrl = user?.profileImg ?? fallbackDetails.profileImage;

//   return {
//     title,
//     description,
//     icons: {
//       icon: "/images/favicons/favicon.ico",
//     },
//     openGraph: {
//       title,
//       description,
//       url: `/profile/${user?.username ?? fallbackDetails.id}`,
//       type: "website",
//       images: [
//         {
//           url: imgUrl,
//           width: 800,
//           height: 600,
//           alt: `${title} Logo`,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       site: "@roaddarts",
//       title,
//       description,
//       images: [imgUrl],
//     },
//   };
// }

export default async function UserProfilePage() {
  return <AccountManagementPage />;
}
