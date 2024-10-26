import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResetPasswordState } from "@/types/type";

const initialState: ResetPasswordState = {
  password: "",
  confirmPassword: "",
  error: "",
  isLoading: false,
  token: null,
};

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPassword",
  async (
    { token, password }: { token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios?.post("/api/resetPassword", {
        token,
        password,
      });

      return "Password reset successfully";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password reset failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action?.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPassword, setConfirmPassword, setToken, setError } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
