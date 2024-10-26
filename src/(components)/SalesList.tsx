"use client";
import React from "react";
import { SalesListProps } from "@/types/type";

const SalesList: React.FC<SalesListProps> = ({ salesData }) => {
  return (
    <div className="p-4 bg-white shadow-sm rounded-lg flex-1">
      <h1 className="text-lg font-semibold">Sales</h1>
      <hr className="my-3" />
      <div className="space-y-2">
        {salesData?.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>{item?.userName}</span>
            <span>${Number(item?.total || 0)?.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesList;
