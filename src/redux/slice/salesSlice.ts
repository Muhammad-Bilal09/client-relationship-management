import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sale,SalesState } from '@/types/type'; 

const initialState: SalesState = {
  monthlySales: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setMonthlySales: (state, action: PayloadAction<Sale[]>) => {
      state.monthlySales = action.payload;
    },
  },
});

export const { setMonthlySales } = salesSlice.actions;
export default salesSlice.reducer;