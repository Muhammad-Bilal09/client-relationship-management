import React from "react";
import { FileInputFieldProps } from "@/types/type";

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
        required={required}
      />
    </div>
  );
};

export default FileInputField;
