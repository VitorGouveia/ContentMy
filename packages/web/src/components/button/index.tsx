import { memo } from "react";

type GenericButtonProps = {
  /**
   * the content's of the button
   */
  children: React.ReactNode;

  backgroundColor?: string;
};

const Generic: React.FC<GenericButtonProps> = memo(
  ({ children, backgroundColor }) => {
    return <button style={{ backgroundColor }}>{children}</button>;
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
