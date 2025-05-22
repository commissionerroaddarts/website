import ComingSoon from "@/components/fordarterspage/ComingSoon";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "For Darters",
  description:
    "Easy League & Group Boards – Setup in Minutes, Play for Seasons... No Setup Fees, Just Darts! Coming Soon",
  url: "/for-darters",
  image: "",
});

const ForDartersPage = () => {
  return <ComingSoon />;
};
export default ForDartersPage;
