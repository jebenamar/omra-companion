"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, RotateCcw } from "lucide-react";
import type { ChecklistCategory } from "@/content/types";
import { getDb, setChecklistItem, useChecklist } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ConfirmDialog } from "../confirm-dialog";

interface Group {
  category: ChecklistCategory;
  items: { id: string; label: string }[];
}

export function Checklist({ groups }: { groups: Group[] }) {
  const t = useTranslations("checklist");
  const checked = useChecklist();
  const [confirm, setConfirm] = useState(false);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const done = groups.reduce((n, g) => n + g.items.filter((i) => checked.has(i.id)).length, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3">
        <span className="font-bold" aria-live="polite">
          {t("progress", { done, total })}
        </span>
        <Button variant="ghost" size="sm" disabled={done === 0} onClick={() => setConfirm(true)}>
          <RotateCcw aria-hidden />
          {t("reset")}
        </Button>
      </div>

      {groups.map((g) => (
        <fieldset key={g.category} className="rounded-[var(--radius)] border border-border bg-surface p-4">
          <legend className="px-1 text-lg font-bold">{t(`categories.${g.category}`)}</legend>
          <ul className="space-y-1">
            {g.items.map((item) => {
              const on = checked.has(item.id);
              return (
                <li key={item.id}>
                  <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={on}
                      onChange={(e) => setChecklistItem(item.id, e.target.checked)}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus)]",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                      )}
                    >
                      {on && <Check className="size-5" />}
                    </span>
                    <span className={cn("text-base", on && "text-muted line-through")}>{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}

      <ConfirmDialog
        open={confirm}
        title={t("resetConfirm")}
        confirmLabel={t("reset")}
        onConfirm={() => getDb().checklist.clear()}
        onClose={() => setConfirm(false)}
      />
    </div>
  );
}
