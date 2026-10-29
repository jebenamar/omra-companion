import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { checklist, checklistCategories } from "@/content";
import { PageHeader } from "@/components/page-header";
import { Checklist } from "@/components/checklist/checklist";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checklist" });
  return { title: t("title") };
}

export default async function ChecklistPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checklist");
  return (
    <div className="space-y-5">
      <PageHeader title={t("title")} intro={t("intro")} />
      <Checklist
        groups={checklistCategories.map((c) => ({
          category: c,
          items: checklist.filter((i) => i.category === c).map((i) => ({ id: i.id, label: i.label[locale] })),
        }))}
      />
    </div>
  );
}
