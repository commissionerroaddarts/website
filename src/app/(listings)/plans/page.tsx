import { generateMetadata } from "@/utils/metaData";
import PlanGrid from "@/components/planpage/PlanGrid";

export const metadata = generateMetadata({
  title: "Plans - Road Darts",
  description:
    "Choose the best plan for your needs and get started with Road Darts.",
  url: "/plans",
  image: "/images/banners/banner-icon.png",
});

export default async function PlanPage() {
  return <PlanGrid />;
}
