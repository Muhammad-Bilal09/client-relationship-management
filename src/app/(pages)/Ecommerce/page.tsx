"use client";
import React from "react";
import useStoreItems from "./useEcommerce";
import { IoCartOutline } from "react-icons/io5";

const Page: React.FC = () => {
  const {
    filteredItems,
    categories,
    loading,
    error,
    handleAddToCart,
    handleCategoryChange,
  } = useStoreItems();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between m-10">
        <div className="ml-5">
          <u className="text-blue-600 font-extrabold ml-10 font-heading">
            Products
          </u>
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => handleCategoryChange(null)}
            className="text-blue-600 hover:bg-info rounded-lg mr-3 border border-blue-600 p-2 lg:px-5"
          >
            All
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className="text-blue-600 hover:bg-info rounded-lg mr-3 border border-blue-600 p-2 lg:px-5"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 place-self-center">
        {filteredItems?.map((item) => (
          <div
            key={item?.id}
            className="relative lg:w-[308px] lg:h-[313px] shadow-md mt-5 rounded-[19.67px] border-5 p-5 overflow-hidden group"
          >
            <div className="relative flex justify-center items-center mb-4">
              <img className="w-[187px] h-[173px]" src={item?.image} />
            </div>
            <div className="transition-transform transform group-hover:scale-105 group-hover:opacity-0 duration-300">
              <p className="flex justify-center text-blue-300 font-bold mt-4">
                {item.name.slice(0, 20)}
              </p>
              <p className="flex justify-center font-bold">${item?.price}</p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-48">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center rounded-2xl w-full lg:w-44 font-heading h-12 bg-blue-200 font-bold p-2 lg:p-4"
                >
                  Add to Cart
                  <IoCartOutline className="text-xl bg-yellow-400 ml-2 rounded" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
