// app/rate/[id]/page.tsx
// import RatingForm from "@/components/ratings/RatingForm";
// import PastReviews from "@/components/ratings/PastReviews";
import { generateMetadata } from "@/utils/metaData";
// import { getBusinessReviews } from "@/services/ratingService";

export const metadata = generateMetadata({
  title: "Rate",
  description: "Rate your experience",
  url: "/rate",
  image: "/images/rate.png",
});

export default async function RatingPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  // const reviews = await getBusinessReviews(id, "rating", 1, 3);

  return (
    <div className="min-h-screen bg-purple-900 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* <RatingForm
          id={id}
          establishmentName={reviews?.data[0].business.name}
          selectedRating={0}
          submittedReview={reviews?.submittedReview ?? null}
        />
        <PastReviews
          averageRating={reviews?.averageRating}
          reviews={reviews?.data}
          totalReviews={reviews?.totalReviews}
        /> */}
      </div>
    </div>
  );
}
