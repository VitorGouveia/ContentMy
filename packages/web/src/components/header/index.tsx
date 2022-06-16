import Link from "next/link";

import { Brand } from "../brand";
import { Button } from "../button";
import { Typography } from "../typography";

import styles from "./styles.module.scss";

type Page = {
  title: string;
  href: string;
};

type HeaderProps = {
  pages: Page[];
};

export const Header: React.FC<HeaderProps> = ({ pages }) => {
  return (
    <header className={styles.header}>
      <Brand.Transparent />

      <ul className={styles.pageList}>
        {pages.map(({ title, href }) => (
          <li key={href}>
            <Link href={href}>
              <a>
                <Typography.CTA>
                  <Typography.Paragraph>
                    {title.toUpperCase()}
                  </Typography.Paragraph>
                </Typography.CTA>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <section className={styles.buttonWrapper}>
        <Button.Primary>Login</Button.Primary>
        <Button.Solid>Cadastre-se</Button.Solid>
      </section>
    </header>
  );
};
