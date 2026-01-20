import { cva, type VariantProps } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center",
    "transition-colors duration-200",
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
      full: { true: "w-full" },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
