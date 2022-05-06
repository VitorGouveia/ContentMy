import { Logo, LogoProps } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

type LogoStory = ComponentStory<typeof Logo.Generic>;

export default {
  title: "Design System/Logo/Sizes",
  component: Logo.Generic,
} as ComponentMeta<typeof Logo.Generic>;

const Generic: React.FC<LogoProps> = ({ ...props }) => (
  <Logo.Generic {...props} />
);

export const Large: LogoStory = ({ ...props }) => (
  <Logo.Large>
    <Generic {...props} />
  </Logo.Large>
);

export const Medium: LogoStory = ({ ...props }) => (
  <Logo.Medium>
    <Generic {...props} />
  </Logo.Medium>
);

export const Small: LogoStory = ({ ...props }) => (
  <Logo.Small>
    <Generic {...props} />
  </Logo.Small>
);
