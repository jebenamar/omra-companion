import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AlertTriangle, BookOpen, ChevronLeft, ChevronRight, ListOrdered, MessageCircle, Scale, Video } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { localizeDua, resolveDuas, resolveSources, steps, stepsById, videos } from "@/content";
import { Card, SectionTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceList, SourceRefs } from "@/components/sources/source-list";
import { DuaCard } from "@/components/duas/dua-card";
import { StepActions } from "@/components/umrah/step-actions";
import { LapCounter } from "@/components/umrah/lap-counter";
import { VideoSection } from "@/components/videos/video-section";

export function generateStaticParams() {
  return locales.flatMap((locale) => steps.map((s) => ({ locale, stepId: s.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; stepId: string }>;
}): Promise<Metadata> {
  const { locale, stepId } = await params;
  const step = stepsById.get(stepId);
  if (!step) return {};
  return { title: step.title[locale], description: step.summary[locale] };
}

export default async function StepPage({ params }: { params: Promise<{ locale: Locale; stepId: string }> }) {
  const { locale, stepId } = await params;
  setRequestLocale(locale);
  const step = stepsById.get(stepId);
  if (!step) notFound();
  const t = await getTranslations("umrah");
  const tc = await getTranslations("common");

  const prev = steps.find((s) => s.order === step.order - 1);
  const next = steps.find((s) => s.order === step.order + 1);
  const duas = resolveDuas(step.duaIds).map((d) => localizeDua(d, locale));
  const stepVideos = videos
    .filter((v) => step.videoIds.includes(v.id) || v.stepIds.includes(step.id))
    .map((v) => ({ ...v, summary: v.summary[locale] }));
  const sources = resolveSources(step.sourceIds);

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-text">{t("stepNumber", { n: step.order })}</p>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{step.title[locale]}</h1>
        {locale !== "ar" && (
          <p lang="ar" dir="rtl" className="font-[family-name:var(--font-quran)] text-2xl text-accent-text">
            {step.arabicName}
          </p>
        )}
        <p className="text-lg text-muted">{step.summary[locale]}</p>
      </header>

      <StepActions stepId={step.id} />

      {step.counter && <LapCounter kind={step.counter} />}

      <Card>
        <SectionTitle>
          <ListOrdered aria-hidden />
          {t("whatToDo")}
        </SectionTitle>
        <ol className="space-y-3">
          {step.whatToDo.map((ins, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-base leading-relaxed">{ins.text[locale]}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {ins.ruling && <Badge variant={ins.ruling === "pillar" ? "gold" : "primary"}>{t(`ruling.${ins.ruling}`)}</Badge>}
                  {ins.sourceIds && <SourceRefs ids={ins.sourceIds} locale={locale} />}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <SectionTitle>
          <BookOpen aria-hidden />
          {t("howTo")}
        </SectionTitle>
        <div className="space-y-3 leading-relaxed">
          {step.howTo.map((p, i) => (
            <p key={i}>{p[locale]}</p>
          ))}
        </div>
      </Card>

      <section aria-labelledby="say">
        <SectionTitle id="say">
          <MessageCircle aria-hidden />
          {t("whatToSay")}
        </SectionTitle>
        {duas.length > 0 ? (
          <div className="space-y-3">
            {duas.map((d) => (
              <DuaCard key={d.id} dua={d} />
            ))}
          </div>
        ) : (
          <Card className="text-muted">{t("noDuas")}</Card>
        )}
        <Link href="/duas" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">
          {t("allDuas")}
        </Link>
      </section>

      <section aria-labelledby="videos">
        <SectionTitle id="videos">
          <Video aria-hidden />
          {t("videos")}
        </SectionTitle>
        <VideoSection videos={stepVideos} />
      </section>

      <Card className="border-danger/30">
        <SectionTitle>
          <AlertTriangle aria-hidden className="!text-danger" />
          {t("mistakes")}
        </SectionTitle>
        <ul className="list-disc space-y-2 ps-5 leading-relaxed marker:text-danger">
          {step.mistakes.map((m, i) => (
            <li key={i}>{m[locale]}</li>
          ))}
        </ul>
      </Card>

      {step.divergences && step.divergences.length > 0 && (
        <Card>
          <SectionTitle>
            <Scale aria-hidden />
            {t("divergences")}
          </SectionTitle>
          <ul className="space-y-2 leading-relaxed">
            {step.divergences.map((d, i) => (
              <li key={i}>{d[locale]}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <SectionTitle>{tc("sources")}</SectionTitle>
        <SourceList sources={sources} locale={locale} />
        <p className="mt-3 text-sm text-muted">{t("nusukNote")}</p>
      </Card>

      <nav className="grid grid-cols-2 gap-3" aria-label={t("title")}>
        {prev ? (
          <Link
            href={`/umrah/${prev.id}`}
            className="flex min-h-16 items-center gap-2 rounded-xl border border-border bg-surface p-3 font-semibold hover:bg-surface-2"
          >
            <ChevronLeft aria-hidden className="rtl-flip size-5 shrink-0" />
            <span className="min-w-0">
              <span className="block text-xs text-muted">{t("previousStep")}</span>
              <span className="block truncate">{prev.title[locale]}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/umrah/${next.id}`}
            className="flex min-h-16 items-center justify-end gap-2 rounded-xl bg-primary p-3 text-end font-semibold text-primary-foreground hover:bg-primary-strong"
          >
            <span className="min-w-0">
              <span className="block text-xs opacity-80">{t("nextStep")}</span>
              <span className="block truncate">{next.title[locale]}</span>
            </span>
            <ChevronRight aria-hidden className="rtl-flip size-5 shrink-0" />
          </Link>
        )}
      </nav>
    </article>
  );
}
