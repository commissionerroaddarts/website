import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "@/types/plan";

interface PlanState {
  selectedPlan: Plan | null;
  promoCode: string;
  email: string;
}

const initialState: PlanState = {
  selectedPlan: null,
  promoCode: "",
  email: "",
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    selectPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
    clearPlan: (state) => {
      state.selectedPlan = null;
      state.email = "";
      state.promoCode = "";
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearPromoCode: (state) => {
      state.promoCode = "";
    },
  },
});

export const { selectPlan, clearPlan, setEmail, setPromoCode } =
  planSlice.actions;
export default planSlice.reducer;
