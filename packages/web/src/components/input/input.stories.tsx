import { Input } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type InputStory = ComponentStory<typeof Input.Generic>;

export default {
  title: "Input",
  component: Input.Generic,
} as ComponentMeta<typeof Input.Generic>;

export const Field: InputStory = () => (
  <Input.Field placeholder="Enter Your E-mail" />
);

export const Checkbox: InputStory = () => <Input.Checkbox />;
