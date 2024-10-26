"use client"
import React from "react";
import ProfitChart from "@/(components)/charts/lineChart/ProfitChart";
import ExpensiveChart from "@/(components)/charts/lineChart/ExpensiveChart";
import CustomerChart from "@/(components)/charts/lineChart/CustomerChart";
import buttonLineChartOne from "../../public/assets/images/buttonLineChartOne.png";
import buttonLineChartTwo from "../../public/assets/images/buttonLineChartTwo.png";
import buttonLineChartThree from "../../public/assets/images/buttonLineChartThree.png";
import tagLineChartOne from "../../public/assets/images/tagLineChartOne.png";
import tagLineChartTwo from "../../public/assets/images/tagLineChartTwo.png";
import tagLineChartThree from "../../public/assets/images/tagLineChartThree.png";
import Image from "next/image";

export default function LineCharts() {
  return (
    <div className="flex flex-wrap gap-2 p-2 mt-5">
      <div className="flex-1 min-w-[190px] max-w-[233px] h-[240px] p-2 bg-card shadow-lg rounded-lg">
        <Image src={buttonLineChartOne} alt="" />
        <h3 className="text-lg font-semibold mt-3 mb-3">Profit Chart</h3>
        <span className="flex mb-3 justify-between">
          <p>3,300.00</p>
          <Image src={tagLineChartOne} alt="" />
        </span>

        <ProfitChart />
      </div>

      <div className="flex-1 min-w-[190px] max-w-[233px] h-[240px] p-2 bg-card shadow-lg rounded-lg">
        <Image src={buttonLineChartTwo} alt="" />
        <h3 className="text-lg font-semibold mt-3 mb-3">Expensive Chart</h3>
        <span className="flex mb-3 justify-between">
          <p>3,300.00</p>
          <Image src={tagLineChartTwo} alt="" />
        </span>

        <ExpensiveChart />
      </div>

      <div className="flex-1 min-w-[190px] max-w-[233px] h-[240px] p-2 bg-card shadow-lg rounded-lg">
        <Image src={buttonLineChartThree} alt="" />
        <h3 className="text-lg font-semibold mt-3 mb-3">Customer Chart</h3>
        <span className="flex mb-3 justify-between">
          <p>3,300.00</p>
          <Image src={tagLineChartThree} alt="" />
        </span>

        <CustomerChart />
      </div>
    </div>
  );
}
