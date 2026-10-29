import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookMarked, ChevronRight, ClipboardCheck, CloudDownload, Info, Settings, Star } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/page-header";
import { LanguageSwitcher } from "@/components/shell/language-switcher";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "more" });
  return { title: t("title") };
}

export default async function MorePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const links = [
    { href: "/checklist", icon: ClipboardCheck, label: t("more.checklist") },
    { href: "/favorites", icon: Star, label: t("more.favorites") },
    { href: "/offline", icon: CloudDownload, label: t("more.offline") },
    { href: "/settings", icon: Settings, label: t("more.settings") },
    { href: "/sources", icon: BookMarked, label: t("more.sources") },
    { href: "/about", icon: Info, label: t("more.about") },
  ];
  return (
    <div className="space-y-5">
      <PageHeader title={t("more.title")} />
      <section aria-labelledby="lang-title" className="space-y-2">
        <h2 id="lang-title" className="font-bold">
          {t("common.language")}
        </h2>
        <LanguageSwitcher variant="list" />
      </section>
      <ul className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
        {links.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link href={href} className="flex min-h-16 items-center gap-3 px-4 hover:bg-surface-2">
              <Icon aria-hidden className="size-5 text-primary" />
              <span className="flex-1 font-semibold">{label}</span>
              <ChevronRight aria-hidden className="rtl-flip size-5 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
