import type { ReactNode } from "react";

export function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      <div aria-hidden className="h-1 w-16 rounded-full bg-gradient-to-r from-gold to-primary" />
      {intro && <p className="text-muted">{intro}</p>}
      {children}
    </header>
  );
}
