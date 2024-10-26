import React from "react";
import { BsPeople } from "react-icons/bs";
import { CardProps } from "@/types/type";

const Card: React.FC<CardProps> = ({
  iconColor,
  valueColor,
  backgroundColor,
  title,
  value,
  iconbg,
  color,
}) => {
  return (
    <div
      className={`flex items-center justify-center  gap-4 rounded-lg ${backgroundColor} border lg:w-[100%] lg:h-32 p-4`}
    >
      <div className={`bg-${iconbg} rounded-full p-2`}>
        <BsPeople className={`text-${iconColor}`} />
      </div>
      <div className="ml-2">
        <p className={`text-${color}`}>{title}</p>
        <p className={`font-bold mt-1 text-${valueColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default Card;
