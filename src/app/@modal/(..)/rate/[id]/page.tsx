// app/@modal/rate/[id]/page.tsx
import LoginModal from "@/components/modals/LoginModal";
import RatingModal from "@/components/modals/RatingModal";
import { useAppState } from "@/hooks/useAppState";

export default async function InterceptedRatingPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const { id } = await params;
  return <RatingModal id={id} />;
}
