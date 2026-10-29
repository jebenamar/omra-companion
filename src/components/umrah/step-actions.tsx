"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Circle } from "lucide-react";
import { setCurrentStep, setStepCompleted, useCompletedSteps } from "@/lib/db";
import { Button } from "../ui/button";
import { FavoriteButton } from "../favorite-button";

/** "Mark as completed" + favourite. Opening a step also records it as the current step. */
export function StepActions({ stepId }: { stepId: string }) {
  const t = useTranslations("umrah");
  const completed = useCompletedSteps();
  const done = completed.has(stepId);

  useEffect(() => {
    setCurrentStep(stepId).catch(() => {});
  }, [stepId]);

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant={done ? "outline" : "primary"}
        className="flex-1"
        aria-pressed={done}
        onClick={() => setStepCompleted(stepId, !done)}
      >
        {done ? <CheckCircle2 aria-hidden className="text-primary" /> : <Circle aria-hidden />}
        {done ? t("completed") : t("markDone")}
      </Button>
      <FavoriteButton type="step" id={stepId} />
    </div>
  );
}
