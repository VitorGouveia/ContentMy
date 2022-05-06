type BannerProps = {
  children: React.ReactNode;

  backgroundColor?: string;
};

export const Banner: React.FC<BannerProps> = ({
  children,
  backgroundColor = "#9B37CC",
}) => {
  return <div style={{ backgroundColor }}>{children}</div>;
};
