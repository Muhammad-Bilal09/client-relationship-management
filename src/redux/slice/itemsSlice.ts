import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ItemsState } from '@/types/type';


const initialState: ItemsState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk('api/getItem', async () => {
  const response = await fetch('/api/getItem');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default itemsSlice.reducer;