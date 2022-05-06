import { memo } from "react";

import { Typography } from "../typography";

import styles from "./styles.module.scss";

type GenericButtonProps = {
  /**
   * the content's of the button
   */
  children: React.ReactNode;

  color?: string;
  backgroundColor?: string;
};

const Generic: React.FC<GenericButtonProps> = memo(
  ({ children, backgroundColor, color }) => {
    return (
      <button
        className={styles.button}
        style={{ background: backgroundColor, color }}
      >
        <Typography.CTA>{children}</Typography.CTA>
      </button>
    );
  }
);

const Primary: React.FC<GenericButtonProps> = ({ ...props }) => {
  return (
    <Generic
      backgroundColor="linear-gradient(90deg, #923DBA 0%, #DB01FF 100%)"
      {...props}
    />
  );
};

const Solid: React.FC<GenericButtonProps> = ({ ...props }) => {
  return <Generic backgroundColor="#923DBA" {...props} />;
};

const Success: React.FC<GenericButtonProps> = ({ ...props }) => {
  return <Generic backgroundColor="#10FF53" {...props} />;
};

const Danger: React.FC<GenericButtonProps> = ({ ...props }) => {
  return <Generic backgroundColor="#FF1058" {...props} />;
};

export const Button = {
  Generic,
  Primary,
  Solid,
  Success,
  Danger,
};
