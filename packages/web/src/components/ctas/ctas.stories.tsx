import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "../button";

type ButtonStory = ComponentStory<typeof Button.Generic>;

export default {
  title: "Design System/Button",
  component: Button.Generic,
} as ComponentMeta<typeof Button.Generic>;

const Template: ButtonStory = ({ ...props }) => <Button.Generic {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Compre Agora",
  color: "#ddd",
  backgroundColor: "linear-gradient(90deg, #923DBA 0%, #DB01FF 100%)",
};

export const Solid = Template.bind({});
Solid.args = {
  children: "Compre Agora",
  color: "#ddd",
  backgroundColor: "#923DBA",
};

export const Success = Template.bind({});
Success.args = {
  children: "Compre Agora",
  backgroundColor: "#10FF53",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Compre Agora",
  backgroundColor: "#FF1058",
};
