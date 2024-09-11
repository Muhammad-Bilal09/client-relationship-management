import React from "react";
import Image from "next/image";
import WorldSalesMap from "@/assets/images/Country Sales Statistics.png";

const MapSection = () => (
  <div className="bg-white shadow-sm rounded-lg p-4">
    <h1 className="text-lg md:text-xl mb-3">Country Order Statistic</h1>
    <hr className="my-3" />
    <div className="w-full h-auto">
      <Image
        src={WorldSalesMap}
        alt="World Sales Map"
        layout="responsive"
        className="object-cover"
      />
    </div>
  </div>
);

export default MapSection;
