import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader({ size = 24, className = "" }) {
  return <LoaderCircle size={size} className={`animate-spin ${className}`} />;
}
