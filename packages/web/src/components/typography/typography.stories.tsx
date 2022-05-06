import { Typography } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type TypographyStory = ComponentStory<typeof Typography.Generic>;

export default {
  title: "Typography",
  component: Typography.Generic,
} as ComponentMeta<typeof Typography.Generic>;

export const Heading: TypographyStory = () => (
  <Typography.Heading label="Título" />
);

export const Paragraph: TypographyStory = () => (
  <Typography.Paragraph label="Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text " />
);

export const CTAHeading: TypographyStory = () => (
  <Typography.CTA>
    <Typography.Heading label="CTA Título" />
  </Typography.CTA>
);

export const CTAParagraph: TypographyStory = () => (
  <Typography.CTA>
    <Typography.Paragraph label="Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text " />
  </Typography.CTA>
);
