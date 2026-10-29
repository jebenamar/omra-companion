"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AArrowDown, AArrowUp, Search, Star } from "lucide-react";
import type { LocalizedDua } from "@/content";
import type { DuaCategory } from "@/content/types";
import { matchesQuery } from "@/lib/search";
import { useFavorites } from "@/lib/db";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { DuaCard } from "./dua-card";

const CATEGORIES: DuaCategory[] = [
  "preparation",
  "ihram",
  "talbiya",
  "mosque",
  "tawaf",
  "safa-marwa",
  "quranic",
  "general",
  "madinah",
];

type Item = LocalizedDua & { searchText: string };

export function DuaLibrary({ duas }: { duas: Item[] }) {
  const t = useTranslations("duas");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [category, setCategory] = useState<DuaCategory | "all">("all");
  const [favOnly, setFavOnly] = useState(false);
  const favorites = useFavorites("dua");
  const [prefs, setPrefs] = usePrefs();

  const filtered = useMemo(
    () =>
      duas.filter(
        (d) =>
          (category === "all" || d.category === category) &&
          (!favOnly || favorites.has(d.id)) &&
          matchesQuery(`${d.searchText} ${d.explanation}`, deferred),
      ),
    [duas, category, favOnly, favorites, deferred],
  );

  const chip = (active: boolean) =>
    cn(
      "min-h-10 shrink-0 rounded-full border px-3.5 text-sm font-semibold transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface hover:bg-surface-2",
    );

  return (
    <div className="space-y-4">
      <div className="relative">
        <label htmlFor="dua-search" className="sr-only">
          {t("search")}
        </label>
        <Search aria-hidden className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
        <input
          id="dua-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-h-13 w-full rounded-xl border-2 border-border bg-surface py-3 pe-3 ps-11 text-base"
          autoComplete="off"
        />
      </div>

      <div role="group" aria-label={t("allCategories")} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <button type="button" aria-pressed={category === "all"} className={chip(category === "all")} onClick={() => setCategory("all")}>
          {t("allCategories")}
        </button>
        {CATEGORIES.filter((c) => duas.some((d) => d.category === c)).map((c) => (
          <button key={c} type="button" aria-pressed={category === c} className={chip(category === c)} onClick={() => setCategory(c)}>
            {t(`categories.${c}`)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2">
        <button type="button" aria-pressed={favOnly} className={chip(favOnly)} onClick={() => setFavOnly((v) => !v)}>
          <Star aria-hidden className={cn("me-1 inline size-4", favOnly && "fill-current")} />
          {t("favoritesOnly")}
        </button>
        <label className="flex min-h-10 items-center gap-2 px-2 text-sm font-semibold">
          <input
            type="checkbox"
            className="size-5 accent-[var(--primary)]"
            checked={prefs.transliteration}
            onChange={(e) => setPrefs({ transliteration: e.target.checked })}
          />
          {t("showTransliteration")}
        </label>
        <div className="ms-auto flex items-center gap-1" role="group" aria-label={t("textSize")}>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-border"
            aria-label={t("smaller")}
            onClick={() => setPrefs({ arabicScale: Math.max(0.8, +(prefs.arabicScale - 0.1).toFixed(1)) })}
          >
            <AArrowDown aria-hidden className="size-5" />
          </button>
          <span className="w-12 text-center text-sm tabular-nums" aria-live="polite">
            {Math.round(prefs.arabicScale * 100)}%
          </span>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-border"
            aria-label={t("larger")}
            onClick={() => setPrefs({ arabicScale: Math.min(1.8, +(prefs.arabicScale + 0.1).toFixed(1)) })}
          >
            <AArrowUp aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {t("results", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">{t("noResults")}</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((d) => (
            <div key={d.id}>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-accent-text">{t(`categories.${d.category}`)}</p>
              <DuaCard dua={d} headingLevel={2} />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted">{t("audioUnavailable")}</p>
    </div>
  );
}
