import React from "react";
import Image from "next/image";
import Bowl from "../../public/assets/images/image-placeholder _- Change image here.png";
import Bowl2 from "../../public/assets/images/image.png";
import Bowl3 from "../../public/assets/images/image-placeholder _- Change image here (1).png";
import Bowl4 from "../../public/assets/images/image (1).png";

const products = [
  { src: Bowl, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl2, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl3, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl4, name: "Ceramic Bowl", price: "$29" },
];

export default function BestSellingProducts() {
  return (
    <div className="p-4 bg-card border rounded-lg shadow-md lg:w-[285px] lg:h-[500px] mt-10">
      <h3 className="text-lg font-semibold text-center">
        Best Selling Products
      </h3>
      <div className="">
        <p className="font-medium text-center">Best Selling Product</p>
        <hr className="my-2" />
        {products.map((product, index) => (
          <div
            className="flex flex-col sm:flex-row justify-between items-center"
            key={index}
          >
            <div className="flex-shrink-0">
              <Image
                src={product.src}
                alt={product.name}
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
            </div>
            <div className="text-center sm:text-left sm:mt-0">
              <p>{product.name}</p>
            </div>
            <div className=" sm:mt-0">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
