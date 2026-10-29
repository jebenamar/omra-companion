"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, Circle, Navigation } from "lucide-react";
import { setVisited, useVisited } from "@/lib/db";
import { Button } from "../ui/button";
import { FavoriteButton } from "../favorite-button";

export function PlaceActions({
  placeId,
  name,
  latitude,
  longitude,
}: {
  placeId: string;
  name: string;
  latitude: number;
  longitude: number;
}) {
  const t = useTranslations("explore");
  const visited = useVisited();
  const isVisited = visited.has(placeId);
  // Opens the user's navigation app (Google Maps on Android, Google Maps web/app on iOS).
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="space-y-2">
      <Button asChild size="lg" className="w-full">
        <a href={directions} target="_blank" rel="noopener" aria-label={`${t("directions")} — ${name}`}>
          <Navigation aria-hidden />
          {t("directions")}
        </a>
      </Button>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          aria-pressed={isVisited}
          onClick={() => setVisited(placeId, !isVisited)}
        >
          {isVisited ? <CheckCircle2 aria-hidden className="text-primary" /> : <Circle aria-hidden />}
          {isVisited ? t("visited") : t("markVisited")}
        </Button>
        <FavoriteButton type="place" id={placeId} className="size-14" />
      </div>
    </div>
  );
}
