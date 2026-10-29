/* Omra Companion — service worker.
 *
 * Strategy
 * - Each build has its own cache "omra-<BUILD_ID>" (BUILD_ID is a content hash injected at build time).
 * - install: precache the core files (JS, CSS, fonts, icons) + every language pack the user has
 *   downloaded. If anything fails, install fails and the previous version keeps working.
 * - activate: delete caches from older builds. IndexedDB (progress, counters, favourites) is never touched.
 * - fetch: cache-first for precached files (ignoring query strings, e.g. RSC "?_rsc="), network fallback.
 */
const BUILD_ID = "__BUILD_ID__";
const CACHE = `omra-${BUILD_ID}`;
const META_CACHE = "omra-meta";
const PACKS_KEY = "/__omra/packs.json";
const MANIFEST_URL = "/precache-manifest.json";
const LOCALES = ["ar", "fr", "en", "es"];

async function readPacks() {
  const meta = await caches.open(META_CACHE);
  const res = await meta.match(PACKS_KEY);
  if (!res) return {};
  try {
    return await res.json();
  } catch {
    return {};
  }
}

async function writePacks(packs) {
  const meta = await caches.open(META_CACHE);
  await meta.put(PACKS_KEY, new Response(JSON.stringify(packs), { headers: { "content-type": "application/json" } }));
}

async function cacheAll(cache, urls) {
  const batch = 12;
  for (let i = 0; i < urls.length; i += batch) {
    await Promise.all(
      urls.slice(i, i + batch).map(async (url) => {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`${url} → ${res.status}`);
        await cache.put(url, res);
      }),
    );
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const manifest = await (await fetch(MANIFEST_URL, { cache: "no-store" })).json();
      const packs = await readPacks();
      const cache = await caches.open(CACHE);
      const urls = manifest.core.files.map((f) => f.url);
      const refreshed = [];
      for (const locale of Object.keys(packs)) {
        const pack = manifest.locales[locale];
        if (!pack) continue;
        urls.push(...pack.files.map((f) => f.url));
        refreshed.push(locale);
      }
      await cacheAll(cache, urls);
      const now = Date.now();
      for (const locale of refreshed) {
        packs[locale] = { buildId: manifest.buildId, downloadedAt: now, bytes: manifest.locales[locale].bytes };
      }
      await writePacks(packs);
      // First install: take control immediately. Updates wait for the user (see SKIP_WAITING).
      if (!self.registration.active) await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith("omra-") && k !== CACHE && k !== META_CACHE).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

function localeOf(pathname) {
  const seg = pathname.split("/")[1];
  return LOCALES.includes(seg) ? seg : null;
}

async function handleNavigation(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  try {
    return await fetch(request);
  } catch {
    const url = new URL(request.url);
    const locale = localeOf(url.pathname);
    const fallback =
      (locale && (await cache.match(`/${locale}/`))) ||
      (await cache.match("/")) ||
      (await cache.match("/404.html"));
    return (
      fallback ||
      new Response("<h1>Offline</h1>", { status: 503, headers: { "content-type": "text/html; charset=utf-8" } })
    );
  }
}

async function handleAsset(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(request);
  const url = new URL(request.url);
  // Immutable build assets fetched before they were precached are kept for offline use.
  if (res.ok && url.pathname.startsWith("/_next/static/")) cache.put(request, res.clone());
  return res;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // YouTube, map tiles… go to the network.
  if (url.pathname === MANIFEST_URL || url.pathname === "/sw.js") return;
  // Vercel Analytics (script + beacons) always goes to the network and is never cached.
  if (url.pathname.startsWith("/_vercel/")) return;
  if (request.mode === "navigate") event.respondWith(handleNavigation(request));
  else event.respondWith(handleAsset(request));
});
