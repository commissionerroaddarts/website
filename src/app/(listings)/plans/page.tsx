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

export const revalidate = 300; // Cache the page for 60 seconds

export const PlanPage = async () => {
  const plans = await getPlans(); // Fetch plans from your service
  return <PlanGrid plans={plans} />;
};

export default PlanPage;
