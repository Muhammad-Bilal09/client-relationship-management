import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/type";
import toast from "react-hot-toast";
import { CartStates } from "@/types/type";

const initialState: CartStates = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state?.items?.find(
        (item) => item?.id === action?.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action?.payload?.quantity;
        toast("quantity updated");
      } else {
        state?.items?.push(action?.payload);
        toast("item added to cart");
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state?.items?.find(
        (item) => item?.id === action?.payload?.id
      );
      if (item) {
        item.quantity = action?.payload?.quantity;
        toast("quantity updated");
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state?.items?.filter(
        (item) => item?.id !== action?.payload
      );
      toast("item removed from cart");
    },
    clearCart: (state) => {
      state.items = [];
      toast("cart cleared");
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice?.actions;
export default cartSlice.reducer;
