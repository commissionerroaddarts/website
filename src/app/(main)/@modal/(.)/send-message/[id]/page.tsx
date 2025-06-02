// app/@modal/send-message/[id]/page.tsx
import SendMessageModal from "@/components/establishmentpage/SendAMessage";

export default async function InterceptedSendMessagePage({
  params,
}: {
  readonly params: { id: string };
}) {
  const { id } = await params;
  return <SendMessageModal id={id} />;
}
