import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { duas, places, steps } from "@/content";
import { PageHeader } from "@/components/page-header";
import { FavoritesList } from "@/components/favorites-list";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "favorites" });
  return { title: t("title") };
}

export default async function FavoritesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("favorites");
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} />
      <FavoritesList
        steps={steps.map((s) => ({ id: s.id, label: s.title[locale], href: `/umrah/${s.id}` }))}
        duas={duas.map((d) => ({
          id: d.id,
          label: d.arabicText.length > 70 ? d.arabicText.slice(0, 70) + "…" : d.arabicText,
          sub: d.when[locale],
          href: `/duas#dua-${d.id}`,
          arabic: true,
        }))}
        places={places.map((p) => ({ id: p.id, label: p.name[locale], href: `/explore/${p.id}` }))}
      />
    </div>
  );
}
