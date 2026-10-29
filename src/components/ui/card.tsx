import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-[var(--radius)] border border-border bg-surface p-4 shadow-sm sm:p-5", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("mb-3 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl [&_svg]:size-5 [&_svg]:text-accent-text", className)}
      {...props}
    />
  );
}
