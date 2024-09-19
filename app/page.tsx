"use client";
import { handleSigOut } from "@/lib/cognitoAction";
import { AppButton } from "./ui/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import "aws-amplify/auth/enable-oauth-listener";
import { Hub } from "aws-amplify/utils";

export default function Home() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          console.log("An error has occurred during the Oauth flow.");
          break;
      }
    });

    return unsubscribe;
  }, []);

  const onSignOut = () => {
    handleSigOut(() => {
      router.push("/auth/login");
    });
  };

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log("===>", currentUser);
      setUser(currentUser);
    } catch (error) {
      console.log("===>", "Not signed in", error);
    }
  };

  return (
    <div className="flex p-5 justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div>
        <div>Fluxible-App Dashboard {JSON.stringify(user)}</div>
        <div>
          <AppButton onClick={onSignOut}>Signout</AppButton>
        </div>
      </div>
    </div>
  );
}
