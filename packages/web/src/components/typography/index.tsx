import React, { memo } from "react";

import styles from "./styles.module.scss";

type GenericTypographyProps = {
  children?: React.ReactNode;
  label?: string;

  weight?: "normal" | "bold";
};

const Generic: React.FC<GenericTypographyProps> = memo(
  ({ children, label }) => {
    return <>{children || label}</>;
  }
);

const Heading: React.FC<GenericTypographyProps> = ({ ...props }) => {
  return (
    <h1 className={styles.heading}>
      <Generic {...props} />
    </h1>
  );
};

const Paragraph: React.FC<GenericTypographyProps> = ({ ...props }) => {
  return (
    <p className={styles.paragraph}>
      <Generic {...props} />
    </p>
  );
};

const CTA: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <strong className={styles.cta}>{children}</strong>;
};

export const Typography = {
  Generic,
  Heading,
  Paragraph,
  CTA,
};
