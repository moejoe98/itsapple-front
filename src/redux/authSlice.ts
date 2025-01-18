import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../constants/endpoints";
import { Cookies } from "react-cookie";
import api from "../utils/api";

const cookie = new Cookies();

type ApiStatus = "loading" | "data" | "error" | "nothing";

interface ApiResponse<T> {
  data: T;
}
export interface User {
  id: number;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  user: User;
  access_token: string;
}

export interface UserRes {
  data: Data;
  response: string;
}

export interface UserState {
  status: ApiStatus;
  user?: UserRes;
  access_token?: string;
}

const initialState: UserState = {
  status: "nothing",
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<ApiStatus>) => {
      state.status = payload;
    },
    login: (state, { payload }: PayloadAction<any>) => {
      console.log("here here hereee", payload);

      state.user = payload.user;
      cookie.remove("token");
      cookie.remove("userData");

      cookie.set("token", payload.access_token, {
        path: "/",
        sameSite: "strict",
        secure: true,
      });

      cookie.set("userData", payload.user, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      window.location.href = "/";
    },
  },
});

export const { setStatus, login } = authSlice.actions;

export const LoginAsync = (data: any) => async (dispatch: any) => {
  dispatch(setStatus("loading"));
  try {
    const res = await api.post<ApiResponse<User[]>>(endpoints.login, data);
    console.log(res.data.data);

    dispatch(login(res.data.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export default authSlice.reducer;
