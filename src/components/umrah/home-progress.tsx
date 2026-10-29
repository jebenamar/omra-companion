"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCompletedSteps, useCurrentStep } from "@/lib/db";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface StepLite {
  id: string;
  order: number;
  title: string;
}

export function HomeProgress({ steps }: { steps: StepLite[] }) {
  const t = useTranslations("home");
  const completed = useCompletedSteps();
  const current = useCurrentStep();
  const done = steps.filter((s) => completed.has(s.id)).length;
  const started = done > 0 || Boolean(current);
  const resumeStep =
    steps.find((s) => s.id === current) ?? steps.find((s) => !completed.has(s.id)) ?? steps[steps.length - 1];
  const percent = Math.round((done / steps.length) * 100);

  return (
    <Card>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold">{t("progressTitle")}</h2>
        <span className="text-sm font-semibold text-muted">{t("progressValue", { done, total: steps.length })}</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={done}
        aria-label={t("progressTitle")}
        className="h-3 overflow-hidden rounded-full bg-surface-2"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      {started && resumeStep && (
        <p className="mt-3 text-sm text-muted">{t("resumeStep", { step: resumeStep.title })}</p>
      )}
      <Button asChild size="lg" className="mt-4 w-full">
        <Link href={started && resumeStep ? `/umrah/${resumeStep.id}` : `/umrah/${steps[0].id}`}>
          {started ? <RotateCcw aria-hidden /> : <Play aria-hidden className="rtl-flip" />}
          {started ? t("resume") : t("start")}
        </Link>
      </Button>
    </Card>
  );
}
