"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/(components)/charts/BarChart";
import { PieComponent } from "@/(components)/charts/pieChartComponent";
import Tag from "../../public/assets/images/tag.png";
import button from "../../public/assets/images/button.png";
import Image from "next/image";
import axios from "axios";

export default function GraphsSection() {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios?.get("/api/getOrder");
        setOrderDetails(response?.data);
      } catch (error) {}
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row mt-10 space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-[160px] h-auto lg:h-60 bg-gradient-to-b from-[#9A55FF] to-[57.79%] to-[#D355FF] p-2 rounded-lg">
        <div className="flex justify-center w-full h-36">
          <PieComponent orderDetails={orderDetails} />
        </div>
        <div className="mt-5 text-center">
          <span className="font-bold text-white">2,040/3,000</span>
          <p className="font-bold text-white">Target Order</p>
        </div>
      </div>
      <div className="w-full border lg:w-[100%]  h-auto lg:h-60 p-2 rounded-lg flex flex-col lg:flex-row bg-card">
        <div className="">
          <p className="mb-3">Monthly Income</p>
          <div className="flex justify-between items-center">
            <span className="font-bold mb-3">$6567.00</span>
            <Image src={Tag} alt="Tag Icon" />
          </div>
          <p className="flex">Compared to the previous month</p>
          <hr className="my-4" />
          <span>Accounting</span>
          <div className="flex justify-between items-center">
            <Image src={button} alt="Button Icon" />
            <p className="text-sm">July 1, 2023 - July 31, 2023</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full lg:w-auto mt-4 lg:mt-0">
          <BarChart orderDetails={orderDetails} />
        </div>
      </div>
    </div>
  );
}
