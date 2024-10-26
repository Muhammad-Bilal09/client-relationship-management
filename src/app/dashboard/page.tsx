"use client";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { BsPeople, BsCart2 } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { CiSettings, CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSidebar } from "./useDashboard";
import Home from "../(pages)/home/page";
import ProductPage from "../(pages)/product/page";
import StorePage from "../(pages)/Ecommerce/page";
import Customers from "../(pages)/customers/page";
import OrderOverview from "../(pages)/overview/page";
import Analytics from "../(pages)/analytical/page";
import Documents from "../(pages)/documents/page";
import Order from "../(pages)/orders/page";
import Settings from "../(pages)/settings/page";

export default function Page() {
  const {
    currentPage,
    ecommerceDropdown,
    sidebarOpen,
    handlePageClick,
    toggleSidebar,
    toggleEcommerceDropdown,
    handleLogout,
  } = useSidebar();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full bg-white shadow-md md:hidden flex items-center justify-between p-4">
        <h2 className="text-2xl font-semibold">
          swift<span className="text-purple">CRM</span>
        </h2>
        <button onClick={toggleSidebar} className="text-purple-600">
          <IoReorderThreeOutline className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transition-transform z-50 transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-56 w-56 lg:w-[220px] rounded-[8px] md:relative md:translate-x-0 lg:ml-[72px] lg:mt-[22px] lg:mr-[29px] lg:h-[752px]`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            swift<span className="text-purple">CRM</span>
          </h2>
          <button className="md:hidden" onClick={toggleSidebar}>
            <IoReorderThreeOutline className="text-purple-600 w-6 h-6" />
          </button>
        </div>

        <nav className="px-2 py-4">
          <p className="text-gray-400 mb-5">GENERAL</p>
          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("home")}
          >
            <RxDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>

          <div className="relative">
            <button
              className="flex items-center py-3 px-4 text-sm w-full hover:bg-lightPurple hover:text-purple-600 transition-colors"
              onClick={toggleEcommerceDropdown}
            >
              <IoStorefrontOutline className="w-5 h-5 mr-3 text-purple-600" />
              Ecommerce
              <span
                className={`ml-auto transition-transform ${
                  ecommerceDropdown ? "rotate-180" : "rotate-0"
                }`}
              >
                <IoMdArrowDropdown className="w-5 h-5 text-purple-600" />
              </span>
            </button>
            {ecommerceDropdown && (
              <div className="w-full mt-2 rounded-md bg-white shadow-md">
                <Link
                  href="#"
                  className="flex justify-between items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white transition-colors"
                  onClick={() => handlePageClick("product")}
                >
                  Product
                  <IoMdAdd className="w-5 h-5 text-purple-600" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white transition-colors"
                  onClick={() => handlePageClick("store")}
                >
                  <IoStorefrontOutline className="w-5 h-5 mr-3 text-purple-600" />
                  Store
                </Link>
              </div>
            )}
          </div>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("customers")}
          >
            <BsPeople className="w-5 h-5 mr-2" />
            Customers
          </Link>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("orders")}
          >
            <BsCart2 className="w-5 h-5 mr-2" />
            Order Overview
          </Link>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("analytics")}
          >
            <TbBrandGoogleAnalytics className="w-5 h-5 mr-2" />
            Analytical
          </Link>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("documents")}
          >
            <HiOutlineDocumentText className="w-5 h-5 mr-2" />
            Documents
          </Link>

          <p className="my-5">SUPPORT</p>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("order")}
          >
            <BsCart2 className="w-5 h-5 mr-2" />
            Order
          </Link>

          <Link
            href="#"
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
            onClick={() => handlePageClick("settings")}
          >
            <CiSettings className="w-5 h-5 mr-2" />
            Settings
          </Link>

          <Link
            href="#"
            onClick={() => handleLogout()}
            className="flex items-center py-3 px-4 text-sm hover:bg-lightPurple hover:text-white"
          >
            <CiLogout className="w-5 h-5 mr-2" />
            Log out
          </Link>
        </nav>
      </div>

      <div className={`flex-1 p-5 transition-all duration-300`}>
        {currentPage === "home" && <Home />}
        {currentPage === "product" && <ProductPage />}
        {currentPage === "store" && <StorePage />}
        {currentPage === "customers" && <Customers />}
        {currentPage === "orders" && <OrderOverview />}
        {currentPage === "analytics" && <Analytics />}
        {currentPage === "documents" && <Documents />}
        {currentPage === "order" && <Order />}
        {currentPage === "settings" && <Settings />}
      </div>
    </div>
  );
}
