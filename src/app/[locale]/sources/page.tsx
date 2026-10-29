import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { duas, places, sources, steps } from "@/content";
import { PageHeader } from "@/components/page-header";
import { SourceList } from "@/components/sources/source-list";
import { Card } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sources" });
  return { title: t("title") };
}

export default async function SourcesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sources");

  const used = new Set([
    ...steps.flatMap((s) => [...s.sourceIds, ...s.whatToDo.flatMap((w) => w.sourceIds ?? [])]),
    ...duas.flatMap((d) => d.sourceIds),
    ...places.flatMap((p) => p.sourceIds),
  ]);
  const groups = [
    { title: t("quran"), items: sources.filter((s) => s.kind === "quran") },
    { title: t("hadith"), items: sources.filter((s) => s.kind === "hadith" || s.kind === "athar") },
    { title: t("official"), items: sources.filter((s) => s.kind === "official" || s.kind === "reference") },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      {groups.map((g) => (
        <Card key={g.title}>
          <h2 className="mb-3 text-lg font-bold">{g.title}</h2>
          <SourceList sources={g.items.filter((s) => used.has(s.id))} locale={locale} />
        </Card>
      ))}
    </div>
  );
}
