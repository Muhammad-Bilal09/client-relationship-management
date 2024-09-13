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
    (state: RootState) => state.user.totalCustomers
  );

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="font-bold text-xl">Customers</h1>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <input type="date" className="bg-purple rounded-sm border-0" />
            <UserProfile
              imageSrc={session?.user?.image || ""}
              userName={session?.user?.name || ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <Card
            valueColor="white"
            color="white"
            iconColor="blue-400"
            iconbg="card"
            backgroundColor="bg-gradient-to-b from-[#9A55FF] to-[57.79%] to-[#D355FF]"
            title="Total Customers"
            value={totalCustomers}
          />
          <Card
            valueColor="black"
            color="gray"
            iconColor="white"
            iconbg="blue-400"
            backgroundColor="bg-card"
            title="New Customers"
            value="1,000"
          />
          <Card
            valueColor="black"
            color="gray"
            iconColor="white"
            iconbg="green"
            backgroundColor="bg-card"
            title="Total Members"
            value="8,846"
          />
          <Card
            valueColor="black"
            color="gray"
            iconColor="white"
            iconbg="red-400"
            backgroundColor="bg-card"
            title="Non Members"
            value="834"
          />
        </div>

        <div className="bg-card rounded-lg border flex flex-col sm:flex-row sm:justify-between mt-10">
          <StatisticBar
            title="Desktop User"
            percentage="65%"
            color="bg-blue-400"
            width="300px"
          />
          <StatisticBar
            title="Mobile User"
            percentage="35%"
            color="bg-green"
            width="600px"
          />
        </div>

        <MapSection />

        <Table />
      </div>
    </>
  );
}
