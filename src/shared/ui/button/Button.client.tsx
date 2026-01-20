"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps & {
    className?: string;
  };

// Client-only button: use for actions (onClick, state changes, modals)
export function Button({
  variant,
  size,
  full,
  className,
  type = "button",
  ...rest
}: Props) {
  const classes = twMerge(buttonStyles({ variant, size, full }), className);
  return <button type={type} className={classes} {...rest} />;
}
