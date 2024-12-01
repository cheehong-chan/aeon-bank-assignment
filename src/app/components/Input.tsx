import React from "react";

type InputProps = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  type,
  label,
  placeholder,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-y-2 mb-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="text-black p-2 rounded-md disabled:bg-gray-200"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
