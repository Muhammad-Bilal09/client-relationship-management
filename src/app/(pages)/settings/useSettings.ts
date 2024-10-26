import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

export const useSettings = () => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const settings = useSelector((state: RootState) => state?.settings);
  const router = useRouter();

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

  const handleUploadSuccess = async (result: any) => {
    try {
      const image = result?.info ? result?.info?.secure_url : null;
      const userId = user?.id;

      if (userId && image) {
        const formData = new FormData();
        formData?.append("userId", userId);
        formData?.append("image", image);

        await dispatch(uploadUserImage(formData))?.unwrap();

        dispatch(setProfileImg(image));
        toast?.success("Profile image updated successfully");
      }
    } catch (error) {
      toast?.error("Error uploading image");
    }
  };

  const handleSaveProfile = async () => {
    const userId = user?.id;
    if (!userId) return;

    try {
      await dispatch(updateProfile({ userId, newName }))?.unwrap();
      dispatch(toggleProfileModal(false));
      toast("Profile updated successfully");
    } catch (error) {
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

  const openProfileModal = () => dispatch(toggleProfileModal(true));
  const closeProfileModal = () => dispatch(toggleProfileModal(false));

  const openPasswordModal = () => dispatch(togglePasswordModal(true));
  const closePasswordModal = () => dispatch(togglePasswordModal(false));

  const setNewNameValue = (value: string) => dispatch(setNewName(value));
  const setNewEmailValue = (value: string) => dispatch(setNewEmail(value));
  const setCurrentPasswordValue = (value: string) =>
    dispatch(setCurrentPassword(value));
  const setNewPasswordValue = (value: string) =>
    dispatch(setNewPassword(value));

  return {
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
    setNewEmailValue,
    setCurrentPasswordValue,
    setNewPasswordValue,
  };
};
