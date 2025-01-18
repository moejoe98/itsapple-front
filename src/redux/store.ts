import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { withdrawSlice } from "./withdrawSlice";
import { overviewSlice } from "./overviewSlice";
import { authSlice } from "./authSlice";

export const store = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [overviewSlice.name]: overviewSlice.reducer,
      [withdrawSlice.name]: withdrawSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;

export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type AppDispatch = AppStore["dispatch"];
