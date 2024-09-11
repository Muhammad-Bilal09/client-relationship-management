import React from "react";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <h1 className="font-bold text-xl md:text-2xl">Order Overview</h1>
      <div className="flex items-center space-x-3 mt-4 md:mt-0">
        <input type="date" className="bg-purple rounded-sm border-0 p-2" />
        <img
          src={
            session?.user?.image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Ovx01XyuvBxBHQ7r301TrwUhJZH1MaRJZA&s"
          }
          className="rounded-full w-10 h-10 object-cover"
          alt="User Profile"
        />
        <p className="text-sm md:text-base">{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default Header;
