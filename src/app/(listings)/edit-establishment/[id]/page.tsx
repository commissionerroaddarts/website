import AddEstablishment from "@/components/addestablishment/AddEstablishmentForm";
import { baseUrl } from "@/constants/baseUrl";
import { Business } from "@/types/business";
import React from "react";

export default async function EditAEstablishment({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fetchBusiness = async () => {
    const res = await fetch(`${baseUrl}/businesses/${id}`);
    const data = await res.json();
    return data;
  };

  const business: Business = await fetchBusiness();
  if (!business) {
    return <div>Business not found</div>;
  }

  return <AddEstablishment business={business} isEdit={true} />;
}
