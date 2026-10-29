"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CloudOff, Play, ShieldCheck } from "lucide-react";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import type { Video } from "@/content/types";
import { useOnline } from "@/lib/online";
import { cn } from "@/lib/utils";

type LocalVideo = Omit<Video, "summary"> & { summary: string };

/**
 * Verified YouTube videos. The player (youtube-nocookie.com) is only loaded when the user taps play.
 * Videos in the interface language come first; others are clearly labelled.
 */
export function VideoSection({ videos }: { videos: LocalVideo[] }) {
  const t = useTranslations("videos");
  const locale = useLocale() as Locale;
  const online = useOnline();
  const [filter, setFilter] = useState<Locale | "all">("all");
  const [playing, setPlaying] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...videos]
        .filter((v) => filter === "all" || v.language === filter)
        .sort((a, b) => Number(b.language === locale) - Number(a.language === locale)),
    [videos, filter, locale],
  );

  if (videos.length === 0) {
    return (
      <div className="rounded-[var(--radius)] border border-dashed border-border bg-surface p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck aria-hidden className="size-4 text-primary" />
          {t("none")}
        </p>
        <p className="mt-1 text-muted">{t("noneHint")}</p>
      </div>
    );
  }

  const available = locales.filter((l) => videos.some((v) => v.language === l));

  return (
    <div className="space-y-3">
      {available.length > 1 && (
        <div role="group" aria-label={t("filter")} className="flex flex-wrap gap-2">
          {(["all", ...available] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={filter === l}
              onClick={() => setFilter(l)}
              className={cn(
                "min-h-10 rounded-full border px-3 text-sm font-semibold",
                filter === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface",
              )}
            >
              {l === "all" ? t("all") : localeNames[l]}
            </button>
          ))}
        </div>
      )}
      {sorted.map((v) => (
        <article key={v.id} className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
          {playing === v.id && online ? (
            <div className="aspect-video">
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&hl=${locale}`}
                title={v.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <button
              type="button"
              disabled={!online}
              onClick={() => setPlaying(v.id)}
              className="relative flex aspect-video w-full items-center justify-center bg-emerald-deep text-ivory disabled:cursor-not-allowed"
              aria-label={`${t("play")} — ${v.title}`}
            >
              {online && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-70"
                />
              )}
              <span className="relative flex size-16 items-center justify-center rounded-full bg-gold text-ink">
                {online ? <Play aria-hidden className="rtl-flip size-7" /> : <CloudOff aria-hidden className="size-7" />}
              </span>
            </button>
          )}
          <div className="space-y-1 p-3 text-sm">
            <p className="font-bold" lang={v.language}>
              {v.title}
            </p>
            <p className="text-muted">
              {v.channel}
              {v.language !== locale && <> · {t("otherLanguage", { language: localeNames[v.language] })}</>}
            </p>
            {!online && <p className="font-semibold text-amber-700 dark:text-amber-300">{t("offline")}</p>}
            <p>{v.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
