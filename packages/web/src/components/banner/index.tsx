import styles from "./styles.module.scss";

type BannerProps = {
  children: React.ReactNode;

  color?: string;
  backgroundColor?: string;
};

export const Banner: React.FC<BannerProps> = ({
  children,
  color = "#ddd",
  backgroundColor = "#9B37CC",
}) => {
  return (
    <div
      className={styles.banner}
      style={{ color, background: backgroundColor }}
    >
      {children}
    </div>
  );
};
