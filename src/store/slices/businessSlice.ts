import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBusinesses } from "@/services/businessService";
import { ApiResponse } from "@/types/business";

interface BusinessState {
  businesses: ApiResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: BusinessState = {
  businesses: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch Business with pagination
export const fetchBusiness = createAsyncThunk(
  "Business/fetchBusiness",
  async (
    {
      page,
      limit,
      lat,
      lng,
      sort,
    }: {
      page: number;
      limit: number;
      lat?: number;
      lng?: number;
      sort?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchBusinesses(page, limit, { lat, lng, sort });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const BusinessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBusiness.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.businesses = action.payload;
      })
      .addCase(fetchBusiness.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default BusinessSlice.reducer;
