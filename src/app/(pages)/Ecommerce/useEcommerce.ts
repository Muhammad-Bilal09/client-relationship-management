import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems, setSelectedCategory } from "@/redux/slice/storeSlice";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartItem, Item } from "@/types/type";

const useStoreItems = () => {
  const dispatch = useAppDispatch();
  const { items, filteredItems, categories, loading, error } = useAppSelector(
    (state) => state?.store
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddToCart = (item: Item) => {
    const cartItem: CartItem = {
      id: item?.id,
      image: item?.image,
      title: item?.name,
      price: item?.price,
      category: item?.category,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  return {
    items,
    filteredItems,
    categories,
    loading,
    error,
    handleAddToCart,
    handleCategoryChange,
  };
};

export default useStoreItems;
