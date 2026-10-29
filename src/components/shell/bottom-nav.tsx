"use client";

import { useTranslations } from "next-intl";
import { BookOpenText, Compass, Home, Menu, Route } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", key: "home", icon: Home },
  { href: "/umrah", key: "umrah", icon: Route },
  { href: "/duas", key: "duas", icon: BookOpenText },
  { href: "/explore", key: "explore", icon: Compass },
  { href: "/more", key: "more", icon: Menu },
] as const;

const moreSections = ["/more", "/checklist", "/settings", "/offline", "/sources", "/favorites", "/about"];

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname().replace(/\/$/, "") || "/";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/more") return moreSections.some((s) => pathname.startsWith(s));
    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label={t("main")}
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {items.map(({ href, key, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 px-1 pt-2 text-[0.72rem] font-semibold leading-tight",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                    active && "bg-primary/15",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="text-center">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
