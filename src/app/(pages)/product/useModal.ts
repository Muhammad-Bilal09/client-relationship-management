import { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createItem,
  updateItem,
  deleteItem,
} from "@/redux/slice/createItemSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Item } from "@/types/type";

const initialValues = {
  quantity: "",
  name: "",
  price: "",
  category: "",
  image: "",
  purchasingPrice: "",
};

export const useItemForm = (
  itemToEdit: Item | null,
  onSave: () => void,
  onClose: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const isEditing = !!itemToEdit;

  useEffect(() => {
    if (itemToEdit) {
      setState({
        quantity: itemToEdit?.quantity.toString(),
        name: itemToEdit?.name,
        price: itemToEdit?.price?.toString(),
        category: itemToEdit?.category,
        image: itemToEdit?.image || "",
        purchasingPrice: itemToEdit?.purchasingPrice?.toString() || "",
      });
      setImageUrl(itemToEdit?.image || "");
    } else {
      setState(initialValues);
      setImageUrl("");
    }
  }, [itemToEdit]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event?.target;

    if (type === "file") {
      const input = event?.target as HTMLInputElement;
      setImageFile(input?.files ? input?.files[0] : null);
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleImageUpload = (result: any) => {
    setImageUrl(result?.info?.secure_url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const formData = new FormData();
        formData?.append("image", imageFile);

        const uploadResponse = await axios.post("/api/uploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast("Image uploaded");
        setImageUrl(uploadResponse?.data?.imageUrl);
      }

      const payload = {
        ...state,
        quantity: Number(state?.quantity),
        price: Number(state?.price),
        purchasingPrice: state?.purchasingPrice
          ? Number(state?.purchasingPrice)
          : undefined,
        image: imageUrl || state?.image,
      };

      if (isEditing) {
        await dispatch(updateItem({ id: itemToEdit?.id, ...payload }));
      } else {
        await dispatch(createItem(payload));
      }

      onSave();
      onClose();
    } catch (error: any) {
      if (error.response) {
        setError(
          `Error: ${error?.response?.status} ${error?.response?.data?.message}`
        );
      } else if (error?.request) {
        setError("No response received from server");
      } else {
        setError(`Error: ${error?.message}`);
      }
    }
  };

  const handleDelete = async () => {
    if (itemToEdit) {
      try {
        await dispatch(deleteItem(itemToEdit?.Id));
        toast("Item deleted successfully");
        onSave();
        onClose();
      } catch (error: any) {
        if (error?.response) {
          setError(
            `Error: ${error?.response?.status} ${error?.response?.data?.message}`
          );
        } else if (error.request) {
          setError("No response received from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    }
  };

  return {
    state,
    error,
    imageUrl,
    isEditing,
    handleChange,
    handleSubmit,
    handleDelete,
    handleImageUpload,
  };
};
