"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/types/type";

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/allRegisterUser");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response?.status}`);
        }
        const data = await response?.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getStatusBadge = (status: string | null) => {
    if (status === "online") {
      return (
        <span className="bg-green-500 text-white px-2 py-1 rounded-lg">
          Online
        </span>
      );
    } else if (status === "offline") {
      return (
        <span className="bg-gray-500 text-white px-2 py-1 rounded-lg">
          Offline
        </span>
      );
    } else {
      return (
        <span className="bg-red-500 text-white px-2 py-1 rounded-lg">
          Deactivate
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 shadow-md overflow-hidden sm:rounded-lg">
          <thead className="bg-purple py-3 px-3">
            <tr className="text-left text-white uppercase">
              <th className="py-3 px-3 text-xs font-medium">
                <input type="checkbox" className="mx-1" />
                Customer Name
              </th>
              <th className="py-3 px-3 text-xs font-medium">Email</th>
              <th className="py-3 px-3 text-xs font-medium">Status</th>
              <th className="py-3 px-3 text-xs font-medium">Last Login</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={index} className="text-gray-600">
                <td className="flex items-center py-4 px-6 whitespace-nowrap">
                  <input type="checkbox" className="mx-1" />
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="user image"
                    className="rounded-full w-10 h-10 object-cover mr-2"
                  />
                  {user?.name}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">{user?.email}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {new Date(user?.Date || 0).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
