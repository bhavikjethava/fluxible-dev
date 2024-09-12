import { Button, InputField } from "@/lib/types";
import { FC } from "react";

export const AppButton: FC<Button> = ({
  type = "button",
  className,
  children,
  onClick,
  disabled,
  isLoading,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {children}
    </button>
  );
};
