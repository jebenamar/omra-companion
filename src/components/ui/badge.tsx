import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold [&_svg]:size-3.5", {
  variants: {
    variant: {
      default: "bg-surface-2 text-foreground border border-border",
      primary: "bg-primary/12 text-primary border border-primary/30",
      gold: "bg-gold/20 text-accent-text border border-gold/50",
      warning: "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
