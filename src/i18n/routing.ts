import { defineRouting } from "next-intl/routing";

export const locales = ["ar", "fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const rtlLocales: readonly Locale[] = ["ar"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function directionOf(locale: Locale): "rtl" | "ltr" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/** Native language names, always shown in their own script. */
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
  es: "Español",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  // Static export: no middleware, locale detection is done client-side on "/".
  localeDetection: false,
});
