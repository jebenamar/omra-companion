import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Geist, Noto_Sans_Arabic, Amiri } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, directionOf, locales, type Locale } from "@/i18n/routing";
import { prefsBootScript } from "@/lib/prefs-shared";
import { AppShell } from "@/components/shell/app-shell";

// Fonts are downloaded at build time and self-hosted: nothing is fetched from a CDN at runtime.
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto-arabic", display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: `${t("appName")} — ${t("appNameAr")}`, template: `%s · ${t("appName")}` },
    description: t("description"),
    applicationName: t("appName"),
    manifest: `/manifest-${locale}.webmanifest`,
    appleWebApp: { capable: true, title: t("appName"), statusBarStyle: "black-translucent" },
    icons: {
      icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192" }],
      apple: "/icons/apple-touch-icon.png",
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#075E45" },
    { media: "(prefers-color-scheme: dark)", color: "#043D31" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={directionOf(locale as Locale)}
      data-theme="light"
      className={`${geist.variable} ${notoArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsBootScript(locale) }} />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
