import { generateMetadata } from "@/utils/metaData";
import PlanGrid from "@/components/planpage/PlanGrid";
import { getPlans } from "@/services/planService";

export const metadata = generateMetadata({
  title: "Plans - Road Darts",
  description:
    "Choose the best plan for your needs and get started with Road Darts.",
  url: "/plans",
  image: "/images/banners/banner-icon.png",
});

export default async function PlanPage() {
  const plans = await getPlans(); // Fetch plans from your service
  return <PlanGrid plans={plans} />;
}
