import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface UserState {
  userDetails: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userDetails: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (
      state,
      action: PayloadAction<UserState["userDetails"]>
    ) => {
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
