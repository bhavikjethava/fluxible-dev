"use client";
import { useState } from "react";
import { AppButton, AppInput } from "../components";
import { FormData } from "@/lib/types";
import { handleConfirmSignIn, handleSignIn } from "@/lib/cognitoAction";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { setUpTOTP } from "aws-amplify/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const [mfaVerification, setMFAVerification] = useState({
    setupUri: "",
    code: false,
  });
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

  const handleLogin =  () => {
    handleSignIn(formData, async (response: any) => {
      console.log("==>handleLogin", JSON.stringify(response));
      const nextStep = response?.nextStep;
      if (response?.isError) {
        setErrors({ message: response?.error?.message });
      } else {
        console.log("---->nextStep", nextStep)
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
              setupUri: '',
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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          {mfaVerification?.setupUri || mfaVerification?.code ? (
            <>
              {mfaVerification?.setupUri ? (
                <div className="mb-4">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={decodeURI(mfaVerification?.setupUri)}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              ) : null}
              {mfaVerification?.code ? (
                <div className="mb-4">
                  <label
                    htmlFor="verificationCode"
                    className="block text-gray-700"
                  >
                    verification code
                  </label>
                  <AppInput
                    type="text"
                    id="verificationCode"
                    value={formData?.verificationCode || ""}
                    onChange={(e) =>
                      handleInputChange("verificationCode", e?.target?.value)
                    }
                    error={errors?.verificationCode}
                  />
                </div>
              ) : (
                nul
              )}
              <AppButton onClick={handleVerification}>Verify</AppButton>
            </>
          ) : (
            <>
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
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <AppInput
                  type="password"
                  id="password"
                  onChange={(e) =>
                    handleInputChange("password", e?.target?.value)
                  }
                  error={errors?.message}
                />
              </div>
              <AppButton onClick={handleLogin}>Sign In</AppButton>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
