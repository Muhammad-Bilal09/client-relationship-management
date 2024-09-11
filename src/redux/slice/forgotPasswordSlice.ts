import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      const response = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return "Password reset email sent. Check your inbox.";
    } catch (error: any) {
      return rejectWithValue(error.message || "Password reset failed");
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetEmail.pending, (state) => {
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
