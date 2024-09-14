"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchDocuments, createDocument } from "@/redux/slice/documentSlice";
import InputField from "@/(components)/InputField";
import FileInputField from "@/(components)/FileInputField";
import Modal from "@/(components)/DocumentModal ";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  type: "",
  date: "",
  description: "",
  file: null as File | null,
};

export default function CreateDocumentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { documents, loading, error } = useSelector(
    (state: RootState) => state.document
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(initialState);
    setErrorMessage(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState((prevState) => ({ ...prevState, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, type, date, description, file } = formState;

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      toast("Please select a file to upload.");
      return;
    }

    setIsLoading(true);

    try {
      const fileUrl = await uploadFile(file);
      await dispatch(
        createDocument({ title, type, date, description, fileUrl })
      );
      closeModal();
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`/uploads/${file.name}`);
      }, 1000);
    });
  };

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 sm:p-2 md:p-4 lg:p-8">
      <h1 className="flex justify-center text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Create Document
      </h1>

      <button
        onClick={openModal}
        className="flex justify-end text-purple border border-purple hover:underline sm:text-sm md:text-base lg:text-lg"
      >
        Create Document
      </button>

      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-5 min-w-full divide-y divide-gray-200 shadow-md overflow-hidden sm:rounded-lg text-sm sm:text-xs md:text-sm lg:text-base">
              <thead className="bg-gray-50">
                <tr className="text-left uppercase bg-purple text-white">
                  <th className="py-3 px-6 text-xs sm:text-[10px] md:text-sm lg:text-base font-medium">
                    Title
                  </th>
                  <th className="py-3 px-6 text-xs sm:text-[10px] md:text-sm lg:text-base font-medium">
                    Type
                  </th>
                  <th className="py-3 px-6 text-xs sm:text-[10px] md:text-sm lg:text-base font-medium">
                    Date
                  </th>
                  <th className="py-3 px-6 text-xs sm:text-[10px] md:text-sm lg:text-base font-medium">
                    Description
                  </th>
                  <th className="py-3 px-6 text-xs sm:text-[10px] md:text-sm lg:text-base font-medium">
                    File
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents?.map((document: any) => (
                  <tr key={document.id} className="text-gray-600">
                    <td className="py-4 px-6">{document.title}</td>
                    <td className="py-4 px-6">{document.type}</td>
                    <td className="py-4 px-6">
                      {new Date(document.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">{document.description}</td>
                    <td className="py-4 px-6">
                      <a
                        href={document.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View File
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold mb-4">
          Create Document
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            name="title"
            type="text"
            value={formState.title}
            onChange={handleChange}
            required
          />
          <InputField
            label="Type"
            name="type"
            type="text"
            value={formState.type}
            onChange={handleChange}
            required
          />
          <InputField
            label="Date"
            name="date"
            type="date"
            value={formState.date}
            onChange={handleChange}
            required
          />
          <InputField
            label="Description"
            name="description"
            type="textarea"
            value={formState.description}
            onChange={handleChange}
            required
          />
          <FileInputField label="File" onChange={handleFileChange} required />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <button
            type="submit"
            className="mt-4 flex bg-purple text-white px-4 py-2 rounded-md hover:bg-purple-dark sm:w-full md:w-auto lg:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
}