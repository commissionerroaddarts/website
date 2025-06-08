// app/@modal/send-message/[id]/page.tsx
import { SendMessageForm } from "@/components/establishmentpage/SendAMessage";
import { baseUrl } from "@/constants/baseUrl";
import { notFound } from "next/navigation";

export default async function InterceptedSendMessagePage({
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
  return <SendMessageForm id={id} />;
}
