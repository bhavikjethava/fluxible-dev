"use client";
import { handleSignup } from "@/lib/cognitoAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@/lib/types";
import { AppButton, AppInput } from "../components";
import Link from "next/link";

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);
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

  const handlSignupClick = () => {
    setLoading(true);
    handleSignup(formData, (response: any) => {
      setLoading(false);
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        router.replace("/auth/confirm-email");
      }
    });
  };

  return (
    <div className="container">
      <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
        <div className="grid grid-cols-12">
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
            <div className="my-[2rem] flex justify-center"></div>
            <div className="box">
              <div className="box-body !p-[3rem]">
                <p className="h5 font-semibold mb-2 text-center">Sign Up</p>
                <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                  Welcome &amp; Join us by creating a free account !
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
                      type="text"
                      name="name"
                      id="name"
                      label="Name"
                      placeholder="name"
                      value={formData?.name}
                      onChange={(e) =>
                        handleInputChange("name", e?.target?.value)
                      }
                    />
                  </div>
                  <div className="xl:col-span-12 col-span-12">
                    <AppInput
                      type="email"
                      name="email"
                      id="email"
                      label="Email"
                      placeholder="email"
                      value={formData?.email}
                      onChange={(e) =>
                        handleInputChange("email", e?.target?.value)
                      }
                    />
                  </div>
                  <div className="xl:col-span-12 col-span-12 mb-2">
                    <label
                      htmlFor="signin-password"
                      className="form-label text-default block"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        name="password"
                        type={passwordshow1 ? "text" : "password"}
                        value={formData?.password}
                        onChange={(e) =>
                          handleInputChange("password", e?.target?.value)
                        }
                        className="form-control  !border-s form-control-lg !rounded-s-md"
                        id="signin-password"
                        placeholder="password"
                      />
                      <button
                        onClick={() => setpasswordshow1(!passwordshow1)}
                        aria-label="button"
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                        type="button"
                        id="button-addon2"
                      >
                        <i
                          className={`${
                            passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                          } align-middle`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="xl:col-span-12 col-span-12 mb-2">
                    <label
                      htmlFor="signin-password"
                      className="form-label text-default block"
                    >
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        name="confirm-password"
                        type={passwordshow2 ? "text" : "password"}
                        value={formData?.confirmPass}
                        onChange={(e) =>
                          handleInputChange("confirmPass", e?.target?.value)
                        }
                        className="form-control  !border-s form-control-lg !rounded-s-md"
                        id="confirm-password"
                        placeholder="confirm password"
                      />
                      <button
                        onClick={() => setpasswordshow2(!passwordshow2)}
                        aria-label="button"
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                        type="button"
                        id="button-addon2"
                      >
                        <i
                          className={`${
                            passwordshow2 ? "ri-eye-line" : "ri-eye-off-line"
                          } align-middle`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="xl:col-span-12 col-span-12 grid mt-0">
                    <AppButton
                      onClick={handlSignupClick}
                      className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                      isLoading={isLoading}
                    >
                      Create Account
                    </AppButton>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div>
                <div className="text-center my-4 authentication-barrier">
                  <span>OR</span>
                </div>
                <div className="btn-list text-center">
                  <AppButton variant="secondary-icon" className="me-[0.365rem]">
                    <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                  </AppButton>
                  <AppButton className="me-[0.365rem]" variant="secondary-icon">
                    <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
