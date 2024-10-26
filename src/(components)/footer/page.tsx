"use client";
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

export default function page() {
  return (
    <>
      <nav className="bg-card border px-5 py-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold">
                swift <span className="text-purple">CRM</span>
              </h2>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="hidden md:flex">
              <a className="flex text-black hover:text-gray-300">Dashboard</a>
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
              <a className="text-black hover:text-gray-300">Analytical</a>
            </div>
            <div className="hidden md:flex">
              <a href="" className="flex text-black hover:text-gray-300">
                Documents
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="p-4">
              <h2>Crafting Connections,one customer at a time</h2>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex space-x-4">
              <CiFacebook className="bg-purple font-bold  text-white  rounded-full" />
              <CiInstagram className="bg-purple text-white  font-bold rounded-full" />
              <CiTwitter className="bg-purple text-white   font-bold rounded-full" />
            </div>
          </div>
        </div>
        <hr className="my-5 border" />

        <div className="flex justify-between">
          <p>Privacy Police</p>
          <p>
            &copy;2024 All Right Reserved <u>Techloset@gmail.com</u>
          </p>
          <p>Term & Condition</p>
        </div>
      </nav>
    </>
  );
}
