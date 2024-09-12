import { InputField } from "@/lib/types";
import { FC } from "react";

export const AppInput: FC<InputField> = ({
  type,
  id,
  className,
  onChange,
  error,
  value,
  ...rest
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 text-gray-800 ${className}`}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {error ? <span className="text-sm text-red-500">{error}</span> : null}
    </>
  );
};
