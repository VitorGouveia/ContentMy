import { memo } from "react";

type LogoProps = {
  backgroundColor?: string;
  lockColor?: string;
  color?: string;

  size?: "large" | "medium" | "small";
};

const Generic: React.FC<LogoProps> = memo(
  ({ backgroundColor = "#9B37CC", color = "#9B37CC", lockColor = "#ddd" }) => {
    return (
      <div>
        <svg
          width="512"
          height="520"
          viewBox="0 0 512 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M129.957 0H382.043C454.067 0 512 58.8151 512 131.937V387.862C512 460.983 454.067 519.799 382.043 519.799H129.957C57.9327 519.799 0 460.983 0 387.862V131.937C0 58.8151 57.9327 0 129.957 0Z"
            fill={backgroundColor}
          />

          <circle cx="253.402" cy="303.108" r="136.447" fill={lockColor} />

          <path
            d="M250.875 129.137C214.034 129.137 201.666 162.681 198.823 178.6L142.539 224.65C137.422 176.894 151.269 77.9698 250.875 77.9698C350.481 77.9698 362.875 173.483 356.621 221.239L305.454 176.894C302.611 160.975 287.716 129.137 250.875 129.137Z"
            fill={lockColor}
          />

          <path
            d="M250.68 398.12C232.133 398.12 215.32 394.133 200.24 386.16C185.333 378.013 173.547 366.833 164.88 352.62C156.387 338.233 152.14 322.027 152.14 304C152.14 285.973 156.387 269.853 164.88 255.64C173.547 241.253 185.333 230.073 200.24 222.1C215.32 213.953 232.22 209.88 250.94 209.88C266.713 209.88 280.927 212.653 293.58 218.2C306.407 223.747 317.153 231.72 325.82 242.12L298.78 267.08C286.473 252.867 271.22 245.76 253.02 245.76C241.753 245.76 231.7 248.273 222.86 253.3C214.02 258.153 207.087 265 202.06 273.84C197.207 282.68 194.78 292.733 194.78 304C194.78 315.267 197.207 325.32 202.06 334.16C207.087 343 214.02 349.933 222.86 354.96C231.7 359.813 241.753 362.24 253.02 362.24C271.22 362.24 286.473 355.047 298.78 340.66L325.82 365.62C317.153 376.193 306.407 384.253 293.58 389.8C280.753 395.347 266.453 398.12 250.68 398.12Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }
);

const Primary: React.FC<LogoProps> = ({ ...props }) => {
  return <Generic {...props} />;
};

const Secondary: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <Generic
      backgroundColor="#ddd"
      lockColor="#9B37CC"
      color="#ddd"
      {...props}
    />
  );
};

const Monochromatic: React.FC<LogoProps> = () => {
  return (
    <Generic backgroundColor="#1A202C" lockColor="#2D3748" color="#96A7C8" />
  );
};

export const Logo = {
  Generic,
  Primary,
  Secondary,
  Monochromatic,
};
