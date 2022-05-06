import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Banner } from "./index";
import { Logo } from "../logo";

type BrandStory = ComponentStory<typeof Banner>;

export default {
  title: "Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

export const Default: BrandStory = () => (
  <Banner>
    <Logo.Primary backgroundColor="transparent" />

    <h1>ContentMy</h1>
  </Banner>
);
