import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createDocument, fetchDocuments } from "@/redux/slice/documentSlice";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  type: "",
  date: "",
  description: "",
  file: null as File | null,
};

export const useDocumentForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formState, setFormState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

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

  const resetForm = () => {
    setFormState(initialState);
    setErrorMessage(null);
  };

  const uploadFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`/uploads/${file.name}`);
      }, 1000);
    });
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
      resetForm();
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    errorMessage,
    isLoading,
    handleChange,
    handleFileChange,
    handleSubmit,
    resetForm,
  };
};
