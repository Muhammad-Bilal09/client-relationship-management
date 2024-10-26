"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useAnalyticalData } from "./useAnalytical";
import OverallSalesChart from "@/(components)/charts/OverallSale";
import AnalyticalBarChart from "@/(components)/charts/AnalyticalBarChart";
import { AnalyticalPieChart } from "@/(components)/charts/AnalyticalPieChart";
import HorizentalBarChart from "@/(components)/charts/HorizentalBarChart";
import SvgCustomerSalesPerWeek from "@/(components)/customerSalePerWeek";
import SalesList from "@/(components)/SalesList";

const Page: React.FC = () => {
  const { data: session } = useSession();
  const { chartData, salesData, loading, error } = useAnalyticalData();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="font-bold text-lg">Analytical</h1>
        <div className="flex items-center">
          <input type="date" className="bg-purple border rounded-sm p-2" />
          <img
            src={session?.user?.image || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="rounded-full w-10 h-10 ml-3"
          />
          <p className="ml-2">{session?.user?.name}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1 bg-card  border shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Overall Sales</h2>
          <hr className="my-2" />
          <OverallSalesChart
            labels={chartData.labels}
            dataValues={chartData.dataValues}
          />
        </div>
        <div className="flex-1 bg-card  border shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Visitor Statistics</h2>
          <hr className="my-2" />
          <AnalyticalBarChart
            labels={chartData.labels}
            dataValues={chartData.dataValues}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1 bg-card  border shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Source of Purchase</h2>
          <hr className="my-2" />
          <div className="flex justify-center">
            <AnalyticalPieChart />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="flex items-center">
                <span className="inline-block bg-blue-800 w-4 h-4 rounded-full mr-2"></span>{" "}
                Social Media
              </span>
              <span>49%</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="flex items-center">
                <span className="inline-block bg-green-800 w-4 h-4 rounded-full mr-2"></span>{" "}
                Direct Search
              </span>
              <span>35%</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="flex items-center">
                <span className="inline-block bg-red-800 w-4 h-4 rounded-full mr-2"></span>{" "}
                Other
              </span>
              <span>16%</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-card  border shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Sales Per Week</h2>
          <hr className="my-2" />
          <SvgCustomerSalesPerWeek />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1 bg-card  border shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Sales Per Country</h2>
          <hr className="my-2" />
          <HorizentalBarChart />
        </div>

        <div className="flex-1 bg-card border shadow p-4 rounded-lg">
          <SalesList salesData={salesData} />
        </div>
      </div>
    </>
  );
};

export default Page;
