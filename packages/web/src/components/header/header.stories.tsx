import { Header } from "./index";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

type HeaderStory = ComponentStory<typeof Header>;

export default {
  title: "UI/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default: HeaderStory = () => (
  <Header
    pages={[
      { title: "Início", href: "/" },
      { title: "Taxas", href: "/pricing" },
      { title: "FAQ", href: "/faq" },
    ]}
  />
);
