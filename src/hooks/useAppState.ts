import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust path if needed

export const useAppState = () => {
  const { user, business, plan, inquiry } = useSelector(
    (state: RootState) => state
  );

  return { user, business, plan, inquiry };
};
