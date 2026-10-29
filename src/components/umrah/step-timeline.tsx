"use client";

import { useTranslations } from "next-intl";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCompletedSteps, useCurrentStep } from "@/lib/db";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string;
  order: number;
  title: string;
  summary: string;
  arabicName: string;
}

export function StepTimeline({ steps }: { steps: StepItem[] }) {
  const t = useTranslations("umrah");
  const completed = useCompletedSteps();
  const current = useCurrentStep();

  return (
    <ol className="relative space-y-3">
      {steps.map((step, i) => {
        const done = completed.has(step.id);
        const isCurrent = current === step.id;
        return (
          <li key={step.id} className="relative">
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute start-6 top-14 h-[calc(100%-2rem)] w-0.5 bg-border" />
            )}
            <Link
              href={`/umrah/${step.id}`}
              className={cn(
                "relative flex items-start gap-4 rounded-[var(--radius)] border bg-surface p-4 shadow-sm transition-colors hover:bg-surface-2",
                isCurrent ? "border-gold ring-2 ring-gold/40" : "border-border",
              )}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold",
                  done ? "border-primary bg-primary text-primary-foreground" : "border-gold text-accent-text",
                )}
              >
                {done ? <Check aria-hidden className="size-6" /> : step.order}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("stepNumber", { n: step.order })}
                  {done && <span className="ms-2 text-primary">· {t("completed")}</span>}
                </span>
                <span className="block text-lg font-bold leading-snug">{step.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{step.summary}</span>
              </span>
              <ChevronRight aria-hidden className="rtl-flip mt-3 size-5 shrink-0 text-muted" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
