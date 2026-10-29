"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RefreshCw, WifiOff } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { useOnline } from "@/lib/online";
import { downloadPack, fetchManifest, offlineSupported, readPacks } from "@/lib/offline";
import { Button } from "../ui/button";

let updateRequested = false;

/**
 * Registers the service worker (production builds only), shows the offline banner and the
 * "update available" prompt, and makes sure the current language is downloaded for offline use.
 */
export function ServiceWorkerManager() {
  const t = useTranslations("offline");
  const locale = useLocale() as Locale;
  const online = useOnline();
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !offlineSupported()) return;
    let cancelled = false;

    const register = async () => {
      const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      const track = (worker: ServiceWorker | null) => {
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller && !cancelled) setWaiting(worker);
        });
      };
      if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
      track(reg.installing);
      reg.addEventListener("updatefound", () => track(reg.installing));

      // Auto-download the active language once the worker controls the page.
      await navigator.serviceWorker.ready;
      const packs = await readPacks();
      if (!packs[locale] && navigator.onLine) {
        const manifest = await fetchManifest();
        if (manifest) await downloadPack(manifest, locale, () => {});
      }
    };
    register().catch((err) => console.error("[omra] service worker", err));

    let reloading = false;
    const onControllerChange = () => {
      // Only reload when the user accepted an update (not when the very first worker takes control).
      if (reloading || !updateRequested) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, [locale]);

  return (
    <div aria-live="polite" className="mx-auto max-w-3xl px-4">
      {!online && (
        <p className="mt-3 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm font-medium text-amber-950 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
          <WifiOff aria-hidden className="size-4 shrink-0" />
          {t("banner")}
        </p>
      )}
      {waiting && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/40 bg-primary/10 p-3 text-sm">
          <span className="font-medium">{t("updateAvailable")}</span>
          <Button
            size="sm"
            onClick={() => {
              updateRequested = true;
              waiting.postMessage({ type: "SKIP_WAITING" });
            }}
          >
            <RefreshCw aria-hidden />
            {t("reload")}
          </Button>
        </div>
      )}
    </div>
  );
}
