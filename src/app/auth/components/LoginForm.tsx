import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

type LoginFormProps = {
  loading: boolean;
  onSubmit: (data: { username: string }) => void;
  error: string | null;
};

export default function LoginForm({
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ username });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="username"
        type="text"
        label="Username"
        placeholder="Input username..."
        disabled={loading}
        onChange={onChange}
      />
      {error && <div className="text-red-500 text-sm mb-1">{error}</div>}
      <Button
        loading={loading}
        disabled={loading || !username}
        type="submit"
        label="Next"
      />
    </form>
  );
}
