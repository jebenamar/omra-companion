/**
 * Content validation — run with `pnpm validate:content` (also part of `pnpm test`).
 * Checks: four languages everywhere, no missing UI keys, references resolve, URLs are well formed,
 * Arabic religious texts are present and untouched, unverified content is reported.
 */
import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { checklist, duas, places, sources, sourcesById, steps, videos } from "@/content";
import type { LocalizedText } from "@/content/types";
import ar from "@/messages/ar.json";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const messages = { ar, fr, en, es } as Record<string, unknown>;

function flatten(obj: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") Object.assign(out, flatten(v, key));
    else out[key] = String(v);
  }
  return out;
}

/** Keys allowed to be empty in Arabic: translations of an Arabic original are not shown in Arabic. */
const AR_EMPTY_OK = new Set(["home.verseTranslation", "home.verseTranslationNote"]);

function expectComplete(text: LocalizedText, where: string, { arabicOptional = false } = {}) {
  for (const l of locales) {
    if (l === "ar" && arabicOptional) continue;
    expect(text[l]?.trim(), `${where} [${l}] is empty`).toBeTruthy();
  }
}

const ARABIC = /[؀-ۿ]/;
const DIACRITICS = /[ً-ْ]/;

describe("UI messages", () => {
  const reference = flatten(messages.fr);
  for (const l of locales) {
    it(`${l}.json has exactly the same keys as fr.json`, () => {
      const keys = Object.keys(flatten(messages[l]));
      expect(keys.sort()).toEqual(Object.keys(reference).sort());
    });
    it(`${l}.json has no empty strings`, () => {
      for (const [k, v] of Object.entries(flatten(messages[l]))) {
        if (l === "ar" && AR_EMPTY_OK.has(k)) continue;
        expect(v.trim(), `${l}:${k}`).not.toBe("");
      }
    });
  }
  it("ICU placeholders match across locales", () => {
    const placeholders = (s: string) => (s.match(/\{(\w+)/g) ?? []).sort();
    for (const [k, v] of Object.entries(reference)) {
      for (const l of locales) {
        const other = flatten(messages[l])[k];
        if (l === "ar" && AR_EMPTY_OK.has(k)) continue;
        expect(placeholders(other), `${l}:${k}`).toEqual(placeholders(v));
      }
    }
  });
});

describe("Umrah steps", () => {
  it("are ordered 1..n with unique ids", () => {
    expect(steps.map((s) => s.order)).toEqual(steps.map((_, i) => i + 1));
    expect(new Set(steps.map((s) => s.id)).size).toBe(steps.length);
  });
  it("cover the nine expected stages", () => {
    expect(steps.map((s) => s.id)).toEqual([
      "preparation",
      "ihram",
      "talbiya",
      "entering-haram",
      "tawaf",
      "prayer-zamzam",
      "sai",
      "halq-taqsir",
      "completion",
    ]);
  });
  for (const step of steps) {
    it(`${step.id}: complete in four languages`, () => {
      expectComplete(step.title, `${step.id}.title`);
      expectComplete(step.summary, `${step.id}.summary`);
      expectComplete(step.focus, `${step.id}.focus`);
      step.whatToDo.forEach((w, i) => expectComplete(w.text, `${step.id}.whatToDo[${i}]`));
      step.howTo.forEach((h, i) => expectComplete(h, `${step.id}.howTo[${i}]`));
      step.mistakes.forEach((m, i) => expectComplete(m, `${step.id}.mistakes[${i}]`));
      step.divergences?.forEach((d, i) => expectComplete(d, `${step.id}.divergences[${i}]`));
      expect(step.whatToDo.length).toBeGreaterThan(0);
      expect(step.sourceIds.length, `${step.id} has no sources`).toBeGreaterThan(0);
    });
    it(`${step.id}: all references resolve`, () => {
      const ids = [...step.sourceIds, ...step.whatToDo.flatMap((w) => w.sourceIds ?? [])];
      for (const id of ids) expect(sourcesById.has(id), `unknown source ${id}`).toBe(true);
      for (const id of step.duaIds) expect(duas.some((d) => d.id === id), `unknown dua ${id}`).toBe(true);
      for (const id of step.videoIds) expect(videos.some((v) => v.id === id), `unknown video ${id}`).toBe(true);
    });
  }
  it("only Tawaf and Sa'i have counters", () => {
    expect(steps.filter((s) => s.counter).map((s) => [s.id, s.counter])).toEqual([
      ["tawaf", "tawaf"],
      ["sai", "sai"],
    ]);
  });
});

describe("Supplications", () => {
  it("have unique ids", () => expect(new Set(duas.map((d) => d.id)).size).toBe(duas.length));
  for (const dua of duas) {
    it(`${dua.id}: Arabic original, translations and sources`, () => {
      expect(ARABIC.test(dua.arabicText)).toBe(true);
      expect(DIACRITICS.test(dua.arabicText), `${dua.id} must be vocalised`).toBe(true);
      expect(dua.arabicText).toBe(dua.arabicText.normalize("NFC"));
      expectComplete(dua.translation, `${dua.id}.translation`, { arabicOptional: true });
      expectComplete(dua.explanation, `${dua.id}.explanation`);
      expectComplete(dua.when, `${dua.id}.when`);
      expect(dua.sourceIds.length, `${dua.id} has no source`).toBeGreaterThan(0);
      for (const id of dua.sourceIds) expect(sourcesById.has(id), `unknown source ${id}`).toBe(true);
      for (const id of dua.stepIds) expect(steps.some((s) => s.id === id), `unknown step ${id}`).toBe(true);
    });
  }
  it("no supplication is attributed to a specific Tawaf or Sa'i circuit", () => {
    for (const d of duas) expect(d.id).not.toMatch(/(circuit|shawt|lap)-?\d/i);
  });
});

describe("Places", () => {
  for (const p of places) {
    it(`${p.id}: four languages, coordinates and sources`, () => {
      expectComplete(p.name, `${p.id}.name`);
      expectComplete(p.description, `${p.id}.description`);
      expectComplete(p.history, `${p.id}.history`);
      expectComplete(p.significance, `${p.id}.significance`);
      if (p.access) expectComplete(p.access, `${p.id}.access`);
      const [latMin, latMax] = p.city === "makkah" ? [21.2, 21.6] : [24.3, 24.6];
      expect(p.latitude).toBeGreaterThan(latMin);
      expect(p.latitude).toBeLessThan(latMax);
      expect(p.longitude).toBeGreaterThan(39.4);
      expect(p.longitude).toBeLessThan(40.1);
      for (const id of p.sourceIds) expect(sourcesById.has(id), `unknown source ${id}`).toBe(true);
    });
  }
  it("historical and Hajj sites are never labelled as Umrah rites", () => {
    for (const p of places) {
      if (p.kinds.includes("hajj") || p.kinds.includes("historical")) expect(p.kinds).not.toContain("umrah-rite");
    }
  });
});

describe("Sources", () => {
  it("have unique ids, citations in four languages and https URLs", () => {
    expect(new Set(sources.map((s) => s.id)).size).toBe(sources.length);
    for (const s of sources) {
      expectComplete(s.citation, s.id);
      if (s.grading) expectComplete(s.grading, `${s.id}.grading`);
      if (s.url) expect(s.url).toMatch(/^https:\/\/[\w.-]+\.[a-z]{2,}(\/|$)/);
    }
  });
  it("Qur'an references point to quran.com with matching surah:verse", () => {
    for (const s of sources.filter((x) => x.kind === "quran")) {
      const [, surah, verses] = s.id.match(/^quran-(\d+)-([\d-]+)$/)!;
      expect(s.url).toBe(`https://quran.com/${surah}/${verses}`);
    }
  });
});

describe("Videos", () => {
  it("only verified, well-formed YouTube entries", () => {
    for (const v of videos) {
      expect(v.youtubeId).toMatch(/^[\w-]{11}$/);
      expect(v.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expectComplete(v.summary, `${v.id}.summary`);
      for (const id of v.stepIds) expect(steps.some((s) => s.id === id)).toBe(true);
    }
  });
});

describe("Checklist", () => {
  it("items are translated and unique", () => {
    expect(new Set(checklist.map((c) => c.id)).size).toBe(checklist.length);
    for (const c of checklist) expectComplete(c.label, c.id);
  });
});

describe("Verification report", () => {
  it("lists content still awaiting human review", () => {
    const pendingPlaces = places.filter((p) => p.contentStatus === "pending").map((p) => p.id);
    const unofficialTranslations = duas.filter((d) => d.translationStatus !== "sourced").length;
    console.info(
      `[content] places pending verification: ${pendingPlaces.join(", ") || "none"}\n` +
        `[content] supplications with unofficial translations: ${unofficialTranslations}/${duas.length}\n` +
        `[content] verified videos: ${videos.length}`,
    );
    expect(true).toBe(true);
  });
});
