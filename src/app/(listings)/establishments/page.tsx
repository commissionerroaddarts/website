import { generateMetadata } from "@/utils/metaData";
import MainEstablishment from "../../../components/allestablishmentspage/MainEstablishment";

export const metadata = generateMetadata({
  title: "Road Darts - Find the Best Restaurants",
  description: "Discover top restaurants near you with Road Darts",
  url: "/establishments",
  image: "/images/road-darts.png",
});

const AllEstablishmentsPage = async () => {
  return <MainEstablishment />;
};

export default AllEstablishmentsPage;
