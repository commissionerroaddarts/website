import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../../types/plan";

interface PlanState {
  selectedPlan: Plan | null;
}

const initialState: PlanState = {
  selectedPlan: null,
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
  },
});

export const { selectPlan, clearPlan } = planSlice.actions;
export default planSlice.reducer;
