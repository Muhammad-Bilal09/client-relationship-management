import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { clearCart } from "./cartSlice";
import { OrderState, Orders } from "@/types/type";

const initialState: OrderState = {
  userDetails: {
    name: "",
    email: "",
    address: "",
    phone: "",
  },
  selectedCountry: "",
  orderDetails: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk<Orders[]>(
  "order/fetchOrders",
  async () => {
    const response = await axios.get("/api/getOrder");
    return response.data;
  }
);

export const createOrder = createAsyncThunk<Orders, Orders>(
  "order/createOrder",
  async (order, { getState, dispatch }) => {
    const state = getState() as { order: OrderState };
    const { name, email, address, phone } = state.order.userDetails;

    if (!name || !email || !address || !phone) {
      toast.error("Please enter all user details");
      throw new Error("Missing user details");
    }

    try {
      const response = await axios.post("/api/createOrder", order);
      dispatch(clearCart());
      toast.success("Order saved successfully");
      return response.data;
    } catch (error) {
      toast.error("Error saving order");
      throw error;
    }
  }
);

export const deleteOrder = createAsyncThunk<number, number>(
  "order/deleteOrder",
  async (id) => {
    try {
      await axios.delete("/api/deleteOrder", { data: { id } });
      toast.success("Order deleted successfully");
      return id;
    } catch (error) {
      toast.error("Error deleting order");
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserDetails: (
      state,
      action: PayloadAction<Partial<OrderState["userDetails"]>>
    ) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    clearOrder: (state) => {
      state.orderDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Orders[]>) => {
          state.status = "succeeded";
          state.orderDetails = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<Orders>) => {
          state.orderDetails.push(action.payload);
        }
      )
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.orderDetails = state.orderDetails.filter(
            (order) => order.id !== action.payload
          );
        }
      );
  },
});
export const { setUserDetails, setSelectedCountry, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
