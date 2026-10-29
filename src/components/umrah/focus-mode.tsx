"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import type { LocalizedDua } from "@/content";
import type { StepCounter } from "@/content/types";
import { setCurrentStep, setStepCompleted, useCompletedSteps, useCurrentStep } from "@/lib/db";
import { usePrefs } from "@/lib/prefs";
import { Button } from "../ui/button";
import { LapCounter } from "./lap-counter";

export interface FocusStep {
  id: string;
  order: number;
  title: string;
  focus: string;
  actions: string[];
  duas: LocalizedDua[];
  counter?: StepCounter;
}

/**
 * "I am performing Umrah" mode: only what is needed now, large targets, high legibility,
 * no decorative animation. The active step is stored in IndexedDB (survives language changes).
 */
export function FocusMode({ steps }: { steps: FocusStep[] }) {
  const t = useTranslations("focus");
  const router = useRouter();
  const stored = useCurrentStep();
  const completed = useCompletedSteps();
  const [prefs] = usePrefs();
  // Local choice wins immediately; otherwise the step saved in IndexedDB (undefined while loading).
  const [chosen, setChosen] = useState<string | null>(null);
  const activeId = chosen ?? (stored === undefined ? null : (stored ?? steps[0].id));

  const index = Math.max(0, steps.findIndex((s) => s.id === activeId));
  const step = steps[index];
  const next = steps[index + 1];
  const prev = steps[index - 1];

  function go(id: string) {
    setChosen(id);
    setCurrentStep(id).catch(() => {});
    window.scrollTo({ top: 0 });
  }

  async function complete() {
    await setStepCompleted(step.id, true);
    if (next) go(next.id);
  }

  if (activeId === null) return <h1 className="text-xl font-extrabold">{t("title")}</h1>;

  const allDone = steps.every((s) => completed.has(s.id));

  return (
    <div className="space-y-4 text-lg" data-testid="focus-mode">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-extrabold">{t("title")}</h1>
        <Button variant="outline" size="sm" onClick={() => router.push("/umrah")}>
          <X aria-hidden />
          {t("exit")}
        </Button>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-muted">{t("chooseStep")}</span>
        <select
          value={step.id}
          onChange={(e) => go(e.target.value)}
          className="min-h-14 w-full rounded-xl border-2 border-border bg-surface px-3 text-lg font-semibold"
        >
          {steps.map((s) => (
            <option key={s.id} value={s.id}>
              {s.order}. {s.title}
              {completed.has(s.id) ? " ✓" : ""}
            </option>
          ))}
        </select>
      </label>

      <section className="rounded-2xl border-2 border-foreground/80 bg-surface p-4">
        <p className="text-sm font-bold uppercase tracking-wide text-accent-text">
          {t("current")} · {step.order}/{steps.length}
        </p>
        <h2 className="mt-1 text-3xl font-extrabold leading-tight" data-testid="focus-step-title">
          {step.title}
        </h2>
        <p className="mt-2 text-xl font-semibold">{step.focus}</p>
      </section>

      {step.counter && <LapCounter kind={step.counter} large />}

      <section className="rounded-2xl border border-border bg-surface p-4">
        <h2 className="mb-2 text-xl font-bold">{t("now")}</h2>
        <ol className="list-decimal space-y-2 ps-6 text-lg leading-relaxed marker:font-bold">
          {step.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </section>

      {step.duas.length > 0 && (
        <section className="rounded-2xl border border-border bg-surface p-4">
          <h2 className="mb-2 text-xl font-bold">{t("say")}</h2>
          <div className="space-y-4">
            {step.duas.map((d) => (
              <div key={d.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="arabic-text text-[calc(1.9rem*var(--arabic-scale))]" lang="ar">
                  {d.arabicText}
                </p>
                {prefs.transliteration && d.transliteration && (
                  <p className="mt-1 italic text-muted" dir="ltr">
                    {d.transliteration}
                  </p>
                )}
                {d.translation && <p className="mt-1">{d.translation}</p>}
                <p className="mt-1 text-sm text-muted">{d.when}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {allDone && (
        <p className="flex items-center gap-2 rounded-2xl bg-primary p-4 text-xl font-bold text-primary-foreground">
          <CheckCircle2 aria-hidden className="size-7 shrink-0" />
          {t("finished")}
        </p>
      )}

      <div className="sticky bottom-20 z-10 space-y-2 rounded-2xl bg-background/95 py-2 backdrop-blur">
        <Button size="xl" className="w-full" onClick={complete} data-testid="focus-complete">
          <CheckCircle2 aria-hidden />
          {next ? `${t("done")} → ${t("next")}` : t("done")}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="lg" disabled={!prev} onClick={() => prev && go(prev.id)}>
            <ChevronLeft aria-hidden className="rtl-flip" />
            {t("prev")}
          </Button>
          <Button variant="outline" size="lg" disabled={!next} onClick={() => next && go(next.id)}>
            {t("next")}
            <ChevronRight aria-hidden className="rtl-flip" />
          </Button>
        </div>
      </div>

      <Link href={`/umrah/${step.id}`} className="block text-center font-semibold text-primary underline underline-offset-4">
        {t("fullStep")}
      </Link>
    </div>
  );
}
