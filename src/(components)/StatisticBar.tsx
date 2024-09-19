import React from "react";
import { StatisticBarProps } from "@/types/type";

const StatisticBar: React.FC<StatisticBarProps> = ({
  title,
  percentage,
  color,
}) => {
  return (
    <div className="flex flex-col items-center mb-4 sm:mb-0">
      <p className="text-gray-400">{title}</p>
      <span>{percentage}</span>
      <div className={`w-full lg:w-[100%] h-10 ${color} mt-2`}></div>
    </div>
  );
};

export default StatisticBar;
