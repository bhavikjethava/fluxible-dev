import { InputField } from "@/lib/types";
import { FC } from "react";

export const AppInput: FC<InputField> = ({
  type,
  id,
  name,
  label,
  className,
  placeholder,
  onChange,
  error,
  disabled,
  value,
  ...rest
}) => {
  return (
    <>
      {label ? (
        <label htmlFor={id} className="form-label text-default">
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        className={`form-control form-control-lg w-full !rounded-md ${
          type === "checkbox" ? "form-check-input" : ""
        } ${className}`}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </>
  );
};
