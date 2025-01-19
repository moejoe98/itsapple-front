import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../constants/endpoints";
import api from "../utils/api";

type ApiStatus = "loading" | "data" | "error" | "nothing";

interface ApiResponse<T> {
  data: T;
}

interface Chain {
  chainName: string;
  chain: string;
  withdrawalMinFee: number;
  enabled: boolean;
}

interface Withdraw {
  id: number;
  clientPhone: string;
  direction: string;
  clientWallet: string;
  usdtAmount: number;
  profit: number;
  chainFee: number;
  receivedAmount: number;
  givenAmount: number;
  chain: string;
  createdAt: string;
}

interface WithdrawState {
  status: ApiStatus;
  withdraws: Withdraw[];
  balance: number;
  chains: Chain[];
}

const initialState: WithdrawState = {
  status: "nothing",
  withdraws: [],
  balance: 0,
  chains: [],
};

export const sendOtpAsync = createAsyncThunk(
  "withdraws/sendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.send_otp);
      console.log("response", response);

      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to send OTP");
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const withdrawSlice = createSlice({
  name: "Withdraws",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<ApiStatus>) => {
      state.status = payload;
    },
    fetchWithdraws: (state, { payload }: PayloadAction<Withdraw[]>) => {
      state.withdraws = payload;
    },
    createWithdraw: (state, { payload }: PayloadAction<Withdraw>) => {
      state.withdraws = [...state.withdraws, payload];
    },
    setWithdrawData: (
      state,
      { payload }: PayloadAction<{ balance: number; chains: Chain[] }>
    ) => {
      state.balance = payload.balance;
      state.chains = payload.chains.filter((chain) => chain.enabled); // Only enabled chains
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOtpAsync.fulfilled, (state) => {
        state.status = "data";
      })
      .addCase(sendOtpAsync.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setStatus, fetchWithdraws, createWithdraw, setWithdrawData } =
  withdrawSlice.actions;

export const fetchWithdrawsAsync = () => async (dispatch: any) => {
  dispatch(setStatus("loading"));
  try {
    const res = await api.get<ApiResponse<Withdraw[]>>(endpoints.get_withdraws);
    dispatch(fetchWithdraws(res.data.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export const createWithdrawAsync = createAsyncThunk(
  "withdraws/createWithdraw",
  async (withdraw: any, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.create_withdraws, withdraw);

      if (response.status !== 201) {
        throw new Error(response.data?.message || "Failed to create withdraw");
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWithdrawDataAsync = () => async (dispatch: any) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.get<{
      data: { balance: number; chains: Chain[] };
    }>(endpoints.get_withdraw_data);

    if (response.status === 200) {
      dispatch(
        setWithdrawData({
          balance: response.data.data.balance,
          chains: response.data.data.chains,
        })
      );
      dispatch(setStatus("data"));
    } else {
      throw new Error("Failed to fetch withdraw data");
    }
  } catch (error: any) {
    console.error("Error fetching withdraw data:", error);
    dispatch(setStatus("error"));
  }
};

export default withdrawSlice.reducer;
