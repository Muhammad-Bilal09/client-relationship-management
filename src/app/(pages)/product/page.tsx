"use client"
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { Item } from "@/types/type";
export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/getItem");
        setItems(response.data);
      } catch (error: any) {
        setError("Failed to fetch items");
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const openModal = (itemToEdit?: Item) => {
    setSelectedItem(itemToEdit || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const refreshItems = async () => {
    try {
      const response = await axios.get("/api/getItem");
      setItems(response.data);
    } catch (error: any) {
      setError("Failed to fetch items");
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
        Item List
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <div className="flex justify-end  mt-4">
          <button
            onClick={() => openModal()}
            className="flex justify-center items-center  text-purple border border-purple hover:underline"
          >
            Create Item
            <FaPlus />
          </button>
        </div>
        <table className="mt-5 min-w-full divide-y divide-gray-200 shadow-md overflow-hidden sm:rounded-lg">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 uppercase bg-purple text-white">
              <th className="py-3 px-6 text-xs font-medium">Image</th>
              <th className="py-3 px-6 text-xs font-medium">Name</th>
              <th className="py-3 px-6 text-xs font-medium">Quantity</th>
              <th className="py-3 px-6 text-xs font-medium">Price</th>
              <th className="py-3 px-6 text-xs font-medium">Category</th>
              <th className="py-3 px-6 text-xs font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="text-gray-600">
                <td className="px-4 py-2 whitespace-nowrap">
                  <img
                    className="w-16 h-14 md:w-24 lg:w-32 lg:h-28"
                    src={item.image}
                    alt="Item Image"
                  />
                </td>
                <td className="py-4 px-6 whitespace-nowrap">{item.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">{item.quantity}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">{item.category}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => openModal(item)}
                    className="text-purple border border-purple hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal(item)}
                    className="text-purple border border-purple ml-2 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        itemToEdit={selectedItem}
        onSave={refreshItems}
      />
    </div>
  );
}
