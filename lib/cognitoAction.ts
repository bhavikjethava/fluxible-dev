import { confirmSignIn, confirmSignUp, signIn, signOut, signUp } from "aws-amplify/auth";
import { Callback, FormData } from "./types";

export const handleSignup = async (formData: FormData, callback?: Callback) => {
  try {
    const response = await signUp({
      // { isSignUpComplete, userId, nextStep }
      username: formData.email || "",
      password: formData?.password || "",
      options: {
        userAttributes: {
          email: formData.email || "",
          name: formData.name || "",
        },
        autoSignIn: true,
      },
    });
    callback?.(response);
  } catch (error) {
    callback?.({ isError: true, error });
    console.log("signup error ", error);
  }
};

export const handleConfirmSignup = async (
  formData: FormData,
  callback?: Callback
) => {
  try {
    const response = await confirmSignUp({
      username: formData?.email || "",
      confirmationCode: formData?.confirmationCode || "",
    });
    callback?.(response);
  } catch (error) {
    callback?.({ isError: true, error });
    console.log("signup error ", error);
  }
};

export const handleSignIn = async (formData: FormData, callback: Callback) => {
  try {
    const response = await signIn({
      username: formData?.email || "",
      password: formData?.password || "",
    });
    callback?.(response);
  } catch (error) {
    callback?.({ isError: true, error });
    console.log("signup error ", error);
  }
}

export const handleConfirmSignIn = async (formData: FormData, callback: Callback) => {
  try {
    const response = await confirmSignIn({
      challengeResponse: formData?.verificationCode || ''
    });
    callback?.(response);
  } catch (error) {
    callback?.({ isError: true, error });
    console.log("signup error ", error);
  }
}

export const handleSigOut = async (callback: Callback) => {
  try {
    const response = await signOut();
    callback?.(response);
  } catch (error) {
    callback?.({ isError: true, error });
    console.log("signup error ", error);
  }
}


