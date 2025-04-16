// app/rate/[id]/page.tsx
import RatingForm from "@/components/ratings/RatingForm";
import PastReviews from "@/components/ratings/PastReviews";

export default async function RatingPage({
  params,
}: {
  params: Readonly<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-purple-900 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <RatingForm id={id} />
        <PastReviews id={id} />
      </div>
    </div>
  );
}
