import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { CONTENT_VERSION } from "@/content";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} />
      <Card className="space-y-3 leading-relaxed">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
        <p className="text-sm text-muted">{t("contentVersion", { version: CONTENT_VERSION })}</p>
      </Card>
    </div>
  );
}
