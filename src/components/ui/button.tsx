import { Slot } from "./slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-strong shadow-sm",
        gold: "bg-gold text-ink hover:brightness-95 shadow-sm",
        outline: "border-2 border-border bg-surface text-foreground hover:bg-surface-2",
        ghost: "text-foreground hover:bg-surface-2",
        danger: "border-2 border-danger text-danger bg-surface hover:bg-danger/10",
      },
      size: {
        sm: "min-h-10 px-3 text-sm",
        md: "min-h-12 px-4 text-base",
        lg: "min-h-14 px-6 text-lg",
        xl: "min-h-20 px-6 text-xl",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, type, ...props }: ButtonProps) {
  if (asChild) return <Slot className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  return <button type={type ?? "button"} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
