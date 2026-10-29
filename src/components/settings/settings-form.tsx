"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Monitor, Moon, Sun, Trash2 } from "lucide-react";
import { usePrefs, type Theme } from "@/lib/prefs";
import { clearAllUserData } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../confirm-dialog";
import { LanguageSwitcher } from "../shell/language-switcher";

export function SettingsForm() {
  const t = useTranslations("settings");
  const [prefs, setPrefs] = usePrefs();
  const [confirm, setConfirm] = useState(false);

  const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "system", label: t("themeSystem"), icon: Monitor },
    { value: "light", label: t("themeLight"), icon: Sun },
    { value: "dark", label: t("themeDark"), icon: Moon },
  ];

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h2 className="font-bold">{t("language")}</h2>
        <LanguageSwitcher variant="list" />
      </Card>

      <Card className="space-y-3">
        <h2 id="theme-label" className="font-bold">
          {t("theme")}
        </h2>
        <div role="radiogroup" aria-labelledby="theme-label" className="grid grid-cols-3 gap-2">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={prefs.theme === value}
              onClick={() => setPrefs({ theme: value })}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border-2 text-sm font-semibold",
                prefs.theme === value ? "border-primary bg-primary/10 text-primary" : "border-border",
              )}
            >
              <Icon aria-hidden className="size-5" />
              {label}
            </button>
          ))}
        </div>
        <label className="flex min-h-12 items-center justify-between gap-3">
          <span className="font-semibold">{t("highContrast")}</span>
          <input
            type="checkbox"
            role="switch"
            className="size-6 accent-[var(--primary)]"
            checked={prefs.highContrast}
            onChange={(e) => setPrefs({ highContrast: e.target.checked })}
          />
        </label>
      </Card>

      <Card className="space-y-3">
        <label className="block">
          <span className="font-bold">{t("arabicSize")}</span>
          <input
            type="range"
            min={0.8}
            max={1.8}
            step={0.1}
            value={prefs.arabicScale}
            onChange={(e) => setPrefs({ arabicScale: Number(e.target.value) })}
            className="mt-3 w-full accent-[var(--primary)]"
          />
        </label>
        <p className="arabic-text rounded-lg bg-surface-2 p-3" lang="ar">
          لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
        </p>
        <label className="flex min-h-12 items-center justify-between gap-3">
          <span className="font-semibold">{t("transliteration")}</span>
          <input
            type="checkbox"
            role="switch"
            className="size-6 accent-[var(--primary)]"
            checked={prefs.transliteration}
            onChange={(e) => setPrefs({ transliteration: e.target.checked })}
          />
        </label>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-bold">{t("data")}</h2>
        <p className="text-sm text-muted">{t("dataHint")}</p>
        <Button variant="danger" onClick={() => setConfirm(true)}>
          <Trash2 aria-hidden />
          {t("resetAll")}
        </Button>
      </Card>

      <ConfirmDialog
        open={confirm}
        title={t("resetAll")}
        confirmLabel={t("resetAll")}
        onConfirm={() => clearAllUserData()}
        onClose={() => setConfirm(false)}
      >
        {t("resetAllConfirm")}
      </ConfirmDialog>
    </div>
  );
}
