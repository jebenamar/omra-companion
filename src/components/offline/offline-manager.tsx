"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { CircleCheck, CloudDownload, Download, RefreshCw, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import {
  downloadPack,
  fetchManifest,
  offlineSupported,
  readPacks,
  removePack,
  storageEstimate,
  type Packs,
  type PrecacheManifest,
} from "@/lib/offline";
import { useOnline } from "@/lib/online";
import { formatBytes } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const noopSubscribe = () => () => {};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function OfflineManager() {
  const t = useTranslations("offline");
  const format = useFormatter();
  const uiLocale = useLocale();
  const online = useOnline();
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => offlineSupported(),
    () => null,
  );
  const [isProd] = useState(process.env.NODE_ENV === "production");
  const [manifest, setManifest] = useState<PrecacheManifest | null>(null);
  const [packs, setPacks] = useState<Packs>({});
  const [progress, setProgress] = useState<Partial<Record<Locale, number>>>({});
  const [error, setError] = useState(false);
  const [usage, setUsage] = useState<{ usage?: number; persisted?: boolean }>({});
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  const refresh = useCallback(async () => {
    setPacks(await readPacks());
    setUsage(await storageEstimate());
  }, []);

  useEffect(() => {
    if (!offlineSupported()) return;
    fetchManifest().then(setManifest);
    readPacks().then(setPacks);
    storageEstimate().then(setUsage);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function download(targets: Locale[]) {
    if (!manifest) return;
    setError(false);
    for (const l of targets) {
      try {
        setProgress((p) => ({ ...p, [l]: 0 }));
        await downloadPack(manifest, l, (f) => setProgress((p) => ({ ...p, [l]: f })));
      } catch (err) {
        console.error("[omra] pack download failed", err);
        setError(true);
      } finally {
        setProgress((p) => ({ ...p, [l]: undefined }));
      }
    }
    await refresh();
  }

  async function remove(l: Locale) {
    if (!manifest) return;
    await removePack(manifest, l);
    await refresh();
  }

  if (supported === null) return null;
  if (!supported) return <Card className="text-danger">{t("unsupported")}</Card>;

  return (
    <div className="space-y-4">
      {!isProd && <Card className="border-amber-400 text-sm">{t("devMode")}</Card>}

      <Card className="space-y-3">
        <h2 className="font-bold">{t("packTitle")}</h2>
        <ul className="space-y-3">
          {locales.map((l) => {
            const pack = packs[l];
            const pct = progress[l];
            const busy = pct !== undefined;
            const outdated = pack && manifest && pack.buildId !== manifest.buildId;
            const bytes = manifest ? manifest.locales[l].bytes : pack?.bytes;
            return (
              <li key={l} className="rounded-xl border border-border p-3" data-testid={`pack-${l}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span lang={l} className="text-lg font-bold">
                    {localeNames[l]}
                  </span>
                  {pack ? (
                    <Badge variant={outdated ? "warning" : "primary"}>
                      {outdated ? <RefreshCw aria-hidden /> : <CircleCheck aria-hidden />}
                      {outdated ? t("outdated") : t("downloaded")}
                    </Badge>
                  ) : (
                    <Badge>{t("notDownloaded")}</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {bytes !== undefined && t("size", { size: formatBytes(bytes, uiLocale) })}
                  {pack && (
                    <>
                      {" · "}
                      {t("lastUpdate", { date: format.dateTime(new Date(pack.downloadedAt), { dateStyle: "medium", timeStyle: "short" }) })}
                    </>
                  )}
                </p>
                {busy && (
                  <div className="mt-2">
                    <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full bg-primary transition-[width]" style={{ width: `${Math.round((pct ?? 0) * 100)}%` }} />
                    </div>
                    <p className="mt-1 text-xs" aria-live="polite">
                      {t("downloading", { percent: Math.round((pct ?? 0) * 100) })}
                    </p>
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  {(!pack || outdated) && (
                    <Button size="sm" disabled={!online || !manifest || busy} onClick={() => download([l])}>
                      <Download aria-hidden />
                      {pack ? t("update") : t("download")}
                    </Button>
                  )}
                  {pack && !busy && (
                    <Button size="sm" variant="ghost" onClick={() => remove(l)}>
                      <Trash2 aria-hidden />
                      {t("remove")}
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <Button
          className="w-full"
          variant="gold"
          disabled={!online || !manifest || Object.values(progress).some((p) => p !== undefined)}
          onClick={() => download(locales.filter((l) => !packs[l] || packs[l]?.buildId !== manifest?.buildId))}
        >
          <CloudDownload aria-hidden />
          {t("downloadAll")}
        </Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {t("failed")}
          </p>
        )}
      </Card>

      <Card className="space-y-1 text-sm">
        {usage.usage !== undefined && <p>{t("storage", { used: formatBytes(usage.usage, uiLocale) })}</p>}
        {usage.persisted && (
          <p className="flex items-center gap-1.5 text-primary">
            <ShieldCheck aria-hidden className="size-4" />
            {t("persisted")}
          </p>
        )}
      </Card>

      <Card className="space-y-2">
        <h2 className="flex items-center gap-2 font-bold">
          <Smartphone aria-hidden className="size-5 text-primary" />
          {t("installTitle")}
        </h2>
        <p className="text-sm text-muted">{t("installHint")}</p>
        {installEvent && (
          <Button onClick={() => installEvent.prompt().then(() => setInstallEvent(null))}>{t("install")}</Button>
        )}
      </Card>
    </div>
  );
}
