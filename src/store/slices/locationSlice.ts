import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: string | null;
  country: string | null;
  city: string | null;
  zipcode: string | null;
  address: string | null;
}

const initialState: LocationState = {
  lat: null,
  lng: null,
  loading: false,
  error: null,
  country: null,
  city: null,
  zipcode: null,
  address: null,
};

// Utility functions for localStorage
const STORAGE_KEY = "locationState";

function saveToStorage(state: LocationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function loadFromStorage(): LocationState | undefined {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return undefined;
}

const persistedState = loadFromStorage();

const locationSlice = createSlice({
  name: "location",
  initialState: persistedState || initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.loading = false;
      state.error = null;
      saveToStorage(state);
    },
    setLocationDetails: (
      state,
      action: PayloadAction<{
        country: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
      }>
    ) => {
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.zipcode = action.payload.zipcode;
      state.address = action.payload.address;
      state.loading = false;
      state.error = null;
      saveToStorage(state);
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      saveToStorage(state);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      saveToStorage(state);
    },
  },
});

export const { setLocation, setLoading, setError, setLocationDetails } =
  locationSlice.actions;

export default locationSlice.reducer;
