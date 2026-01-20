import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "@/i18n/navigation";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

type LinkProps = React.ComponentProps<typeof Link>;

type Props = ButtonStyleProps & {
  href: LinkProps["href"];
  className?: string;
  children: React.ReactNode;
} & Omit<LinkProps, "href" | "className" | "children">;

// Server-safe button-styled link: use for navigation (locale-aware)
export function ButtonLink({
  href,
  variant,
  size,
  full,
  className,
  children,
  ...rest
}: Props) {
  const classes = twMerge(buttonStyles({ variant, size, full }), className);

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
