"use client";

import React from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CldUploadWidget } from "next-cloudinary";
import { ProfileSectionProps } from "@/types/type";

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  handleUploadSuccess,
  handleLogout,
  openProfileModal,
  openPasswordModal,
}) => (
  <div className="bg-white shadow-lg rounded-lg mx-10 p-6">
    <div className="flex justify-between">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
      <button
        onClick={handleLogout}
        className="bg-purple text- px-6 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>

    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
          <img
            src={user?.image || "/default-avatar.png"}
            className="rounded-full  object-cover"
          />
        </div>
        <CldUploadWidget uploadPreset="crmweb" onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="absolute bottom-0 right-0 bg-purple text-white p-2 rounded-full cursor-pointer shadow-md"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          )}
        </CldUploadWidget>
      </div>
      <p className="text-center text-lg font-medium text-gray-700 mb-2">
        {user?.name}
      </p>
      <p className="text-center text-sm text-gray-500 mb-4">{user?.email}</p>

      <div className="flex">
        <button
          onClick={openProfileModal}
          className="bg-purple text-white px-6 py-2 rounded-lg "
        >
          Edit Profile
        </button>
        <button
          onClick={openPasswordModal}
          className="bg-purple text-white px-6 py-2 rounded-lg  ml-4"
        >
          Change Password
        </button>
      </div>
    </div>
  </div>
);

export default ProfileSection;
