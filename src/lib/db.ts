"use client";

import Dexie, { liveQuery, type EntityTable } from "dexie";
import { useEffect, useState } from "react";
import type { CounterState } from "./counter";

/**
 * Local user data (IndexedDB). Never touched by service-worker updates or content updates.
 * Schema changes MUST add a new `db.version(n)` with an upgrade function — never edit an old one.
 */

export interface StepProgress {
  stepId: string;
  completedAt: number;
}

export type FavoriteType = "step" | "dua" | "place";

export interface Favorite {
  key: string; // `${type}:${id}`
  type: FavoriteType;
  id: string;
  createdAt: number;
}

export interface CounterRecord extends CounterState {
  id: "tawaf" | "sai";
  updatedAt: number;
}

export interface ChecklistRecord {
  id: string;
  checked: boolean;
  updatedAt: number;
}

export interface VisitedPlace {
  placeId: string;
  visitedAt: number;
}

export interface KeyValue {
  key: string;
  value: unknown;
}

class OmraDB extends Dexie {
  progress!: EntityTable<StepProgress, "stepId">;
  favorites!: EntityTable<Favorite, "key">;
  counters!: EntityTable<CounterRecord, "id">;
  checklist!: EntityTable<ChecklistRecord, "id">;
  visited!: EntityTable<VisitedPlace, "placeId">;
  kv!: EntityTable<KeyValue, "key">;

  constructor() {
    super("omra-companion");
    this.version(1).stores({
      progress: "stepId",
      favorites: "key, type",
      counters: "id",
      checklist: "id",
      visited: "placeId",
      kv: "key",
    });
  }
}

let instance: OmraDB | null = null;

export function getDb(): OmraDB {
  if (!instance) instance = new OmraDB();
  return instance;
}

/** Subscribe a component to a Dexie live query. Returns `fallback` until the first result. */
export function useLive<T>(query: () => Promise<T>, deps: unknown[], fallback: T): T {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => {
    const sub = liveQuery(query).subscribe({
      next: setValue,
      error: (err) => console.error("[omra] live query failed", err),
    });
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}

// ——— Progress ———
export function useCompletedSteps(): Set<string> {
  return useLive(
    async () => new Set((await getDb().progress.toArray()).map((p) => p.stepId)),
    [],
    new Set<string>(),
  );
}

export async function setStepCompleted(stepId: string, completed: boolean) {
  const db = getDb();
  if (completed) await db.progress.put({ stepId, completedAt: Date.now() });
  else await db.progress.delete(stepId);
}

export const CURRENT_STEP_KEY = "currentStep";

export function useCurrentStep(): string | null | undefined {
  return useLive(
    async () => ((await getDb().kv.get(CURRENT_STEP_KEY))?.value as string | undefined) ?? null,
    [],
    undefined,
  );
}

export async function setCurrentStep(stepId: string) {
  await getDb().kv.put({ key: CURRENT_STEP_KEY, value: stepId });
}

// ——— Favorites ———
export function useFavorites(type: FavoriteType): Set<string> {
  return useLive(
    async () => new Set((await getDb().favorites.where("type").equals(type).toArray()).map((f) => f.id)),
    [type],
    new Set<string>(),
  );
}

export async function toggleFavorite(type: FavoriteType, id: string, on: boolean) {
  const key = `${type}:${id}`;
  if (on) await getDb().favorites.put({ key, type, id, createdAt: Date.now() });
  else await getDb().favorites.delete(key);
}

// ——— Counters ———
export async function saveCounter(id: CounterRecord["id"], state: CounterState) {
  await getDb().counters.put({ id, laps: state.laps, updatedAt: Date.now() });
}

export async function loadCounter(id: CounterRecord["id"]): Promise<CounterState> {
  const rec = await getDb().counters.get(id);
  return { laps: rec?.laps ?? [] };
}

// ——— Checklist ———
export function useChecklist(): Set<string> {
  return useLive(
    async () => new Set((await getDb().checklist.toArray()).filter((c) => c.checked).map((c) => c.id)),
    [],
    new Set<string>(),
  );
}

export async function setChecklistItem(id: string, checked: boolean) {
  await getDb().checklist.put({ id, checked, updatedAt: Date.now() });
}

// ——— Visited places ———
export function useVisited(): Set<string> {
  return useLive(
    async () => new Set((await getDb().visited.toArray()).map((v) => v.placeId)),
    [],
    new Set<string>(),
  );
}

export async function setVisited(placeId: string, visited: boolean) {
  if (visited) await getDb().visited.put({ placeId, visitedAt: Date.now() });
  else await getDb().visited.delete(placeId);
}

// ——— Reset ———
export async function clearAllUserData() {
  const db = getDb();
  await db.transaction("rw", [db.progress, db.favorites, db.counters, db.checklist, db.visited, db.kv], async () => {
    await Promise.all([
      db.progress.clear(),
      db.favorites.clear(),
      db.counters.clear(),
      db.checklist.clear(),
      db.visited.clear(),
      db.kv.clear(),
    ]);
  });
}
