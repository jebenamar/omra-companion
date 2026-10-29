import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hand } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { steps } from "@/content";
import { StepTimeline } from "@/components/umrah/step-timeline";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "umrah" });
  return { title: t("title"), description: t("intro") };
}

export default async function UmrahPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("umrah");

  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      <Button asChild variant="gold" size="lg" className="w-full">
        <Link href="/umrah/focus">
          <Hand aria-hidden />
          {t("openFocus")}
        </Link>
      </Button>
      <StepTimeline
        steps={steps.map((s) => ({
          id: s.id,
          order: s.order,
          title: s.title[locale],
          summary: s.summary[locale],
          arabicName: s.arabicName,
        }))}
      />
    </div>
  );
}
