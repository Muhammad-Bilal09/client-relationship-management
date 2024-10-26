import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
