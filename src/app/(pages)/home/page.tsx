import React from "react";
import UserHeader from "@/(components)/UserHeader";
import GraphsSection from "@/(components)/GraphsSection";
import BestSellingProducts from "@/(components)/BestSellingProducts";
import LineCharts from "@/(components)/LineCharts";
import Table from "@/(components)/table";
import Image from "next/image";
import homeMap from "../../../../public/assets/images/homeMap.png";

export default function Dashboard() {
  return (
    <>
      <UserHeader />
      <div className=" flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5">
        <div className="flex-1 lg:w-2/3 space-y-4">
          <GraphsSection />
          <LineCharts />
        </div>
        <div className="space-y-4">
          <BestSellingProducts />
        </div>
      </div>
      <div className=" flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5">
        <div className="flex-1 lg:w-2/3">
          <Table />
        </div>
        <div className="lg:w-1/3 border bg-card flex flex-col items-center space-y-4 p-4">
          <p className="text-lg font-semibold">City Order Statistics</p>
          <hr className="my-2 w-full" />
          <div className="w-full flex justify-center">
            <Image
              src={homeMap}
              alt="Home Map"
              className="w-full h-auto"
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </>
  );
}
