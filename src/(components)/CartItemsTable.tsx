import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slice/cartSlice";
import { createOrder } from "@/redux/slice/orderSlice";
import toast from "react-hot-toast";

const CartItemsTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart?.items);

  const { userDetails, selectedCountry } = useSelector(
    (state: RootState) => state?.order
  );

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    try {
      const currentDate = new Date()?.toLocaleDateString();

      const aggregatedOrder = {
        id: Date?.now(),
        items: cart?.map((item) => ({
          image: item?.image,
          title: item?.title,
          total: (item?.price * item?.quantity)?.toFixed(2),
        })),
        status: "Pending",
        date: currentDate,
        country: selectedCountry,
        ...userDetails,
      };

      if (!userDetails?.name || !userDetails?.email) {
        toast.error("Please fill in your details before proceeding");
        return;
      }

      dispatch(createOrder(aggregatedOrder));
      toast.success("Order created successfully!");
      handleClearCart();
    } catch (error) {
      toast.error("Failed to proceed with checkout.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-purple text-white">
            <th className="px-4 py-2 text-left text-sm font-medium text-white font-heading">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white font-heading">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white font-heading">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white font-heading">
              Quantity
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white font-heading">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cart?.map((item) => (
            <tr key={item?.id} className="text-sm">
              <td className="px-4 py-2 whitespace-nowrap">
                <img
                  className="w-16 md:w-24 lg:w-32 md:h-24 lg:h-32"
                  src={item?.image}
                  alt="Item Image"
                />
              </td>
              <td className="px-4 py-2">
                {item?.title?.length > 20
                  ? `${item?.title?.slice(0, 20)}...`
                  : item?.title}
              </td>
              <td className="px-4 py-2">${item?.price?.toFixed(2)}</td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      handleUpdateQuantity(item?.id, item?.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    <FaMinus />
                  </button>
                  <p className="px-2">{item?.quantity}</p>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item?.id, item?.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    <FaPlus />
                  </button>
                </div>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleRemoveFromCart(item?.id)}
                  className="bg-red-600 p-2 rounded-lg text-white"
                >
                  <span className="flex items-center">
                    Delete <CiCircleRemove className="ml-1 text-lg" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col md:flex-row justify-between mt-8 space-y-4 md:space-y-0">
        <button
          onClick={() => handleClearCart()}
          className="border-red-600 text-red-600 border rounded-full font-heading p-3 md:w-40 w-full"
        >
          Clear Cart
        </button>
        <button
          onClick={handleProceedToCheckout}
          className="bg-purple text-white font-heading rounded-full p-3 md:w-40 w-full"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItemsTable;
