import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-float",
        accent:
          "bg-accent text-ink hover:bg-accent/90 shadow-soft hover:shadow-float",
        gold:
          "bg-amber-600 text-white hover:bg-amber-700 shadow-soft hover:shadow-float",
        ghost:
          "bg-transparent text-primary hover:bg-primary-soft",
        light:
          "bg-surface text-ink hover:bg-warm shadow-soft",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-10 px-6 text-sm",
        xl: "h-10 px-7 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  href,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href && !asChild) {
    const { children } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <Comp className={classes} {...props} />;
}

export { Button, buttonVariants };
export type { ButtonProps };