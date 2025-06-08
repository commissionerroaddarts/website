import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed

export const useAppState = () => {
  const user = useSelector((state: RootState) => state.user);
  const business = useSelector((state: RootState) => state.business);
  const plan = useSelector((state: RootState) => state.plan);
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const userLocation = useSelector((state: RootState) => state.userLocation);

  return { user, business, plan, inquiry, wishlist, userLocation };
};
