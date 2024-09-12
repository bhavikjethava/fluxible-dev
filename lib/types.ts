export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  confirmationCode?: string;
  message?: string;
  verificationCode?: string;
}

export interface InputField {
  type?: string;
  id?: string;
  className?: string;
  onChange?: (e: any) => void;
  error?: string;
  value?: string;
}

export interface Button {
  children: any;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export type Callback = (response?: any) => void;
