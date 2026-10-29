import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { places } from "@/content";
import { PageHeader } from "@/components/page-header";
import { PlaceExplorer, type PlaceLite } from "@/components/explore/place-explorer";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  return { title: t("title"), description: t("intro") };
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("explore");
  const data: PlaceLite[] = places.map((p) => ({
    id: p.id,
    city: p.city,
    kinds: p.kinds,
    name: p.name[locale],
    arabicName: p.arabicName,
    description: p.description[locale],
    latitude: p.latitude,
    longitude: p.longitude,
  }));
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      <PlaceExplorer places={data} />
    </div>
  );
}
