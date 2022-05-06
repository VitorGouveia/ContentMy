import { InputHTMLAttributes, memo } from "react";

import styles from "./styles.module.scss";

type GenericInputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
};

const Generic: React.FC<GenericInputProps> = memo(
  ({ placeholder, ...props }) => {
    return (
      <input className={styles.input} placeholder={placeholder} {...props} />
    );
  }
);

const Field: React.FC<GenericInputProps> = ({ ...props }) => {
  return (
    <Generic
      className={`${styles.input} ${styles.field}`}
      type="text"
      {...props}
    />
  );
};

const Checkbox: React.FC<Omit<GenericInputProps, "placeholder">> = ({
  ...props
}) => {
  return (
    <Generic
      className={`${styles.input} ${styles.checkbox}`}
      placeholder=""
      type="checkbox"
      {...props}
    />
  );
};

export const Input = {
  Generic,
  Field,
  Checkbox,
};
