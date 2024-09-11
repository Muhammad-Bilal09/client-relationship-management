"use client"
import React from "react";
import UserHeader from "@/(components)/UserHeader";
import GraphsSection from "@/(components)/GraphsSection";
import BestSellingProducts from "@/(components)/BestSellingProducts";
import LineCharts from "@/(components)/LineCharts";
import Table from "@/(components)/table";
export default function Dashboard() {
  return (
    <>
      <UserHeader />
      <div className="flex flex-col lg:flex-row p-4  lg:ml-28">
        <div className="gap-5">
          <GraphsSection />
          <LineCharts />
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-40">
          <BestSellingProducts />
        </div>
      </div>
      <div className="p-4  lg:ml-28">
        <Table />
      </div>
    </>
  );
}
