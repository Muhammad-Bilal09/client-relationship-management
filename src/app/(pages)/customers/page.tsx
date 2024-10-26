import React from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/(components)/Card";
import StatisticBar from "@/(components)/StatisticBar";
import UserProfile from "@/(components)/UserProfile";
import MapSection from "@/(components)/MapSection";
import Table from "@/(components)/table";

export default function Page() {
  const { data: session } = useSession();
  const totalCustomers = useSelector(
    (state: RootState) => state?.user?.totalCustomers
  );

  const cardData = [
    {
      valueColor: "white",
      color: "white",
      iconColor: "blue-400",
      iconbg: "card",
      backgroundColor:
        "bg-gradient-to-b from-[#9A55FF] to-[57.79%] to-[#D355FF]",
      title: "Total Customers",
      value: totalCustomers,
    },
    {
      valueColor: "black",
      color: "gray",
      iconColor: "white",
      iconbg: "blue-400",
      backgroundColor: "bg-card",
      title: "New Customers",
      value: "1,000",
    },
    {
      valueColor: "black",
      color: "gray",
      iconColor: "white",
      iconbg: "green",
      backgroundColor: "bg-card",
      title: "Total Members",
      value: "8,846",
    },
    {
      valueColor: "black",
      color: "gray",
      iconColor: "white",
      iconbg: "Red",
      backgroundColor: "bg-card",
      title: "Non Members",
      value: "834",
    },
  ];

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="font-bold text-xl md:text-2xl">Customers</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0">
            <input
              type="date"
              className="bg-purple rounded-sm border-0 px-2 py-1 text-sm sm:text-base"
            />
            <UserProfile
              imageSrc={session?.user?.image || ""}
              userName={session?.user?.name || ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {cardData.map((card, index) => (
            <Card
              key={index}
              valueColor={card.valueColor}
              color={card.color}
              iconColor={card.iconColor}
              iconbg={card.iconbg}
              backgroundColor={card.backgroundColor}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <div className="bg-card rounded-lg border p-4 flex flex-col sm:flex-row sm:justify-between mt-10 space-y-4 sm:space-y-0">
          <StatisticBar
            title="Desktop User"
            percentage="65%"
            color="bg-blue-400"
            width="100%"
          />
          <StatisticBar
            title="Mobile User"
            percentage="35%"
            color="bg-green"
            width="100%"
          />
        </div>

        <div className="mt-10">
          <MapSection />
        </div>

        <div className="mt-10 overflow-x-auto">
          <Table />
        </div>
      </div>
    </>
  );
}
