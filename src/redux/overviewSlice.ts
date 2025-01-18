import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../constants/endpoints";
import api from "../utils/api";

type ApiStatus = "loading" | "data" | "error" | "nothing";

interface ApiResponse<T> {
  data: T;
}

interface BotOverview {
  data: string;
}

interface BotOverviewState {
  status: ApiStatus;
  botOverview: BotOverview;
}

const initialState: BotOverviewState = {
  status: "nothing",
  botOverview: {
    data: "",
  },
};

export const overviewSlice = createSlice({
  name: "Overview",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<ApiStatus>) => {
      state.status = payload;
    },
    fetchOverview: (state, { payload }: PayloadAction<BotOverview>) => {
      state.botOverview = payload;
    },
  },
});

export const { setStatus, fetchOverview } = overviewSlice.actions;

export const fetchOverviewAsync = () => async (dispatch: any) => {};

export default overviewSlice.reducer;
