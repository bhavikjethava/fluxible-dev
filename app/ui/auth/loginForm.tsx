"use client";
import { useState } from "react";
import { AppButton, AppInput } from "../components";
import { FormData } from "@/lib/types";
import { handleConfirmSignIn, handleSignIn } from "@/lib/cognitoAction";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Link from "next/link";
import { signInWithRedirect } from "aws-amplify/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const [mfaVerification, setMFAVerification] = useState({
    setupUri: "",
    code: false,
  });
  const [passwordshow1, setpasswordshow1] = useState(false);
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

  const handleLogin = () => {
    setLoading(true);
    handleSignIn(formData, async (response: any) => {
      setLoading(false);
      console.log("==>handleLogin", JSON.stringify(response));
      const nextStep = response?.nextStep;
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        console.log("---->nextStep", nextStep);
        switch (nextStep.signInStep) {
          case "CONFIRM_SIGN_UP":
            router.push("/auth/confirm-email");
            break;
          case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP":
            const totpSetupDetails = nextStep.totpSetupDetails;
            const appName = "Fluxible-app";
            const setupUri = totpSetupDetails.getSetupUri(appName);
            // Open setupUri with an authenticator APP to retrieve an OTP code
            console.log("setupUri", JSON.stringify(setupUri));
            setMFAVerification({
              setupUri: setupUri,
              code: true,
            });
            break;
          case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
            setMFAVerification({
              setupUri: "",
              code: true,
            });
            break;
          // default:
          //   router.replace("/");
        }
      }
    });
  };

  const handleVerification = () => {
    handleConfirmSignIn(formData, (response: any) => {
      console.log("==>handleVerification", response);
      if (response?.isError) {
        setErrors({ verificationCode: response?.error?.message });
      } else if (response?.isSignedIn) {
        router.replace("/");
      }
    });
  };

  const onGoogleSignInClick = async () => {
    await signInWithRedirect({
      provider: "Google",
      // options: {
      //   preferPrivateSession: true,
      // },
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
                <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                {errors?.message && (
                  <div
                    className="p-4 mb-4 bg-danger/40 text-sm  border-t-4 border-danger text-danger/60 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors?.message}
                  </div>
                )}

                {/* <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                            Welcome back Jhon !
                          </p> */}
                {mfaVerification?.setupUri || mfaVerification?.code ? (
                  <div className="grid gap-y-4">
                    {mfaVerification?.setupUri ? (
                      <div className="mb-4">
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={decodeURI(mfaVerification?.setupUri)}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    ) : null}
                    {mfaVerification?.code ? (
                      <div className="xl:col-span-12 col-span-12">
                        <AppInput
                          type="text"
                          label="verification code"
                          id="verificationCode"
                          value={formData?.verificationCode || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "verificationCode",
                              e?.target?.value
                            )
                          }
                          error={errors?.verificationCode}
                        />
                      </div>
                    ) : null}
                    <div className="xl:col-span-12 col-span-12 grid mt-0">
                      <AppButton onClick={handleVerification}>Verify</AppButton>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-12 gap-y-4">
                      <div className="xl:col-span-12 col-span-12">
                        <AppInput
                          type="text"
                          name="email"
                          id="email"
                          label="Email"
                          placeholder="email"
                          onChange={(e) =>
                            handleInputChange("email", e?.target?.value)
                          }
                          value={formData?.email}
                        />
                      </div>
                      <div className="xl:col-span-12 col-span-12 mb-2">
                        <label
                          htmlFor="signin-password"
                          className="form-label text-default block"
                        >
                          Password
                          <Link
                            href="/authentication/reset-password/reset-basic/"
                            className="float-right text-danger"
                          >
                            Forget password ?
                          </Link>
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
                                passwordshow1
                                  ? "ri-eye-line"
                                  : "ri-eye-off-line"
                              } align-middle`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12 grid mt-0">
                        <AppButton
                          onClick={handleLogin}
                          className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                          isLoading={isLoading}
                        >
                          Sign In
                        </AppButton>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                        Dont have an account?{" "}
                        <Link href="/auth/sign-up" className="text-primary">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                    <div className="text-center my-4 authentication-barrier">
                      <span>OR</span>
                    </div>
                    <div className="btn-list text-center">
                      <AppButton
                        variant="secondary-icon"
                        className="me-[0.365rem]"
                      >
                        <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                      </AppButton>
                      <AppButton
                        variant="secondary-icon"
                        className="me-[0.365rem]"
                        onClick={onGoogleSignInClick}
                      >
                        <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                      </AppButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
