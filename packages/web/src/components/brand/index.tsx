import { memo } from "react";
import { Logo } from "../logo";

type GenericBrandProps = {
  label?: string;
  variant?: "light" | "dark";
};

export const Generic: React.FC<GenericBrandProps> = memo(
  ({ label = "ContentMy", variant }) => {
    return (
      <div style={{ background: variant === "dark" ? "black" : "light" }}>
        <Logo.Primary />

        <strong>{label}</strong>
      </div>
    );
  }
);

const Light: React.FC<GenericBrandProps> = () => {
  return <Generic variant="light" />;
};

const Dark: React.FC<GenericBrandProps> = () => {
  return <Generic variant="dark" />;
};

export const Brand = {
  Generic,
  Light,
  Dark,
};
