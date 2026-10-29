"use client";

import type { Locale } from "@/i18n/routing";

/** Mirrors the structures written by scripts/generate-precache.mjs and public/sw.js. */
export interface PrecacheFile {
  url: string;
  size: number;
}
export interface PrecacheBucket {
  files: PrecacheFile[];
  bytes: number;
}
export interface PrecacheManifest {
  buildId: string;
  generatedAt: string;
  core: PrecacheBucket;
  locales: Record<Locale, PrecacheBucket>;
}
export interface PackInfo {
  buildId: string;
  downloadedAt: number;
  bytes: number;
}
export type Packs = Partial<Record<Locale, PackInfo>>;

const META_CACHE = "omra-meta";
const PACKS_KEY = "/__omra/packs.json";

export function offlineSupported(): boolean {
  return typeof window !== "undefined" && "caches" in window && "serviceWorker" in navigator;
}

export async function fetchManifest(): Promise<PrecacheManifest | null> {
  try {
    const res = await fetch("/precache-manifest.json", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as PrecacheManifest;
  } catch {
    // Offline: the manifest is not precached on purpose; fall back to the cached copy if any.
    return null;
  }
}

export async function readPacks(): Promise<Packs> {
  if (!offlineSupported()) return {};
  const res = await (await caches.open(META_CACHE)).match(PACKS_KEY);
  if (!res) return {};
  try {
    return (await res.json()) as Packs;
  } catch {
    return {};
  }
}

async function writePacks(packs: Packs) {
  await (await caches.open(META_CACHE)).put(
    PACKS_KEY,
    new Response(JSON.stringify(packs), { headers: { "content-type": "application/json" } }),
  );
}

/** Cache name of the build that produced `manifest` (same naming as sw.js). */
const cacheName = (buildId: string) => `omra-${buildId}`;

/**
 * Downloads a language pack into the current build's cache. Files already present are skipped,
 * so an interrupted download can simply be resumed.
 */
export async function downloadPack(
  manifest: PrecacheManifest,
  locale: Locale,
  onProgress: (fraction: number) => void,
): Promise<void> {
  const cache = await caches.open(cacheName(manifest.buildId));
  const files = [...manifest.core.files, ...manifest.locales[locale].files];
  let done = 0;
  const batch = 8;
  for (let i = 0; i < files.length; i += batch) {
    await Promise.all(
      files.slice(i, i + batch).map(async ({ url }) => {
        if (!(await cache.match(url))) {
          const res = await fetch(url, { cache: "no-cache" });
          if (!res.ok) throw new Error(`${url}: ${res.status}`);
          await cache.put(url, res);
        }
        done++;
        onProgress(done / files.length);
      }),
    );
  }
  const packs = await readPacks();
  packs[locale] = { buildId: manifest.buildId, downloadedAt: Date.now(), bytes: manifest.locales[locale].bytes };
  await writePacks(packs);
  try {
    await navigator.storage?.persist?.();
  } catch {
    /* best effort */
  }
}

export async function removePack(manifest: PrecacheManifest, locale: Locale): Promise<void> {
  const cache = await caches.open(cacheName(manifest.buildId));
  await Promise.all(manifest.locales[locale].files.map(({ url }) => cache.delete(url)));
  const packs = await readPacks();
  delete packs[locale];
  await writePacks(packs);
}

export async function storageEstimate(): Promise<{ usage?: number; persisted?: boolean }> {
  try {
    const [estimate, persisted] = await Promise.all([
      navigator.storage?.estimate?.(),
      navigator.storage?.persisted?.(),
    ]);
    return { usage: estimate?.usage, persisted };
  } catch {
    return {};
  }
}
