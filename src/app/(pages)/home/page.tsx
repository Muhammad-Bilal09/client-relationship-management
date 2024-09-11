import React from 'react';
import UserHeader from '@/(components)/UserHeader';
import GraphsSection from '@/(components)/GraphsSection';
import BestSellingProducts from '@/(components)/BestSellingProducts';
import LineCharts from '@/(components)/LineCharts';
import Table from '@/(components)/table';
import Image from 'next/image';
import homeMap from "../../../../public/assets/images/homeMap.png";

export default function Dashboard() {
  return (
    <>
      <UserHeader />
      <div className="p-4 lg:ml-28 flex flex-col lg:flex-row">
        <div className="flex-1 lg:pr-5">
          <GraphsSection />
          <LineCharts />
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-40 lg:flex-1">
          <BestSellingProducts />
        </div>
      </div>
      <div className="p-4 flex flex-col lg:flex-row lg:ml-28">
        <div className="flex-1 lg:pr-5">
          <Table />
        </div>
        <div className="mt-4 border bg-card lg:mt-0 lg:flex-1">
          <p className='p-4'>city order Statistic</p>
          <hr className='my-2' />
          <Image
            src={homeMap}
            alt="Home Map"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}