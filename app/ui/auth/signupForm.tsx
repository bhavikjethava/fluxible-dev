"use client";
import { handleSignup } from "@/lib/cognitoAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@/lib/types";
import { AppButton, AppInput } from "../components";

const SignupForm = () => {
  const [formData, setFormData] = useState({});
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
      [field]: "",
    }));
  };

  const handlSignupClick = () => {
    handleSignup(formData, (response: any) => {
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        router.replace("/auth/confirm-email");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md text-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <AppInput
              type="text"
              id="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <AppInput
              type="email"
              id="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <AppInput
              type="password"
              id="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors?.password || errors?.message}
            />
          </div>
          <AppButton onClick={handlSignupClick}>Sign Up</AppButton>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
