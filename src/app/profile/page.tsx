import AccountManagementPage from "@/components/profilepage/AccountManagement";

// export async function generateMetadata(
//   { params }: { params: { username: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const user = await getUserDetailsForServer();

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
//   const imgUrl = user?.profileImage ?? fallbackDetails.profileImage;

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

export async function UserProfilePage() {
  return <AccountManagementPage />;
}

export default UserProfilePage;
