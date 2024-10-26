import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, PageState } from "@/types/type";

const initialState: PageState = {
  orderDetails: [],
  chartData: { labels: [], dataValues: [] },
  salesData: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("analytical/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios?.get("/api/getOrder");
    return response?.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch orders");
  }
});
const analyticalSlice = createSlice({
  name: "analytical",
  initialState,
  reducers: {
    prepareChartData(state, action: PayloadAction<Order[]>) {
      const labels: string[] = action?.payload?.map((order) => order?.name);
      const dataValues: number[] = action?.payload?.map((order) =>
        order?.items?.reduce((total: number, item: any) => {
          const itemTotal = parseFloat(item?.total);
          return total + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0)
      );
      state.chartData = { labels, dataValues };
    },
    prepareSalesData(state, action: PayloadAction<Order[]>) {
      const salesData = action.payload.map((order) => ({
        userName: order.name || "Unknown User",
        total: order.items.reduce((total: number, item: any) => {
          const itemTotal = parseFloat(item?.total);
          return total + (isNaN(itemTotal) ? 0 : itemTotal);
        }, 0),
      }));
      state.salesData = salesData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orderDetails = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { prepareChartData, prepareSalesData } = analyticalSlice.actions;
export default analyticalSlice.reducer;
