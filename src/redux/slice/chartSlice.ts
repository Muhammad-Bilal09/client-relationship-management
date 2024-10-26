import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartState } from "@/types/type";

const initialState: ChartState = {
  startDate: "2024-08-01",
  endDate: "2024-08-07",
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = chartSlice?.actions;

export default chartSlice.reducer;
