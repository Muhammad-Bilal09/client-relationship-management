import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";
import { ModalProps } from "@/types/type";
import { useItemForm } from "./useModal";

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

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Price", name: "price", type: "number", step: "0.01" },
    {
      label: "Purchasing Price",
      name: "purchasingPrice",
      type: "number",
      step: "0.01",
    },
  ];

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

// import { useState, FormEvent, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import {
//   createItem,
//   updateItem,
//   deleteItem,
// } from "@/redux/slice/createItemSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CldUploadWidget } from "next-cloudinary";
// import { ModalProps } from "@/types/type";
// import axios from "axios";

// const initialValues = {
//   quantity: "",
//   name: "",
//   price: "",
//   category: "",
//   image: "",
//   purchasingPrice: "",
// };

// const categories = ["Home's Good", "Wooden Co.", "Potterific"];

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   itemToEdit,
//   onSave,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [state, setState] = useState(initialValues);
//   const [error, setError] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const isEditing = !!itemToEdit;

//   useEffect(() => {
//     if (itemToEdit) {
//       setState({
//         quantity: itemToEdit.quantity.toString(),
//         name: itemToEdit.name,
//         price: itemToEdit.price.toString(),
//         category: itemToEdit.category,
//         image: itemToEdit.image || "",
//         purchasingPrice: itemToEdit.purchasingPrice?.toString() || "",
//       });
//       setImageUrl(itemToEdit.image || "");
//     } else {
//       setState(initialValues);
//       setImageUrl("");
//     }
//   }, [itemToEdit]);

//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = event.target;

//     if (type === "file") {
//       const input = event.target as HTMLInputElement;
//       setImageFile(input.files ? input.files[0] : null);
//     } else {
//       setState({ ...state, [name]: value });
//     }
//   };

//   const handleImageUpload = (result: any) => {
//     setImageUrl(result.info.secure_url);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("image", imageFile);

//         const uploadResponse = await axios.post("/api/uploadImage", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast("Image uploaded");
//         setImageUrl(uploadResponse.data.imageUrl);
//       }

//       const payload = {
//         ...state,
//         image: imageUrl || state.image,
//       };

//       if (isEditing) {
//         await dispatch(updateItem({ id: itemToEdit?.id, ...payload }));
//       } else {
//         await dispatch(createItem(payload));
//       }

//       onSave();
//       onClose();
//     } catch (error: any) {
//       console.error("Error details:", error);
//       if (error.response) {
//         setError(
//           `Error: ${error.response.status} ${error.response.data.message}`
//         );
//       } else if (error.request) {
//         setError("No response received from server");
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     }
//   };

//   const handleDelete = async () => {
//     if (itemToEdit) {
//       try {
//         await dispatch(deleteItem(itemToEdit?.id));
//         toast("Item deleted successfully");
//         onSave();
//         onClose();
//       } catch (error: any) {
//         console.error("Error details:", error);
//         if (error.response) {
//           setError(
//             `Error: ${error.response.status} ${error.response.data.message}`
//           );
//         } else if (error.request) {
//           setError("No response received from server");
//         } else {
//           setError(`Error: ${error.message}`);
//         }
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="w-full max-w-lg p-6 mx-4 my-8 bg-white rounded-lg shadow-lg lg:max-w-xl md:mx-auto">
//         <h2 className="text-xl font-bold mb-4">
//           {isEditing ? "Edit Item" : "Create Item"}
//         </h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={state.name}
//                 onChange={handleChange}
//                 className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={state.quantity}
//                 onChange={handleChange}
//                 className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="price"
//                 value={state.price}
//                 onChange={handleChange}
//                 className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Purchasing Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="purchasingPrice"
//                 value={state.purchasingPrice}
//                 onChange={handleChange}
//                 className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Category</label>
//               <select
//                 name="category"
//                 value={state.category}
//                 onChange={handleChange}
//                 className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm border"
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Image</label>
//               <CldUploadWidget
//                 uploadPreset="crmweb"
//                 onSuccess={handleImageUpload}
//               >
//                 {({ open }) => (
//                   <button
//                     type="button"
//                     onClick={() => open()}
//                     className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
//                   >
//                     Upload an Image
//                   </button>
//                 )}
//               </CldUploadWidget>
//               {imageUrl && (
//                 <img
//                   src={imageUrl}
//                   alt="Uploaded Preview"
//                   className="object-cover w-32 h-32 mt-2 rounded-lg"
//                 />
//               )}
//             </div>
//           </div>
//           <div className="flex justify-between mt-4">
//             {isEditing && (
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="px-4 py-2 text-white bg-red-500 rounded"
//               >
//                 Delete
//               </button>
//             )}
//             <div className="flex">
//               <button
//                 type="submit"
//                 className="px-4 py-2 text-white bg-blue-500 rounded mr-2"
//               >
//                 {isEditing ? "Update" : "Save"}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 text-white bg-gray-500 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//           <ToastContainer position="top-center" autoClose={5000} />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;
