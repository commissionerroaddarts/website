import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import planReducer from "./slices/planSlice";
import businessReducer from "./slices/businessSlice";
import userReducer from "./slices/userSlice";
import inquiryReducer from "./slices/inquirySlice";
import wishlistReducer from "./slices/wishlistSlice";
import { persistStore } from "redux-persist";

// Combine reducers
const rootReducer = combineReducers({
  plan: planReducer,
  business: businessReducer,
  user: userReducer,
  inquiry: inquiryReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
