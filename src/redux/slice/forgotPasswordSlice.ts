import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ForgotPasswordState } from "@/types/type";

const initialState: ForgotPasswordState = {
  email: "",
  message: "",
  error: "",
  isLoading: false,
};

export const sendResetEmail = createAsyncThunk(
  "forgotPassword/sendResetEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/forgotpassword", { email });

      return "Password reset email sent. Check your inbox.";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password reset failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetEmail?.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
