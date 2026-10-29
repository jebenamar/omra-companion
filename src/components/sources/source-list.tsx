import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Source } from "@/content/types";
import { resolveSources } from "@/content";

/** Full list of sources (server component). */
export async function SourceList({ sources, locale }: { sources: Source[]; locale: Locale }) {
  const t = await getTranslations("common");
  return (
    <ul className="space-y-2 text-sm">
      {sources.map((s) => (
        <li key={s.id} className="rounded-lg bg-surface-2 p-2.5">
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-start gap-1.5 font-semibold text-primary underline-offset-4 hover:underline">
              {s.citation[locale]}
              <ExternalLink aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              <span className="sr-only">({t("openSource")})</span>
            </a>
          ) : (
            <span className="font-semibold">{s.citation[locale]}</span>
          )}
          {s.grading && (
            <span className="block text-muted">
              {t("gradingLabel")} : {s.grading[locale]}
            </span>
          )}
          {s.checkedOn && <span className="block text-xs text-muted">{t("checkedOn", { date: s.checkedOn })}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Compact inline references next to an instruction. */
export function SourceRefs({ ids, locale }: { ids: string[]; locale: Locale }) {
  const sources = resolveSources(ids);
  return (
    <>
      {sources.map((s) =>
        s.url ? (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-border px-2 py-0.5 text-xs text-muted underline-offset-2 hover:text-primary hover:underline"
          >
            {s.citation[locale]}
          </a>
        ) : (
          <span key={s.id} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {s.citation[locale]}
          </span>
        ),
      )}
    </>
  );
}
