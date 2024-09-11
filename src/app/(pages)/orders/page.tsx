"use client";
import React from "react";
import CartItemsTable from "@/(components)/CartItemsTable";
import CartSummary from "@/(components)/CartSummary";
import OrderSummary from "@/(components)/OrderSummary";

const CartPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row p-5">
        <div className="flex-1">
          <CartItemsTable />
        </div>
        <div className="lg:w-1/3 lg:ml-5 mt-5 lg:mt-0">
          <CartSummary />
        </div>
      </div>
      <div className="mt-5 lg:ml-5">
        <OrderSummary />
      </div>
    </>
  );
};

export default CartPage;
