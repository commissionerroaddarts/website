"use client";

import { useAppState } from "@/hooks/useAppState";
import { generateMetadata } from "@/utils/metaData";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const UserProfilePage = () => {
  const { user: userObject } = useAppState();
  const { userDetails: user } = userObject;

  const fallbackDetails = {
    name: "User",
    id: "unknown",
    profileImage: "/images/banners/banner-icon.png",
  };

  const name =
    user?.firstname && user?.lastname
      ? `${user.firstname} ${user.lastname}`
      : fallbackDetails.name;

  const metadata = generateMetadata({
    title: `${name}'s Profile - Road Darts`,
    description: `View ${name}'s profile details and activity.`,
    url: `/profile/${user?.username ?? fallbackDetails.id}`,
    image: user?.profileImage ?? fallbackDetails.profileImage,
  });

  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }
  return (
    <>
      <Head>
        <title>
          {typeof metadata.title === "string" ? metadata.title : "Road Darts"}
        </title>
        <meta name="description" content={metadata.description ?? ""} />
        <meta property="og:title" content={metadata.openGraph?.title ?? ""} />
        <meta
          property="og:description"
          content={metadata.openGraph?.description ?? ""}
        />
        <meta property="og:image" content={metadata.openGraph?.images[0].url} />
      </Head>
      <UserProfile user={user} />
    </>
  );
};

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>
        Welcome, {user.firstname} {user.lastname}!
      </h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfilePage;
