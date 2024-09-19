"use client";
import { useState } from "react";
import { AppButton, AppInput } from "../components";
import { FormData } from "@/lib/types";
import { handleConfirmSignup } from "@/lib/cognitoAction";
import { useRouter } from "next/navigation";

const ConfirmEmailForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const [isLoading, setLoading] = useState(false);
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

  const handleConfirmEmail = () => {
    setLoading(true);
    handleConfirmSignup(formData, (response: any) => {
      setLoading(false);
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        router.replace("/auth/login");
      }
    });
  };

  return (
    <div className="container">
      <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
        <div className="grid grid-cols-12">
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
            <div className="box !p-[3rem]">
              <div
                className="box-body"
                role="tabpanel"
                id="pills-with-brand-color-01"
                aria-labelledby="pills-with-brand-color-item-1"
              >
                <p className="h5 font-semibold mb-2 text-center">
                  Confirm Email
                </p>
                {errors?.message && (
                  <div
                    className="p-4 mb-4 bg-danger/40 text-sm  border-t-4 border-danger text-danger/60 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors?.message}
                  </div>
                )}
                <div className="grid grid-cols-12 gap-y-4">
                  <div className="xl:col-span-12 col-span-12">
                    <AppInput
                      type="email"
                      // disabled={true}
                      name="email"
                      id="email"
                      label="Email"
                      value={formData?.email}
                      onChange={(e) =>
                        handleInputChange("email", e?.target?.value)
                      }
                    />
                  </div>
                  <div className="xl:col-span-12 col-span-12">
                    <AppInput
                      type="text"
                      name="confirmationCode"
                      id="confirmationCode"
                      label="Confirmation Code"
                      value={formData?.confirmationCode}
                      onChange={(e) =>
                        handleInputChange("confirmationCode", e?.target?.value)
                      }
                      error={errors?.confirmationCode || errors?.message}
                    />
                  </div>
                  <div className="xl:col-span-12 col-span-12 grid mt-0">
                    <AppButton
                      onClick={handleConfirmEmail}
                      className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                      isLoading={isLoading}
                    >
                      Confirm Email
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
