import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Banner } from "./index";
import { Logo } from "../logo";
import { Typography } from "../typography";

type BrandStory = ComponentStory<typeof Banner>;

export default {
  title: "Design System/Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

export const Default: BrandStory = () => (
  <Banner>
    <Logo.Medium>
      <Logo.Icon />
    </Logo.Medium>

    <Typography.CTA>
      <Typography.Paragraph>ContentMy</Typography.Paragraph>
    </Typography.CTA>
  </Banner>
);
