import React from "react";

export default function page() {
  return (
    <div>
      <nav className="bg-white px-5">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex">
            <a className="flex text-black hover:text-gray-300">
              <img
                className="w-20 rounded-full"
                src="https://www.shutterstock.com/shutterstock/photos/692083606/display_1500/stock-vector-customer-care-service-logo-template-692083606.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="flex space-x-4">
            <div className="hidden md:flex">
              <a className="flex text-black hover:text-gray-300 cursor-pointer">
                Dashboard
              </a>
            </div>
            <div className="hidden md:flex">
              <a href="" className="flex text-black hover:text-gray-300">
                Customers
              </a>
            </div>
            <div className="hidden md:flex">
              <a href="" className="flex text-black hover:text-gray-300">
                Order Overview
              </a>
            </div>
            <div className="hidden md:flex">
              <a className="text-black hover:text-gray-300 cursor-pointer">
                Analytics
              </a>
            </div>
            <div className="hidden md:flex">
              <a className="text-black hover:text-gray-300 cursor-pointer">
                Documents
              </a>
            </div>
          </div>
          <div>
            <button className="bg-green-600 rounded-2xl p-2 hover:bg-green-400 mx-3 w-24">
              Signup
            </button>
            <button className="bg-red-600 rounded-2xl p-2 hover:bg-red-400 w-24">
              Signin
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
