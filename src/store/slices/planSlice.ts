import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "@/types/plan";

interface PlanState {
  selectedPlan: Plan | null;
  promoCode: string;
}

const initialState: PlanState = {
  selectedPlan: null,
  promoCode: "",
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
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
    clearPromoCode: (state) => {
      state.promoCode = "";
    },
  },
});

export const { selectPlan, clearPlan } = planSlice.actions;
export default planSlice.reducer;
