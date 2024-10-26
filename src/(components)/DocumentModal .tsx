import React from "react";
import { ModalPropes } from "@/types/type";

const Modal: React.FC<ModalPropes> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white  p-6 rounded-lg shadow-lg">
        {children}
        <button
          type="button"
          onClick={closeModal}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
