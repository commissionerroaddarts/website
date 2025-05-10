import { Inquiry } from "@/types/contactUs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InquiryState {
  inquiryData: Inquiry | null;
}

const initialState: InquiryState = {
  inquiryData: null,
};

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    setInquiryData: (state, action: PayloadAction<Inquiry>) => {
      state.inquiryData = action.payload;
    },
    clearInquiryData: (state) => {
      state.inquiryData = null;
    },
  },
});

export const { setInquiryData, clearInquiryData } = inquirySlice.actions;
export default inquirySlice.reducer;
