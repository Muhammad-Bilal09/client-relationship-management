import { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "@/types/type";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return {
    items,
    selectedItem,
    isModalOpen,
    error,
    openModal,
    closeModal,
    refreshItems,
  };
};
