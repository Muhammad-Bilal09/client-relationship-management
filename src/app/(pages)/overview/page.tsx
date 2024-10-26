"use client";
import Image from "next/image";
import WeeklySalesChart from "@/(components)/charts/WeeklySalesChart";
import Table from "@/(components)/table";
import Header from "@/(components)/Header";
import SalesCard from "@/(components)/SalesCard";
import CountrySaleChart from "../../../../public/assets/images/Map with Labels.png";

export default function Page() {
  return (
    <>
      <div className="p-4">
        <Header />

        <div className="flex flex-col lg:flex-row gap-4 mb-5">
          <div className="bg-card shadow-sm rounded-lg flex-1 p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <SalesCard color="blue" label="Product A " value="$27,733.00" />
              <SalesCard color="red" label="Product B " value="$27,733.00" />
              <SalesCard color="purple" label="Product C " value="$27,733.00" />
            </div>

            <div className="h-64 md:h-80 lg:h-96">
              <WeeklySalesChart />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative h-64 md:h-80 lg:h-[400px]">
              <Image
                src={CountrySaleChart}
                alt="Country Sales Chart"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Table />
        </div>
      </div>
    </>
  );
}
