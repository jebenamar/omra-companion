"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CircleCheck, CloudDownload } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { offlineSupported, readPacks } from "@/lib/offline";
import { cn } from "@/lib/utils";

/** Small home-page indicator: is the current language available offline on this device? */
export function OfflineReadiness() {
  const t = useTranslations("offline");
  const locale = useLocale() as Locale;
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    const check = async () => {
      if (!offlineSupported()) return alive && setReady(false);
      const packs = await readPacks();
      if (alive) setReady(Boolean(packs[locale]));
    };
    check();
    const id = window.setInterval(check, 4000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [locale]);

  if (ready === null) return null;
  return (
    <Link
      href="/offline"
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-xl border p-3 text-sm font-semibold",
        ready ? "border-primary/40 bg-primary/10 text-primary" : "border-amber-400 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100",
      )}
    >
      {ready ? <CircleCheck aria-hidden className="size-5" /> : <CloudDownload aria-hidden className="size-5" />}
      <span>{ready ? t("ready") : t("notReady")}</span>
    </Link>
  );
}
