import { Colors } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type ColorsStory = ComponentStory<typeof Colors>;

export default {
  title: "Colors",
  component: Colors,
} as ComponentMeta<typeof Colors>;

export const Default: ColorsStory = () => (
  <Colors
    colors={[
      {
        title: "Purple",
        shades: [
          "linear-gradient(90deg, #923DBA 0%, #AD2CF0 100%)",
          "#923DBA",
          "#AD2CF0",
          "#42115B",
        ],
      },
      {
        title: "Black",
        shades: ["##000000", "#2F2F2F", "#464646", "#C5C5C580", "#FFFFFF"],
      },
      {
        title: "Tertiary",
        shades: ["#10FF53", "#FF1058"],
      },
    ]}
  />
);
