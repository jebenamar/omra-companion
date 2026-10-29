"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Plus, RotateCcw, Undo2 } from "lucide-react";
import { counterReducer, LAP_TOTAL, saiLeg, type CounterState } from "@/lib/counter";
import { loadCounter, saveCounter } from "@/lib/db";
import type { StepCounter } from "@/content/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../confirm-dialog";

/**
 * Tawaf (7 circuits) or Sa'i (7 laps Safa ⇄ Marwa) counter. Every change is saved immediately
 * in IndexedDB, so closing the app, losing the network or switching language never loses the count.
 */
export function LapCounter({ kind, large = false }: { kind: StepCounter; large?: boolean }) {
  const t = useTranslations("counter");
  const [state, dispatch] = useReducer(counterReducer, { laps: [] } satisfies CounterState);
  const [loaded, setLoaded] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const skipSave = useRef(true);

  useEffect(() => {
    let alive = true;
    loadCounter(kind).then((saved) => {
      if (!alive) return;
      dispatch({ type: "hydrate", laps: saved.laps });
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [kind]);

  useEffect(() => {
    if (!loaded) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveCounter(kind, state).catch((err) => console.error("[omra] counter save failed", err));
  }, [state, loaded, kind]);

  const count = state.laps.length;
  const finished = count >= LAP_TOTAL;
  const current = Math.min(count + 1, LAP_TOTAL);
  const leg = saiLeg(current);

  return (
    <section
      aria-labelledby={`${kind}-counter-title`}
      className="rounded-[1.25rem] border-2 border-gold/60 bg-emerald-deep p-4 text-ivory shadow-lg sm:p-5"
    >
      <h2 id={`${kind}-counter-title`} className="text-lg font-bold text-gold">
        {kind === "tawaf" ? t("tawafTitle") : t("saiTitle")}
      </h2>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative flex size-28 shrink-0 items-center justify-center sm:size-32">
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#C5A46D"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              initial={false}
              animate={{ pathLength: count / LAP_TOTAL }}
              transition={{ duration: 0.4 }}
            />
          </svg>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0 }}
              className="text-5xl font-extrabold tabular-nums"
              aria-hidden
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="min-w-0 flex-1 space-y-1" aria-live="polite">
          <p className="text-2xl font-bold">
            {finished
              ? t("completedCount", { count })
              : kind === "tawaf"
                ? t("tawafProgress", { n: current })
                : t("saiProgress", { n: current })}
          </p>
          <p className="sr-only">{t("completedCount", { count })}</p>
          {kind === "tawaf" && !finished && <p className="text-sm text-ivory/80">{t("startAtBlackStone")}</p>}
          {kind === "sai" && !finished && (
            <p className="flex flex-wrap items-center gap-2 text-lg font-semibold" data-testid="sai-leg">
              <span className="sr-only">{t("nextLap")} :</span>
              <span>
                <span className="block text-xs font-normal text-ivory/70">{t("from")}</span>
                {t(leg.from)}
              </span>
              <ArrowRight aria-hidden className="rtl-flip size-6 text-gold" />
              <span>
                <span className="block text-xs font-normal text-ivory/70">{t("to")}</span>
                {t(leg.to)}
              </span>
            </p>
          )}
          {finished && (
            <p className="flex items-center gap-2 text-base">
              <CheckCircle2 aria-hidden className="size-5 shrink-0 text-gold" />
              {kind === "tawaf" ? t("tawafDone") : t("saiDone")}
            </p>
          )}
        </div>
      </div>

      <ol aria-hidden className="mt-4 grid grid-cols-7 gap-1.5">
        {Array.from({ length: LAP_TOTAL }, (_, i) => (
          <li
            key={i}
            className={cn(
              "h-2.5 rounded-full transition-colors",
              i < count ? "bg-gold" : i === count ? "bg-ivory/50" : "bg-ivory/15",
            )}
          />
        ))}
      </ol>

      <Button
        variant="gold"
        size={large ? "xl" : "lg"}
        className="mt-4 w-full"
        disabled={!loaded || finished}
        onClick={() => {
          dispatch({ type: "increment", at: Date.now() });
          navigator.vibrate?.(30);
        }}
        data-testid={`${kind}-increment`}
      >
        <Plus aria-hidden />
        {kind === "tawaf" ? t("validateTawaf") : t("validateSai")}
      </Button>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="border-ivory/30 bg-transparent text-ivory hover:bg-white/10"
          disabled={count === 0}
          onClick={() => dispatch({ type: "undo" })}
          data-testid={`${kind}-undo`}
        >
          <Undo2 aria-hidden className="rtl-flip" />
          {t("undo")}
        </Button>
        <Button
          variant="outline"
          className="border-ivory/30 bg-transparent text-ivory hover:bg-white/10"
          disabled={count === 0}
          onClick={() => setConfirmReset(true)}
        >
          <RotateCcw aria-hidden />
          {t("reset")}
        </Button>
      </div>
      <p className="mt-3 text-xs text-ivory/75">{t("disclaimer")}</p>

      <ConfirmDialog
        open={confirmReset}
        title={t("resetConfirmTitle")}
        confirmLabel={t("reset")}
        onConfirm={() => dispatch({ type: "reset" })}
        onClose={() => setConfirmReset(false)}
      >
        {t("resetConfirmBody")}
      </ConfirmDialog>
    </section>
  );
}
