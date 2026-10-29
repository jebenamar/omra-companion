import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Camera, History, Info, MapPinned, Sparkles } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { places, placesById, resolveSources } from "@/content";
import { Card, SectionTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceList } from "@/components/sources/source-list";
import { PlaceActions } from "@/components/explore/place-actions";

export function generateStaticParams() {
  return locales.flatMap((locale) => places.map((p) => ({ locale, placeId: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; placeId: string }>;
}): Promise<Metadata> {
  const { locale, placeId } = await params;
  const place = placesById.get(placeId);
  if (!place) return {};
  return { title: place.name[locale], description: place.description[locale] };
}

export default async function PlacePage({ params }: { params: Promise<{ locale: Locale; placeId: string }> }) {
  const { locale, placeId } = await params;
  setRequestLocale(locale);
  const place = placesById.get(placeId);
  if (!place) notFound();
  const t = await getTranslations("explore");
  const tc = await getTranslations("common");
  const isRite = place.kinds.includes("umrah-rite");

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-text">{t(place.city)}</p>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{place.name[locale]}</h1>
        {locale !== "ar" && (
          <p lang="ar" dir="rtl" className="font-[family-name:var(--font-quran)] text-2xl text-accent-text">
            {place.arabicName}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {place.kinds.map((k) => (
            <Badge key={k} variant={k === "umrah-rite" ? "gold" : "default"}>
              {t(`kinds.${k}`)}
            </Badge>
          ))}
          {place.contentStatus === "pending" && <Badge variant="warning">{tc("pendingVerification")}</Badge>}
        </div>
        <p className="text-lg text-muted">{place.description[locale]}</p>
        {!isRite && <p className="rounded-lg bg-surface-2 p-3 text-sm font-semibold">{t("notARite")}</p>}
      </header>

      <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-border bg-surface-2 pattern-bg p-4 text-center text-sm text-muted">
        <Camera aria-hidden className="size-6" />
        {t("noPhoto")}
      </div>

      <PlaceActions
        placeId={place.id}
        name={place.name[locale]}
        latitude={place.latitude}
        longitude={place.longitude}
      />

      <Card>
        <SectionTitle>
          <History aria-hidden />
          {t("history")}
        </SectionTitle>
        <p className="leading-relaxed">{place.history[locale]}</p>
      </Card>

      <Card>
        <SectionTitle>
          <Sparkles aria-hidden />
          {t("significance")}
        </SectionTitle>
        <p className="leading-relaxed">{place.significance[locale]}</p>
      </Card>

      {place.access && (
        <Card>
          <SectionTitle>
            <Info aria-hidden />
            {t("access")}
          </SectionTitle>
          <p className="leading-relaxed">{place.access[locale]}</p>
        </Card>
      )}

      <Card>
        <SectionTitle>
          <MapPinned aria-hidden />
          {t("coordinates")}
        </SectionTitle>
        <p className="font-mono text-base" dir="ltr">
          {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
        </p>
        {place.coordinatesPrecision === "approximate" && <p className="text-sm text-muted">{t("approximate")}</p>}
      </Card>

      <Card>
        <SectionTitle>{tc("sources")}</SectionTitle>
        <SourceList sources={resolveSources(place.sourceIds)} locale={locale} />
      </Card>
    </article>
  );
}
