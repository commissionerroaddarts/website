import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const WISHLIST_STORAGE_KEY = "wishlist";

interface WishlistState {
  items: string[]; // Use string[] for product IDs, adjust type as needed
  businessName: string;
}

const loadWishlist = (): string[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const saveWishlist = (items: string[]) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }
};

const initialState: WishlistState = {
  items: loadWishlist(),
  businessName: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addBusinessDetails(state, action: PayloadAction<string>) {
      state.businessName = action.payload;
    },
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveWishlist(state.items);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((id) => id !== action.payload);
      saveWishlist(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      saveWishlist(state.items);
    },
    setWishlist(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
      saveWishlist(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlist,
  addBusinessDetails,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
