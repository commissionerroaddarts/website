// app/@modal/rate/[id]/page.tsx
import RatingModal from "@/components/modals/RatingModal";
import { baseUrl } from "@/constants/baseUrl";
import { notFound } from "next/navigation";

export default async function InterceptedRatingPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/businesses/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound(); // Automatically shows the 404 page
  }

  const business = await res.json();

  if (!business || business?.message === "Business not found") {
    return notFound();
  }

  // Render the RatingModal component with the provided slug
  return <RatingModal id={business._id} name={business.name} />;
}
