"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { LOCALE_KEY } from "@/lib/prefs";
import { cn } from "@/lib/utils";

/**
 * Switches language while staying on the same page. Progress, counters and favourites live in
 * IndexedDB, independently of the locale, so nothing is lost when switching.
 * The current path is rewritten by replacing its first segment (/fr/umrah/tawaf/ → /ar/umrah/tawaf/),
 * which also works for dynamic routes and offline (the target page is a cached static file).
 */
export function swapLocaleInPath(path: string, next: Locale): string {
  const parts = path.split("/");
  if (parts.length > 1 && (locales as readonly string[]).includes(parts[1])) parts[1] = next;
  else parts.splice(1, 0, next);
  return parts.join("/") || `/${next}/`;
}

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "list" }) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* storage blocked: the choice still applies to this navigation */
    }
    const target = swapLocaleInPath(window.location.pathname, next) + window.location.search + window.location.hash;
    // A full navigation guarantees <html lang/dir> and fonts are switched together (RTL ↔ LTR).
    startTransition(() => window.location.assign(target));
  }

  if (variant === "list") {
    return (
      <div role="radiogroup" aria-label={t("label")} className="grid grid-cols-2 gap-2">
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={l === locale}
            lang={l}
            dir={l === "ar" ? "rtl" : "ltr"}
            onClick={() => change(l)}
            className={cn(
              "min-h-12 rounded-xl border-2 px-3 text-base font-semibold",
              l === locale ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface",
            )}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <label className="relative flex items-center">
      <span className="sr-only">{t("label")}</span>
      <Languages aria-hidden className="pointer-events-none absolute start-2.5 size-4 text-gold" />
      <select
        value={locale}
        disabled={pending}
        onChange={(e) => change(e.target.value as Locale)}
        data-testid="language-select"
        className="min-h-11 appearance-none rounded-xl border border-gold/50 bg-emerald py-1 pe-3 ps-8 text-sm font-semibold text-ivory"
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
