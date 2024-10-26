import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/slice/authSlice";

export const useSidebar = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("home");
  const [ecommerceDropdown, setEcommerceDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageClick = (pageName: string) => {
    setCurrentPage(pageName);
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleEcommerceDropdown = () => {
    setEcommerceDropdown(!ecommerceDropdown);
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      router?.push("/signin");
    } else {
      toast(result?.error?.message || "Error logging out");
    }
  };

  return {
    currentPage,
    ecommerceDropdown,
    sidebarOpen,
    handlePageClick,
    toggleSidebar,
    toggleEcommerceDropdown,
    handleLogout,
  };
};
