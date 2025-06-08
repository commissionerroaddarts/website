import SendMessageModal from "@/components/establishmentpage/SendAMessage";
import { baseUrl } from "@/constants/baseUrl";
import { generateMetadata } from "@/utils/metaData";
import { notFound } from "next/navigation";
export const metadata = generateMetadata({
  title: "Send a message",
  description: "Send a message to the establishment",
  url: "/send-message",
  image: "/images/rate.png",
});

export default async function SendingBusinessMsgPage({
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

  return <SendMessageModal id={business?._id} />;
}
