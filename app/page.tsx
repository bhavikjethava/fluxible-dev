"use client";
import { handleSigOut } from "@/lib/cognitoAction";
import { AppButton } from "./ui/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onSignOut = () => {
    handleSigOut(() => {
      router.push("/auth/login");
    });
  };

  return (
    <div className="flex p-5 justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div>
        <div>Fluxible-App Dashboard</div>
        <div>
        <AppButton onClick={onSignOut}>Signout</AppButton>
      </div>
      </div>
      
    </div>
  );
}
