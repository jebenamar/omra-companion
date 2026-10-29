import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpenText, ChevronRight, ClipboardCheck, Compass, Hand } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { steps, sourcesById } from "@/content";
import { KaabaHero } from "@/components/visuals/kaaba-hero";
import { HomeProgress } from "@/components/umrah/home-progress";
import { OfflineReadiness } from "@/components/offline/offline-readiness";
import { Card } from "@/components/ui/card";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const verseSource = sourcesById.get("quran-2-196")!;

  const shortcuts = [
    { href: "/duas", icon: BookOpenText, title: t("duasCard"), hint: t("duasCardHint") },
    { href: "/explore", icon: Compass, title: t("exploreCard"), hint: t("exploreCardHint") },
    { href: "/checklist", icon: ClipboardCheck, title: t("checklistCard"), hint: t("checklistCardHint") },
  ] as const;

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[1.5rem] border border-gold/40 bg-emerald-deep text-ivory shadow-lg">
        <KaabaHero label={t("kaabaAlt")} className="block h-auto w-full" />
        <div className="space-y-3 p-5">
          <h1 className="text-2xl font-bold">{t("greeting")}</h1>
          <p className="text-ivory/85">{t("greetingSub")}</p>
          <figure className="rounded-2xl border border-gold/30 bg-black/15 p-4">
            <figcaption className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold">{t("verseLabel")}</figcaption>
            <blockquote>
              <p className="arabic-text text-ivory" lang="ar">
                ﴿وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ﴾
              </p>
              {t("verseTranslation") && (
                <p className="mt-1 text-sm text-ivory/90">
                  {t("verseTranslation")} <span className="text-xs text-ivory/70">({t("verseTranslationNote")})</span>
                </p>
              )}
            </blockquote>
            <a href={verseSource.url} className="mt-2 inline-block text-xs text-gold underline underline-offset-2" rel="noopener" target="_blank">
              {verseSource.citation[locale]}
            </a>
          </figure>
        </div>
      </section>

      <HomeProgress
        steps={steps.map((s) => ({ id: s.id, order: s.order, title: s.title[locale] }))}
      />

      <Link
        href="/umrah/focus"
        className="flex min-h-20 items-center gap-4 rounded-[var(--radius)] border-2 border-gold bg-surface p-4 shadow-sm hover:bg-surface-2"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/25 text-accent-text">
          <Hand aria-hidden className="size-6" />
        </span>
        <span className="flex-1">
          <span className="block text-lg font-bold">{t("focusMode")}</span>
          <span className="block text-sm text-muted">{t("focusModeHint")}</span>
        </span>
        <ChevronRight aria-hidden className="rtl-flip size-5 text-muted" />
      </Link>

      <div className="grid gap-3 sm:grid-cols-3">
        {shortcuts.map(({ href, icon: Icon, title, hint }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition-colors group-hover:bg-surface-2">
              <Icon aria-hidden className="mb-2 size-6 text-primary" />
              <p className="font-bold">{title}</p>
              <p className="text-sm text-muted">{hint}</p>
            </Card>
          </Link>
        ))}
      </div>

      <OfflineReadiness />
    </div>
  );
}
