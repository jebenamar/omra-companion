import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localizeDua, resolveDuas, steps } from "@/content";
import { FocusMode, type FocusStep } from "@/components/umrah/focus-mode";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "focus" });
  return { title: t("title") };
}

export default async function FocusPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data: FocusStep[] = steps.map((s) => ({
    id: s.id,
    order: s.order,
    title: s.title[locale],
    focus: s.focus[locale],
    actions: s.whatToDo.map((w) => w.text[locale]),
    duas: resolveDuas(s.duaIds).map((d) => localizeDua(d, locale)),
    counter: s.counter,
  }));
  return <FocusMode steps={data} />;
}
