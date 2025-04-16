// app/@modal/rate/[id]/page.tsx
import RatingModal from "@/components/modals/RatingModal";

export default async function InterceptedRatingPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const { id } = await params;
  return <RatingModal id={id} />;
}
