"use client";

import { Edit, Trash } from "lucide-react";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";
import { deleteBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import { Box } from "@mui/material";

export default function EstablishmentHeader({
  id,
  name,
  tagline,
  shortDis,
}: Readonly<{
  id: string;
  name: string;
  tagline: string;
  shortDis: string;
}>) {
  const { user } = useAppState();
  const { userDetails } = user;
  const { role } = userDetails || {};
  const isStoreOwner = role === "owner" || role === "admin";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    // Add confirmation dialog if needed
    const confirmed = window.confirm(
      "Are you sure you want to delete this establishment?"
    );
    if (!confirmed) {
      setLoading(false);
      return;
    }
    try {
      // Implement delete functionality here
      // For example, you might call a delete API endpoint
      const response = await deleteBusiness(id);
      if (response.status === 200) {
        toast.success("Establishment deleted successfully");
        router.push("/profile/view-your-listings");
      }
    } catch (error) {
      console.error("Error deleting establishment:", error);
      toast.error("Failed to delete establishment");
      setLoading(false);
    }
  };

  return (
    <div className=" space-y-4">
      <div className="flex flex-col gap-">
        <h1 className="text-white text-3xl font-bold">{name}</h1>
        <p className="text-gray-400 text-sm">{tagline}</p>
      </div>
      <div>
        <h2 className="text-white text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-300">{shortDis}</p>
      </div>
      {isStoreOwner && (
        <Box className="flex gap-2">
          <Link href={`/edit-establishment/${id}`}>
            <ThemeButton
              text="Edit Details"
              endIcon={<Edit className="inline-block ml-1" size={25} />}
            />
          </Link>

          <ThemeButton
            onClick={handleDelete}
            text={loading ? "Deleting" : "Delete"}
            backgroundColor="darkred"
            endIcon={<Trash className="inline-block ml-1" size={25} />}
          />
        </Box>
      )}
    </div>
  );
}
