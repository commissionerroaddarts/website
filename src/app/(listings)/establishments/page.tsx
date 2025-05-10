import { generateMetadata } from "@/utils/metaData";
import MainEstablishment from "@/components/allestablishmentspage/MainEstablishment";
import { Suspense } from "react";
import Preloader from "@/components/global/Preloader";

export const metadata = generateMetadata({
  title: "Road Darts - Find the Best Establishments",
  description: "Discover top establishments near you with Road Darts",
  url: "/establishments",
  image: "/images/road-darts.png",
});

export default async function AllEstablishmentsPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <MainEstablishment />
    </Suspense>
  );
}
