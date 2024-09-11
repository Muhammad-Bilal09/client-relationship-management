import React from "react";
import { SalesCardProps } from "@/types/type";

const SalesCard: React.FC<SalesCardProps> = ({ color, label, value }) => (
  <div className="text-sm md:text-base flex items-center">
    <span
      className={`bg-${color}-500 border rounded-full inline-block w-2.5 h-2.5 mr-2`}
    ></span>
    <p>{label}</p>
    <p className="ml-2">{value}</p>
  </div>
);

export default SalesCard;
