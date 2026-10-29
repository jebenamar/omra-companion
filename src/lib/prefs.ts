"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PREFS_KEY } from "./prefs-shared";

export { LOCALE_KEY, PREFS_KEY } from "./prefs-shared";

/**
 * Display preferences, kept in localStorage so they can be applied before first paint
 * (see ThemeScript). User data (progress, favourites…) lives in IndexedDB instead.
 */

export type Theme = "system" | "light" | "dark";

export interface Prefs {
  theme: Theme;
  arabicScale: number;
  transliteration: boolean;
  highContrast: boolean;
}

export const DEFAULT_PREFS: Prefs = {
  theme: "system",
  arabicScale: 1,
  transliteration: true,
  highContrast: false,
};

const EVENT = "omra:prefs";

function read(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<Prefs>) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

let cache: Prefs | null = null;
let cacheRaw: string | null = null;

function snapshot(): Prefs {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(PREFS_KEY);
  } catch {
    /* storage blocked */
  }
  if (cache && raw === cacheRaw) return cache;
  cacheRaw = raw;
  cache = read();
  return cache;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  const dark =
    prefs.theme === "dark" ||
    (prefs.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.contrast = prefs.highContrast ? "high" : "normal";
  root.style.setProperty("--arabic-scale", String(prefs.arabicScale));
}

export function usePrefs(): [Prefs, (patch: Partial<Prefs>) => void] {
  const prefs = useSyncExternalStore(subscribe, snapshot, () => DEFAULT_PREFS);
  const update = useCallback((patch: Partial<Prefs>) => {
    const next = { ...snapshot(), ...patch };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: preference applies to this session only */
    }
    applyPrefs(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [prefs, update];
}
