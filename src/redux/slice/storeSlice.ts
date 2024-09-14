import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Item, StoreState } from "@/types/type";

const initialState: StoreState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk("store/fetchItems", async () => {
  try {
    const response = await axios.get("/api/getItem");
    return response.data as Item[];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch items");
  }
});

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;

      state.filteredItems =
        action.payload === null
          ? state.items
          : state.items.filter((item) => item.category === action.payload);
    },
    addToCart: (state, action) => {
      // Implement cart addition logic here
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems =
          state.selectedCategory === null
            ? action.payload
            : action.payload.filter(
                (item) => item.category === state.selectedCategory
              );
        const categoriesSet = new Set(
          action.payload.map((item) => item.category)
        );
        state.categories = Array.from(categoriesSet);
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch items";
        state.loading = false;
      });
  },
});

export const { setSelectedCategory, addToCart } = storeSlice.actions;

export default storeSlice.reducer;
