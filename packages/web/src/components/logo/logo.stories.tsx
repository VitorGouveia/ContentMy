import { Logo } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type LogoStory = ComponentStory<typeof Logo.Generic>;

export default {
  title: "Logo",
  component: Logo.Generic,
} as ComponentMeta<typeof Logo.Generic>;

export const Primary: LogoStory = () => <Logo.Primary />;

export const Secondary: LogoStory = () => <Logo.Secondary />;

export const Monochromatic: LogoStory = () => <Logo.Monochromatic />;
