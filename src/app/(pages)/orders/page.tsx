"use client";
import React from "react";
import CartItemsTable from "@/(components)/CartItemsTable";
import CartSummary from "@/(components)/CartSummary";
import OrderSummary from "@/(components)/OrderSummary";

const CartPage: React.FC = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:mr-5">
          <CartItemsTable />
        </div>
        <div className="w-full lg:w-1/3 mt-5 lg:mt-0 lg:ml-5">
          <CartSummary />
        </div>
      </div>
      <div className="mt-5 lg:mt-10 w-full lg:w-[900px]">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartPage;
