export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
  confirmationCode?: string;
  message?: string;
  verificationCode?: string;
}

export interface InputField {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  error?: string;
  value?: string;
}

export interface Button {
  children: any;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary" | "secondary-icon";
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export type Callback = (response?: any) => void;
