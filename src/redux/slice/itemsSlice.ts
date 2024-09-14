import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemsState } from '@/types/type';

const initialState: ItemsState = {
  items: [],
  status: 'idle',
};


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    const response = await axios.get('/api/getItem');
    return response.data; 
  } catch (error: any) {
 
    throw new Error(error.response?.data?.message || 'Failed to fetch items');
  }
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
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default itemsSlice.reducer;
