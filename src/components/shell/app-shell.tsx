import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { BottomNav } from "./bottom-nav";
import { NetworkStatus } from "./network-status";
import { ServiceWorkerManager } from "./service-worker-manager";
import { MotionProvider } from "./motion-provider";
import { KaabaMark } from "../visuals/kaaba-mark";

export async function AppShell({ children }: { children: ReactNode }) {
  const t = await getTranslations();
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-3"
      >
        {t("common.skipToContent")}
      </a>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-emerald-deep text-ivory shadow-md">
        <div className="pattern-bg">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2.5">
            <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5" aria-label={t("nav.home")}>
              <KaabaMark className="size-9 shrink-0" />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-base font-bold">{t("meta.appName")}</span>
                {t("meta.appName") !== t("meta.appNameAr") && (
                  <span className="truncate text-xs text-gold" lang="ar" dir="rtl">
                    {t("meta.appNameAr")}
                  </span>
                )}
              </span>
            </Link>
            <NetworkStatus />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <ServiceWorkerManager />
      <main id="main" className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4 sm:pt-6">
        {children}
      </main>
      <BottomNav />
    </MotionProvider>
  );
}
