import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setUserDetails, setSelectedCountry } from "@/redux/slice/orderSlice";

const CartSummary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart?.items);
  const { userDetails, selectedCountry } = useSelector(
    (state: RootState) => state?.order
  );
  const calculateTotal = () => {
    return cart
      ?.reduce((total, item) => total + item?.price * item?.quantity, 0)
      .toFixed(2);
  };

  const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setUserDetails({ [name]: value }));
  };

  return (
    <div className="lg:w-[100%] overflow-hidden shadow-md rounded-lg border-5 p-5">
      <div className="bg-purple text-white p-3 mb-5">
        <h1 className="text-center font-heading">Cart Total</h1>
      </div>
      <div>
        <h2 className="flex justify-between my-5 text-sm md:text-base">
          <span className="font-heading">Subtotal</span> ${calculateTotal()}
        </h2>
        <hr className="my-5" />
        <div className="relative flex justify-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="rounded-lg border border-black w-full h-10 px-3"
          />
          <button
            type="button"
            className="absolute right-0 top-1 px-4 font-heading font-medium"
          >
            Apply
          </button>
        </div>
        <hr className="my-5" />
        <div className="flex flex-col space-y-4">
          <select
            className="rounded-lg border border-black w-full p-2"
            value={selectedCountry}
            onChange={(e) => dispatch(setSelectedCountry(e?.target?.value))}
          >
            <option value="">COUNTRY</option>
            <option value="PAKISTAN">PAKISTAN</option>
            <option value="INDIA">INDIA</option>
            <option value="USA">USA</option>
          </select>
          <input
            type="text"
            name="name"
            value={userDetails?.name}
            onChange={handleUserDetailChange}
            placeholder="Name"
            className="rounded-lg border border-black w-full p-2"
          />
          <input
            type="email"
            name="email"
            value={userDetails?.email}
            onChange={handleUserDetailChange}
            placeholder="Email"
            className="rounded-lg border border-black w-full p-2"
          />
          <input
            type="text"
            name="address"
            value={userDetails?.address}
            onChange={handleUserDetailChange}
            placeholder="Address"
            className="rounded-lg border border-black w-full p-2"
          />
          <input
            type="text"
            name="phone"
            value={userDetails?.phone}
            onChange={handleUserDetailChange}
            placeholder="Phone"
            className="rounded-lg border border-black w-full p-2"
          />
          <h2 className="text-xl flex justify-between my-5">
            <span>Total</span> ${calculateTotal()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
