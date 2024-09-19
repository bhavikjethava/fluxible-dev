"use client";
import { Amplify, ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    loginWith: {
      oauth: {
        domain: "fluxible-staging-latest.auth.eu-west-2.amazoncognito.com",
        scopes: ["email", "openid", "profile"],
        redirectSignIn: ["https://localhost:3000"],
        redirectSignOut: ["https://localhost:3000/auth/login"],
        responseType: "code",
      },
    },
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
