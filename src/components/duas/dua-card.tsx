"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Copy, ExternalLink, Info, Share2 } from "lucide-react";
import type { LocalizedDua } from "@/content";
import { usePrefs } from "@/lib/prefs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FavoriteButton } from "../favorite-button";

export function DuaCard({ dua, headingLevel = 3 }: { dua: LocalizedDua; headingLevel?: 2 | 3 }) {
  const t = useTranslations();
  const locale = useLocale();
  const [prefs] = usePrefs();
  const [copied, setCopied] = useState(false);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  const shareText = [dua.arabicText, dua.transliteration, dua.translation, dua.sources.map((s) => s.citation).join(" · ")]
    .filter(Boolean)
    .join("\n\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        /* cancelled */
      }
    } else copy();
  }

  return (
    <article
      id={`dua-${dua.id}`}
      className="scroll-mt-24 rounded-[var(--radius)] border border-border bg-surface p-4 shadow-sm sm:p-5"
      data-testid="dua-card"
    >
      <Heading className="sr-only">{dua.when}</Heading>
      <p className="arabic-text text-foreground" lang="ar">
        {dua.arabicText}
      </p>

      {prefs.transliteration && dua.transliteration && (
        <p className="mt-2 italic text-muted" lang={`ar-Latn`} dir="ltr">
          {dua.transliteration}
        </p>
      )}

      {locale !== "ar" && dua.translation && (
        <div className="mt-3 border-s-4 border-gold ps-3">
          <p className="leading-relaxed">{dua.translation}</p>
          {dua.translationStatus !== "sourced" && (
            <Badge variant="warning" className="mt-1.5">
              <Info aria-hidden />
              {t("common.unofficialTranslation")}
            </Badge>
          )}
        </div>
      )}

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="font-semibold text-accent-text">{t("duas.when")}</dt>
          <dd>{dua.when}</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent-text">{t("duas.explanation")}</dt>
          <dd className="leading-relaxed">{dua.explanation}</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent-text">{t("common.sources")}</dt>
          <dd className="flex flex-wrap gap-1.5 pt-1">
            {dua.sources.map((s) =>
              s.url ? (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium hover:text-primary"
                  title={s.grading}
                >
                  {s.citation}
                  <ExternalLink aria-hidden className="size-3" />
                </a>
              ) : (
                <span key={s.id} className="rounded-full border border-border px-2.5 py-1 text-xs">
                  {s.citation}
                </span>
              ),
            )}
          </dd>
          {dua.sources.some((s) => s.grading) && (
            <dd className="mt-1 text-xs text-muted">
              {dua.sources
                .filter((s) => s.grading)
                .map((s) => `${s.citation} — ${s.grading}`)
                .join(" · ")}
            </dd>
          )}
        </div>
      </dl>

      {dua.textStatus === "pending" && (
        <Badge variant="warning" className="mt-3">
          {t("common.pendingVerification")}
        </Badge>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={copy} aria-live="polite">
          {copied ? <Check aria-hidden className="text-primary" /> : <Copy aria-hidden />}
          {copied ? t("common.copied") : t("common.copy")}
        </Button>
        <Button variant="outline" size="sm" onClick={share}>
          <Share2 aria-hidden />
          {t("common.share")}
        </Button>
        <FavoriteButton type="dua" id={dua.id} className="ms-auto size-10" />
      </div>
    </article>
  );
}
