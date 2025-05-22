import AccountManagementPage from "@/components/profilepage/AccountManagement";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export default async function UserProfilePage() {
  return <AccountManagementPage />;
}
