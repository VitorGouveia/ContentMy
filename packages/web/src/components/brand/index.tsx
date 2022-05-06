import { memo } from "react";
import { Logo } from "../logo";

import { Typography } from "../typography";

import styles from "./styles.module.scss";

type GenericBrandProps = {
  label?: string;
  variant?: "light" | "dark" | "transparent";
};

export const Generic: React.FC<GenericBrandProps> = memo(
  ({ label = "ContentMy", variant = "dark" }) => {
    return (
      <div
        className={`${styles["brand-container"]} ${
          styles[`variant-${variant}`]
        }`}
      >
        <Logo.Medium>
          <Logo.Icon lockColor="#9B37CC" color="white" />
        </Logo.Medium>

        <Typography.CTA>
          <Typography.Paragraph>{label}</Typography.Paragraph>
        </Typography.CTA>
      </div>
    );
  }
);

const Light: React.FC<GenericBrandProps> = () => {
  return <Generic variant="light" />;
};

const Transparent: React.FC<GenericBrandProps> = () => {
  return <Generic variant="transparent" />;
};

const Dark: React.FC<GenericBrandProps> = () => {
  return <Generic variant="dark" />;
};

export const Brand = {
  Generic,
  Light,
  Dark,
  Transparent,
};
