"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, ChevronRight, CloudOff, Map as MapIcon, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PlaceCity, PlaceKind } from "@/content/types";
import { useOnline } from "@/lib/online";
import { useVisited } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export interface PlaceLite {
  id: string;
  city: PlaceCity;
  kinds: PlaceKind[];
  name: string;
  arabicName: string;
  description: string;
  latitude: number;
  longitude: number;
}

// Leaflet is only downloaded when the user opens the map (and is online).
const PlacesMap = dynamic(() => import("./places-map").then((m) => m.PlacesMap), { ssr: false });

export function PlaceExplorer({ places }: { places: PlaceLite[] }) {
  const t = useTranslations("explore");
  const locale = useLocale();
  const online = useOnline();
  const visited = useVisited();
  const [city, setCity] = useState<PlaceCity>("makkah");
  const [kind, setKind] = useState<PlaceKind | "all">("all");
  const [showMap, setShowMap] = useState(false);

  const filtered = useMemo(
    () => places.filter((p) => p.city === city && (kind === "all" || p.kinds.includes(kind))),
    [places, city, kind],
  );
  const kinds: PlaceKind[] = ["umrah-rite", "mosque", "historical", "hajj"];

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label={t("title")} className="grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1">
        {(["makkah", "madinah"] as const).map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={city === c}
            onClick={() => setCity(c)}
            className={cn(
              "min-h-12 rounded-lg text-base font-bold",
              city === c ? "bg-primary text-primary-foreground shadow" : "text-muted",
            )}
          >
            {t(c)}
          </button>
        ))}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group">
        {(["all", ...kinds] as const)
          .filter((k) => k === "all" || places.some((p) => p.city === city && p.kinds.includes(k)))
          .map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-3.5 text-sm font-semibold",
                kind === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface",
              )}
            >
              {k === "all" ? t("all") : t(`kinds.${k}`)}
            </button>
          ))}
      </div>

      <div className="rounded-[var(--radius)] border border-border bg-surface p-3">
        {online ? (
          showMap ? (
            <PlacesMap places={filtered} locale={locale} label={t("mapTitle")} />
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setShowMap(true)}>
              <MapIcon aria-hidden />
              {t("showMap")}
            </Button>
          )
        ) : (
          <p className="flex items-start gap-2 text-sm text-muted">
            <CloudOff aria-hidden className="mt-0.5 size-4 shrink-0" />
            {t("mapOffline")}
          </p>
        )}
      </div>

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link
              href={`/explore/${p.id}`}
              className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-surface p-4 shadow-sm hover:bg-surface-2"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                <MapPin aria-hidden className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 text-lg font-bold">
                  {p.name}
                  {visited.has(p.id) && (
                    <CheckCircle2 aria-label={t("visited")} className="size-5 text-primary" />
                  )}
                </span>
                {locale !== "ar" && (
                  <span lang="ar" dir="rtl" className="block font-[family-name:var(--font-quran)] text-accent-text">
                    {p.arabicName}
                  </span>
                )}
                <span className="mt-1 block text-sm text-muted">{p.description}</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {p.kinds.map((k) => (
                    <Badge key={k} variant={k === "umrah-rite" ? "gold" : "default"}>
                      {t(`kinds.${k}`)}
                    </Badge>
                  ))}
                </span>
              </span>
              <ChevronRight aria-hidden className="rtl-flip mt-3 size-5 shrink-0 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
