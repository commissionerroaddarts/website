import SendMessageModal from "@/components/establishmentpage/SendAMessage";
import { generateMetadata } from "@/utils/metaData";
export const metadata = generateMetadata({
  title: "Rate",
  description: "Rate your experience",
  url: "/rate",
  image: "/images/rate.png",
});

export default async function SendingBusinessMsgPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;

  return <SendMessageModal id={id} />;
}
