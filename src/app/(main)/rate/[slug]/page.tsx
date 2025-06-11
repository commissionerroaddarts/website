// app/rate/[id]/page.tsx
import RatingForm from "@/components/ratings/RatingForm";
import PastReviews from "@/components/ratings/PastReviews";
import { baseUrl } from "@/constants/baseUrl";
import { getBusinessReviews } from "@/services/ratingService";
import { generateMetadata } from "@/utils/metaData";
import { notFound } from "next/navigation";

export const metadata = generateMetadata({
  title: "Rate",
  description: "Rate your experience",
  url: "/rate",
  image: "/images/rate.png",
});

export default async function RatingPage({
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

  const id = business?._id;

  const reviews = await getBusinessReviews(id, "rating", 1, 3);

  return (
    <div className="min-h-screen bg-purple-900 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <RatingForm
          id={id}
          establishmentName={business.name}
          selectedRating={0}
          submittedReview={reviews?.submittedReview ?? null}
        />
        <PastReviews
          averageRating={business.averageRating}
          reviews={reviews?.data}
          totalReviews={business.totalReviews}
        />
      </div>
    </div>
  );
}
