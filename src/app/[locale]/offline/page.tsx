import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { OfflineManager } from "@/components/offline/offline-manager";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "offline" });
  return { title: t("title") };
}

export default async function OfflinePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("offline");
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      <OfflineManager />
    </div>
  );
}
