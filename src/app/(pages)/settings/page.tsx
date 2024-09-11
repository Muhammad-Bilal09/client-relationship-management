"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

import toast from "react-hot-toast";
import { logoutUser } from "@/redux/slice/authSlice";
import {
  setNewName,
  setNewEmail,
  setCurrentPassword,
  setNewPassword,
  setProfileImg,
  toggleProfileModal,
  togglePasswordModal,
  updateProfile,
  changePassword,
  uploadUserImage,
} from "@/redux/slice/settingsSlice";
import { useRouter } from "next/navigation";
import ProfileSection from "@/(components)/ProfileSection";
import ProfileModal from "@/(components)/ProfileModal";
import PasswordModal from "@/(components)/PasswordModal";

const SettingsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const {
    newName,
    newEmail,
    currentPassword,
    newPassword,
    profileImg,
    isProfileModalOpen,
    isPasswordModalOpen,
  } = settings;
  const user = session?.user;

  if (!user) {
    return (
      <p className="flex justify-center">
        You need to sign in to view this page.
      </p>
    );
  }

  const handleUploadSuccess = async (result: any) => {
    try {
      const image = result.info ? result.info.secure_url : null;
      const userId = user.id;

      if (userId && image) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("image", image);

        await dispatch(uploadUserImage(formData)).unwrap();

        dispatch(setProfileImg(image));
        toast.success("Profile image updated successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleSaveProfile = async () => {
    const userId = user?.id;
    if (!userId) return;

    try {
      await dispatch(updateProfile({ userId, newName })).unwrap();
      dispatch(toggleProfileModal(false));
      toast("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Error updating profile");
    }
  };

  const handleSavePassword = async () => {
    const userId = user?.id;
    if (!userId) return;

    try {
      await dispatch(
        changePassword({ userId, currentPassword, newPassword })
      ).unwrap();
      dispatch(togglePasswordModal(false));
      toast("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      toast("Error updating password");
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      router.push("/signup");
      toast("Logged out successfully");
    } else {
      toast(result.error?.message || "Error logging out");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-10">
        <p className="text-2xl font-semibold mb-6">Settings Page</p>
        <div className="w-full max-w-screen-lg">
          <ProfileSection
            user={{
              name: user.name || "Guest",
              email: user.email || "Guest@gmail.com",
              image: user.image || "",
              id: user.id,
            }}
            profileImg={profileImg}
            handleUploadSuccess={handleUploadSuccess}
            handleLogout={handleLogout}
            openProfileModal={() => dispatch(toggleProfileModal(true))}
            openPasswordModal={() => dispatch(togglePasswordModal(true))}
          />
        </div>

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => dispatch(toggleProfileModal(false))}
          newName={newName}
          // newEmail={newEmail}
          setNewName={(value: any) => dispatch(setNewName(value))}
          // setNewEmail={(value: any) => dispatch(setNewEmail(value))}
          onSave={handleSaveProfile}
        />

        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => dispatch(togglePasswordModal(false))}
          currentPassword={currentPassword}
          newPassword={newPassword}
          setCurrentPassword={(value: any) =>
            dispatch(setCurrentPassword(value))
          }
          setNewPassword={(value: any) => dispatch(setNewPassword(value))}
          onSave={handleSavePassword}
        />
      </div>
    </>
  );
};

export default SettingsPage;
