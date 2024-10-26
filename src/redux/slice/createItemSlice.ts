import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemState } from "@/types/type";

const initialState: ItemState = {
  items: [],
  status: "idle",
  error: null,
};

export const createItem = createAsyncThunk(
  "items/create",
  async (itemData: any) => {
    const response = await axios.post("/api/createItem", itemData);
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  "items/update",
  async (itemData: any) => {
    const response = await axios.put("/api/updateItem", itemData);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "items/delete",
  async (itemId: string) => {
    const response = await axios.delete("/api/deleteItem", {
      data: { id: itemId },
    });
    return response.data;
  }
);

const createItemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state?.items?.findIndex(
          (item) => item?.id === action?.payload?.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state?.items?.filter(
          (item) => item?.id !== action?.payload?.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default createItemSlice.reducer;
