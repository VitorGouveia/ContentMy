import { InputHTMLAttributes, memo } from "react";

type GenericInputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
};

const Generic: React.FC<GenericInputProps> = memo(
  ({ placeholder, ...props }) => {
    return <input placeholder={placeholder} {...props} />;
  }
);

const Field: React.FC<GenericInputProps> = ({ ...props }) => {
  return <Generic type="text" {...props} />;
};

const Checkbox: React.FC<Omit<GenericInputProps, "placeholder">> = ({
  ...props
}) => {
  return <Generic placeholder="" type="checkbox" {...props} />;
};

export const Input = {
  Generic,
  Field,
  Checkbox,
};
