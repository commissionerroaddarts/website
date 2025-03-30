import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed

export const useAppState = () => {
  const { user, business, plan } = useSelector((state: RootState) => state);

  return { user, business, plan };
};
