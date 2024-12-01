"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import VerifyForm from "./components/VerifyForm";
import PasswordForm from "./components/PasswordForm";
import { hashPassword } from "./lib/hashPassword";
import { useRouter } from "next/navigation";
import { getSecureWord, login } from "@/services/auth";

type FormData = {
  username: string;
  secureWord: string;
  password: string;
};

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    secureWord: "",
    password: "",
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.push("/");
    }
  };

  const onSubmitLoginForm = async (data: { username: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getSecureWord(data.username);
      const secureWord = res.data.secureWord || "";
      setFormData({
        ...formData,
        secureWord: secureWord,
        username: data.username,
      });
      setStep(1);
    } catch (error) {
      console.error(error);
      setError("Error fetching secure word");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitVerifyForm = () => {
    setStep(2);
  };

  const onSubmitPasswordForm = async (data: { password: string }) => {
    setFormData({ ...formData, ...data });

    try {
      setLoading(true);
      setError(null);
      const hashedPassword = await hashPassword(
        data.password,
        formData.secureWord
      );

      await login({
        username: formData.username,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error);
      setError("Incorrect password or username");
    } finally {
      setLoading(false);
    }

    router.push("/transaction");
  };

  return (
    <div>
      {step == 0 && (
        <LoginForm
          loading={loading}
          onSubmit={onSubmitLoginForm}
          error={error}
        />
      )}
      {step == 1 && (
        <VerifyForm
          secureWord={formData.secureWord}
          onSubmit={onSubmitVerifyForm}
        />
      )}
      {step == 2 && (
        <PasswordForm
          loading={loading}
          onSubmit={onSubmitPasswordForm}
          error={error}
        />
      )}
      <button className="w-full mt-2" onClick={handleBack}>
        <span className="text-sm underline">Back</span>
      </button>
    </div>
  );
}
