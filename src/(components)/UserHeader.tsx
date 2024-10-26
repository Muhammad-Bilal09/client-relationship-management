import React from "react";
import { useSession } from "next-auth/react";
export default function UserHeader() {
  const { data: session } = useSession();
  return (
    <div className="px-4 py-2">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center sm:w-auto">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover"
          />
          <div className="m-2 text-center sm:text-left">
            <p className="font-bold text-sm sm:text-base md:text-lg">
              Welcome back,{" "}
              <span className="text-purple">{session?.user?.name}</span>
            </p>
            <span className="text-xs sm:text-sm md:text-base">
              Here are your monthly store updates
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 items-center w-full sm:w-auto">
          <input
            type="text"
            className="border border-purple border-dashed px-3 py-1 rounded-md text-sm sm:text-base w-full sm:w-auto"
            placeholder="Type here"
          />
          <button className="bg-purple text-white px-4 py-1 mt-2 sm:mt-0 ml-2 rounded-md text-sm sm:text-base">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
