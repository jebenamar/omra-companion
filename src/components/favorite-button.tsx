"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { toggleFavorite, useFavorites, type FavoriteType } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function FavoriteButton({ type, id, className }: { type: FavoriteType; id: string; className?: string }) {
  const t = useTranslations("common");
  const favorites = useFavorites(type);
  const on = favorites.has(id);
  const label = on ? t("removeFavorite") : t("addFavorite");
  return (
    <Button
      variant="outline"
      size="icon"
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={cn("shrink-0", className)}
      onClick={() => toggleFavorite(type, id, !on)}
    >
      <Star aria-hidden className={cn(on ? "fill-gold text-gold" : "text-muted")} />
    </Button>
  );
}
