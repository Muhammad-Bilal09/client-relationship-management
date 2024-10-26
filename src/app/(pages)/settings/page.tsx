"use client";
import React from "react";
import { useSettings } from "./useSettings";
import ProfileSection from "@/(components)/ProfileSection";
import ProfileModal from "@/(components)/ProfileModal";
import PasswordModal from "@/(components)/PasswordModal";

const SettingsPage = () => {
  const {
    user,
    newName,
    newEmail,
    currentPassword,
    newPassword,
    profileImg,
    isProfileModalOpen,
    isPasswordModalOpen,
    handleUploadSuccess,
    handleSaveProfile,
    handleSavePassword,
    handleLogout,
    openProfileModal,
    closeProfileModal,
    openPasswordModal,
    closePasswordModal,
    setNewNameValue,
    setCurrentPasswordValue,
    setNewPasswordValue,
  } = useSettings();

  if (!user) {
    return (
      <p className="flex justify-center">
        You need to sign in to view this page.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <p className="text-2xl font-semibold mb-6">Settings Page</p>
      <div className="w-full max-w-screen-lg">
        <ProfileSection
          user={{
            name: user?.name || "Guest",
            email: user?.email || "Guest@gmail.com",
            image: user?.image || "",
            id: user?.id,
          }}
          profileImg={profileImg}
          handleUploadSuccess={handleUploadSuccess}
          handleLogout={handleLogout}
          openProfileModal={openProfileModal}
          openPasswordModal={openPasswordModal}
        />
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        newName={newName}
        setNewName={setNewNameValue}
        onSave={handleSaveProfile}
      />

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        currentPassword={currentPassword}
        newPassword={newPassword}
        setCurrentPassword={setCurrentPasswordValue}
        setNewPassword={setNewPasswordValue}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default SettingsPage;
