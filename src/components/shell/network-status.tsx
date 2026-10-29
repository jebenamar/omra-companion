"use client";

import { useTranslations } from "next-intl";
import { Wifi, WifiOff } from "lucide-react";
import { useOnline } from "@/lib/online";

export function NetworkStatus() {
  const t = useTranslations("offline");
  const online = useOnline();
  const label = online ? t("statusOnline") : t("statusOffline");
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/40" title={label}>
      {online ? <Wifi aria-hidden className="size-4 text-gold" /> : <WifiOff aria-hidden className="size-4 text-amber-300" />}
      <span className="sr-only">{label}</span>
    </span>
  );
}
