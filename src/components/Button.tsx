"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import * as React from "react";

// 버튼, 버튼형 링크의 공통 스타일 정의
const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "cursor-pointer",
    "disabled:opacity-75 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-foreground)] border border-[color:var(--color-foreground)] text-[color:var(--color-background)] hover:bg-[color:var(--color-background)] hover:text-[color:var(--color-foreground)]",
        outline:
          "border border-gray-200 text-[color:var(--color-foreground)] hover:border-[color:var(--color-foreground)]",
      },
      size: {
        md: "px-4 py-2",
        sm: "px-3 py-1.5",
        lg: "px-5 py-3",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = BaseProps &
  VariantProps<typeof buttonStyles> & {
    href?: string; // 있으면 <Link>, 없으면 <button>
    className?: string;
  };

export function Button({
  href,
  variant,
  size,
  full,
  className,
  ...rest
}: ButtonProps) {
  const classes = twMerge(buttonStyles({ variant, size, full }), className);

  if (href) {
    // 버튼 스타일의 링크
    return (
      <Link href={href} className={classes} {...rest}>
        {rest.children}
      </Link>
    );
  }

  // 실제 액션 버튼
  return <button type="button" className={classes} {...rest} />;
}
