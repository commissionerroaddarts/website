import { generateMetadata } from "@/utils/metaData";
import { Suspense } from "react";
import Preloader from "@/components/global/Preloader";
import MyEstablishmentsComponent from "@/components/myestablishments/MyEstablishmentsComponent";

export const metadata = generateMetadata({
  title: "Road Darts - Find Your Establishments",
  description: "Discover your top establishments with Road Darts",
  url: "/establishments",
  image: "/images/road-darts.png",
});

export default async function MyEstablishmentsPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <MyEstablishmentsComponent />
    </Suspense>
  );
}
