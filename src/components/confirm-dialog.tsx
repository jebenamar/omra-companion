"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

/** Accessible confirmation built on the native <dialog> (focus trap and Escape handled by the browser). */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="confirm-title"
      className="m-auto w-[min(92vw,26rem)] rounded-2xl border border-border bg-surface p-5 text-foreground shadow-2xl backdrop:bg-black/50"
    >
      <h2 id="confirm-title" className="text-lg font-bold">
        {title}
      </h2>
      {children && <div className="mt-2 text-muted">{children}</div>}
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} autoFocus>
          {t("cancel")}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel ?? t("confirm")}
        </Button>
      </div>
    </dialog>
  );
}
