type Color = {
  title: string;
  shades: string[];
};

type ColorsProps = {
  colors: Color[];
};

export const Colors: React.FC<ColorsProps> = ({ colors }) => {
  return (
    <div>
      {colors.map(({ title, shades }) => (
        <div key={title}>
          <div>{title}</div>
          <ul>
            {shades.map((color) => (
              <li
                style={{ width: 40, height: 40, background: color }}
                key={color}
              ></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
