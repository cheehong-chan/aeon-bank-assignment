import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

type PasswordFormProps = {
  loading: boolean;
  onSubmit: (data: { password: string }) => void;
  error: string | null;
};

export default function PasswordForm({
  onSubmit,
  loading,
  error,
}: PasswordFormProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ password });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Input password..."
        disabled={loading}
        onChange={onChange}
      />
      {error && <div className="text-red-500 text-sm mb-1">{error}</div>}
      <Button
        loading={loading}
        disabled={loading || !password}
        type="submit"
        label="Login"
      />
    </form>
  );
}
