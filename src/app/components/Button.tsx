import { LoaderCircle } from "lucide-react";
import React from "react";

type ButtonProps = {
  loading: boolean;
  disabled: boolean;
  type: "submit" | "button";
  label: string;
};

export default function Button({
  loading,
  disabled,
  type,
  label,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="flex justify-center items-center gap-x-1 w-full rounded bg-gray-600 p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading && <LoaderCircle size={24} className="animate-spin" />}
      <span>{label}</span>
    </button>
  );
}
