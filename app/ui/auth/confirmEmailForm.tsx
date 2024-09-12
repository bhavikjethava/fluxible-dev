"use client";
import { useState } from "react";
import { AppButton, AppInput } from "../components";
import { FormData } from "@/lib/types";
import { handleConfirmSignup } from "@/lib/cognitoAction";
import { useRouter } from "next/navigation";

const ConfirmEmailForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      message: "",
      [field]: '',
    }));
  };

  const handleConfirmEmail = () => {
    handleConfirmSignup(formData, (response: any) => {
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        router.replace("/auth/login");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Confirm Email
        </h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <AppInput
              type="email"
              id="email"
              onChange={(e) => handleInputChange("email", e?.target?.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700">
              Code
            </label>
            <AppInput
              type="text"
              id="confirmationCode"
              onChange={(e) =>
                handleInputChange("confirmationCode", e?.target?.value)
              }
              error={errors?.confirmationCode || errors?.message}
            />
          </div>
          <AppButton onClick={handleConfirmEmail}>Confirm Email</AppButton>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
