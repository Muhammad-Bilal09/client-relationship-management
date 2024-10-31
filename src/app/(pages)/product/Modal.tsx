import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";
import { ModalProps } from "@/types/type";
import { useItemForm } from "./useModal";
import { formFields } from "@/constant/Constant";

const categories = ["Home's Good", "Wooden Co.", "Potterific"];

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  itemToEdit,
  onSave,
}) => {
  const {
    state,
    error,
    imageUrl,
    isEditing,
    handleChange,
    handleSubmit,
    handleDelete,
    handleImageUpload,
  } = useItemForm(itemToEdit, onSave, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 mx-4 my-8 bg-white rounded-lg shadow-lg lg:max-w-xl md:mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Item" : "Create Item"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={state[field.name as keyof typeof state]}
                  onChange={handleChange}
                  step={field.step || undefined}
                  className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={state.category}
                onChange={handleChange}
                className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Image</label>
              <CldUploadWidget
                uploadPreset="crmweb"
                onSuccess={handleImageUpload}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                  >
                    Upload an Image
                  </button>
                )}
              </CldUploadWidget>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="object-cover w-32 h-32 mt-2 rounded-lg"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            )}
            <div className="flex">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded mr-2"
              >
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
          <ToastContainer position="top-center" autoClose={5000} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
