"use client";

import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useFavorites, type FavoriteType } from "@/lib/db";

interface Entry {
  id: string;
  label: string;
  sub?: string;
  href: string;
  arabic?: boolean;
}

export function FavoritesList({ steps, duas, places }: { steps: Entry[]; duas: Entry[]; places: Entry[] }) {
  const t = useTranslations("favorites");
  const favSteps = useFavorites("step");
  const favDuas = useFavorites("dua");
  const favPlaces = useFavorites("place");

  const groups: { type: FavoriteType; title: string; items: Entry[] }[] = [
    { type: "step", title: t("steps"), items: steps.filter((s) => favSteps.has(s.id)) },
    { type: "dua", title: t("duas"), items: duas.filter((d) => favDuas.has(d.id)) },
    { type: "place", title: t("places"), items: places.filter((p) => favPlaces.has(p.id)) },
  ];

  if (groups.every((g) => g.items.length === 0)) {
    return <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">{t("empty")}</p>;
  }

  return (
    <div className="space-y-5">
      {groups
        .filter((g) => g.items.length > 0)
        .map((g) => (
          <section key={g.type}>
            <h2 className="mb-2 font-bold">{g.title}</h2>
            <ul className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
              {g.items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="flex min-h-14 items-center gap-3 px-4 py-2 hover:bg-surface-2">
                    <span className="min-w-0 flex-1">
                      <span
                        className={item.arabic ? "block font-[family-name:var(--font-quran)] text-lg" : "block font-semibold"}
                        lang={item.arabic ? "ar" : undefined}
                        dir={item.arabic ? "rtl" : undefined}
                      >
                        {item.label}
                      </span>
                      {item.sub && <span className="block text-sm text-muted">{item.sub}</span>}
                    </span>
                    <ChevronRight aria-hidden className="rtl-flip size-5 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
