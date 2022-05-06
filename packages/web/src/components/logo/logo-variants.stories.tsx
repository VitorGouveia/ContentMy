import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Logo, LogoProps } from "./index";

type LogoStory = ComponentStory<typeof Logo.Generic>;

export default {
  title: "Design System/Logo/Variants",
  component: Logo.Generic,
} as ComponentMeta<typeof Logo.Generic>;

const Generic: React.FC<LogoProps> = ({ ...props }) => (
  <Logo.Generic {...props} />
);

const Template: LogoStory = ({ ...props }) => <Generic {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: "#9B37CC",
  color: "#9B37CC",
  lockColor: "#ddd",
};

export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: "#ddd",
  lockColor: "#9B37CC",
  color: "#ddd",
};

export const Monochromatic = Template.bind({});
Monochromatic.args = {
  backgroundColor: "#1A202C",
  lockColor: "#2D3748",
  color: "#96A7C8",
};
