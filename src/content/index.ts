import type { Locale } from "@/i18n/routing";
import type { Dua, LocalizedText, Source } from "./types";
import { sourcesById } from "./sources";
import { duasById } from "./duas";

export { steps, stepsById } from "./steps";
export { duas, duasById } from "./duas";
export { places, placesById } from "./places";
export { videos, videosById } from "./videos";
export { sources, sourcesById } from "./sources";
export { checklist, checklistCategories } from "./checklist";

/** Bumped whenever editorial content changes; stored with offline packs. */
export const CONTENT_VERSION = "2026.10.29-1";

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function resolveSources(ids: readonly string[]): Source[] {
  return ids.map((id) => sourcesById.get(id)).filter((s): s is Source => Boolean(s));
}

export function resolveDuas(ids: readonly string[]): Dua[] {
  return ids.map((id) => duasById.get(id)).filter((d): d is Dua => Boolean(d));
}

/** Plain, serialisable projection of a dua for one locale (passed to client components). */
export interface LocalizedDua {
  id: string;
  category: Dua["category"];
  arabicText: string;
  transliteration?: string;
  /** Empty for Arabic: the original text is the reference. */
  translation: string;
  explanation: string;
  when: string;
  sources: { id: string; citation: string; grading?: string; url?: string }[];
  translationStatus: Dua["translationStatus"];
  textStatus: Dua["textStatus"];
}

export function localizeDua(dua: Dua, locale: Locale): LocalizedDua {
  return {
    id: dua.id,
    category: dua.category,
    arabicText: dua.arabicText,
    transliteration: dua.transliteration,
    translation: locale === "ar" ? "" : dua.translation[locale],
    explanation: dua.explanation[locale],
    when: dua.when[locale],
    sources: resolveSources(dua.sourceIds).map((s) => localizeSource(s, locale)),
    translationStatus: dua.translationStatus,
    textStatus: dua.textStatus,
  };
}

export function localizeSource(s: Source, locale: Locale) {
  return {
    id: s.id,
    citation: s.citation[locale],
    grading: s.grading?.[locale],
    url: s.url,
  };
}
