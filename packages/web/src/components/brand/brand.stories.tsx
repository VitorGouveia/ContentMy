import { Brand } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type BrandStory = ComponentStory<typeof Brand.Generic>;

export default {
  title: "Brand",
  component: Brand.Generic,
} as ComponentMeta<typeof Brand.Generic>;

export const Light: BrandStory = () => <Brand.Light />;

export const Dark: BrandStory = () => <Brand.Dark />;
