import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { duas, localizeDua } from "@/content";
import { PageHeader } from "@/components/page-header";
import { DuaLibrary } from "@/components/duas/dua-library";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "duas" });
  return { title: t("title"), description: t("intro") };
}

export default async function DuasPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("duas");
  const items = duas.map((d) => ({
    ...localizeDua(d, locale),
    // Multilingual search: the index includes every language, the display stays in the active one.
    searchText: [d.arabicText, d.transliteration, ...locales.flatMap((l) => [d.translation[l], d.when[l]])].join(" "),
  }));
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      <DuaLibrary duas={items} />
    </div>
  );
}
