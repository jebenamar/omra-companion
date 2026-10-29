import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { spawn } from "node:child_process";

const locales = [
  { code: "ar", dir: "rtl", nav: ["الرئيسية", "عمرتي", "الأدعية", "استكشف", "المزيد"] },
  { code: "fr", dir: "ltr", nav: ["Accueil", "Ma Omra", "Invocations", "Explorer", "Plus"] },
  { code: "en", dir: "ltr", nav: ["Home", "My Umrah", "Supplications", "Explore", "More"] },
  { code: "es", dir: "ltr", nav: ["Inicio", "Mi Umrah", "Súplicas", "Explorar", "Más"] },
] as const;

const PAGES = ["", "umrah/", "umrah/tawaf/", "umrah/sai/", "umrah/focus/", "duas/", "explore/", "explore/kaaba/", "checklist/", "more/", "settings/", "offline/", "sources/", "about/", "favorites/"];

// Note: page.waitForFunction() does not await async predicates (a Promise is truthy), hence expect.poll.
async function waitForServiceWorker(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(async () => {
          const reg = await navigator.serviceWorker.getRegistration();
          return Boolean(reg?.active && navigator.serviceWorker.controller);
        }),
      { timeout: 60_000 },
    )
    .toBe(true);
}

async function waitForPack(page: Page, locale: string) {
  await expect
    .poll(
      () =>
        page.evaluate(async (l) => {
          const res = await (await caches.open("omra-meta")).match("/__omra/packs.json");
          return Boolean(res && (await res.json())[l]);
        }, locale),
      { timeout: 90_000 },
    )
    .toBe(true);
}

test.describe("navigation in four languages", () => {
  for (const l of locales) {
    test(`${l.code}: navigation labels, lang and dir on every page`, async ({ page }) => {
      for (const path of PAGES) {
        const res = await page.goto(`/${l.code}/${path}`);
        expect(res?.status(), path).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", l.code);
        await expect(page.locator("html")).toHaveAttribute("dir", l.dir);
        await expect(page.locator("h1").first()).toBeVisible();
      }
      const nav = page.getByRole("navigation").last();
      for (const label of l.nav) await expect(nav.getByText(label, { exact: true })).toBeVisible();
    });
  }

  test("root redirects to the browser language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "es-ES" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/es\/$/);
    await context.close();
  });
});

test("Arabic layout is right-to-left", async ({ page }) => {
  await page.goto("/ar/umrah/");
  const box = await page.locator("ol > li a").first().boundingBox();
  const badge = await page.locator("ol > li a > span").first().boundingBox();
  // In RTL the step number badge sits on the right side of the card.
  expect(badge!.x).toBeGreaterThan(box!.x + box!.width / 2);
});

test("language switch keeps the page and the progress", async ({ page }) => {
  await page.goto("/fr/umrah/tawaf/");
  const inc = page.getByTestId("tawaf-increment");
  await expect(inc).toBeEnabled();
  await inc.click();
  await inc.click();
  await inc.click();
  await page.getByRole("button", { name: "Marquer comme terminée" }).click();
  await page.getByTestId("language-select").selectOption("es");
  await expect(page).toHaveURL(/\/es\/umrah\/tawaf\/$/);
  await expect(page.getByText("Vuelta 4 de 7")).toBeVisible();
  await expect(page.getByRole("button", { name: "Completada" })).toBeVisible();
});

test("Sa'i counter shows direction of each lap", async ({ page }) => {
  await page.goto("/en/umrah/sai/");
  const inc = page.getByTestId("sai-increment");
  await expect(inc).toBeEnabled();
  await expect(page.getByTestId("sai-leg")).toContainText(/As-Safa.*Al-Marwah/);
  await inc.click();
  await expect(page.getByTestId("sai-leg")).toContainText(/Al-Marwah.*As-Safa/);
});

test("installable PWA: manifest and service worker", async ({ page }) => {
  await page.goto("/fr/");
  const href = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(href).toBe("/manifest-fr.webmanifest");
  const manifest = await (await page.request.get(href!)).json();
  expect(manifest.start_url).toBe("/fr/");
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons.some((i: { sizes: string }) => i.sizes === "512x512")).toBe(true);
  await waitForServiceWorker(page);
});

test("reopens and navigates without network; data survives", async ({ page, context }) => {
  // A dedicated server that the test really shuts down: afterwards only the service worker can answer.
  // (Playwright's own offline/route emulation bypasses service workers, so it cannot be used here.)
  const port = 4180;
  const base = `http://localhost:${port}`;
  const server = spawn(process.execPath, ["scripts/serve-static.mjs"], { env: { ...process.env, PORT: String(port) } });
  try {
    await expect.poll(async () => (await fetch(`${base}/fr/`).catch(() => null))?.status, { timeout: 15_000 }).toBe(200);
    await page.goto(`${base}/fr/`);
    await waitForServiceWorker(page);
    await waitForPack(page, "fr");
    await page.goto(`${base}/fr/umrah/tawaf/`);
    await page.getByTestId("tawaf-increment").click();
    await expect(page.getByText("Tour 2 sur 7")).toBeVisible();

    server.kill();
    await expect.poll(async () => (await fetch(`${base}/fr/`).catch(() => null))?.status ?? 0).toBe(0);

    await page.goto(`${base}/fr/umrah/tawaf/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tawaf");
    await expect(page.getByText("Tour 2 sur 7")).toBeVisible();

    // Preloaded content: every step, the supplications, place cards, checklist and focus mode.
    for (const path of ["/fr/umrah/ihram/", "/fr/umrah/sai/", "/fr/duas/", "/fr/explore/masjid-quba/", "/fr/checklist/", "/fr/umrah/focus/"]) {
      const res = await page.goto(base + path);
      expect(res?.ok(), path).toBe(true);
      await expect(page.locator("h1").first()).toBeVisible();
    }
    // Focus mode resumes at the last step opened (Sa'i, visited just before).
    await expect(page.getByTestId("focus-step-title")).toHaveText("Sa'i");

    // Client-side navigation (RSC payloads) also works without the server.
    await page.getByRole("navigation").last().getByText("Invocations", { exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/duas\/$/);
    await expect(page.getByTestId("dua-card").first()).toBeVisible();

    // The offline banner follows the browser's connectivity state.
    await context.setOffline(true);
    await expect(page.getByText(/Vous êtes hors ligne/)).toBeVisible();
    await context.setOffline(false);
  } finally {
    server.kill();
  }
});

test("an app update never erases user data", async ({ page }) => {
  await page.goto("/fr/umrah/ihram/");
  await page.getByRole("button", { name: "Marquer comme terminée" }).click();
  await waitForServiceWorker(page);
  // Simulate the activation of a new version: old caches are deleted, IndexedDB is untouched.
  await page.evaluate(async () => {
    for (const k of await caches.keys()) if (k !== "omra-meta") await caches.delete(k);
    await (await navigator.serviceWorker.getRegistration())?.update();
  });
  await page.reload();
  await expect(page.getByRole("button", { name: "Terminée" })).toBeVisible();
});

test.describe("accessibility (WCAG 2.2 AA, axe)", () => {
  for (const path of ["/fr/", "/ar/umrah/tawaf/", "/en/duas/", "/es/explore/", "/fr/umrah/focus/", "/fr/checklist/"]) {
    test(path, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(500);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
});
