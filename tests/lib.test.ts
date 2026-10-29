import { describe, expect, it } from "vitest";
import { counterReducer, LAP_TOTAL, saiLeg } from "@/lib/counter";
import { matchesQuery, normalizeArabic, normalizeForSearch } from "@/lib/search";
import { swapLocaleInPath } from "@/components/shell/language-switcher";
import { duasById } from "@/content";

describe("counterReducer", () => {
  it("counts up to 7 and never beyond", () => {
    let s = { laps: [] as number[] };
    for (let i = 0; i < 10; i++) s = counterReducer(s, { type: "increment", at: i });
    expect(s.laps).toHaveLength(LAP_TOTAL);
  });
  it("undoes the last lap and resets", () => {
    let s = counterReducer({ laps: [1, 2, 3] }, { type: "undo" });
    expect(s.laps).toEqual([1, 2]);
    s = counterReducer(s, { type: "reset" });
    expect(s.laps).toEqual([]);
    expect(counterReducer(s, { type: "undo" }).laps).toEqual([]);
  });
  it("hydrates from storage, truncating corrupt data", () => {
    expect(counterReducer({ laps: [] }, { type: "hydrate", laps: [1, 2, 3, 4, 5, 6, 7, 8, 9] }).laps).toHaveLength(7);
  });
});

describe("saiLeg", () => {
  it("alternates Safa → Marwa and Marwa → Safa, ending at Marwa", () => {
    expect([1, 2, 3, 4, 5, 6, 7].map((n) => saiLeg(n))).toEqual([
      { from: "safa", to: "marwa" },
      { from: "marwa", to: "safa" },
      { from: "safa", to: "marwa" },
      { from: "marwa", to: "safa" },
      { from: "safa", to: "marwa" },
      { from: "marwa", to: "safa" },
      { from: "safa", to: "marwa" },
    ]);
  });
});

describe("search normalisation", () => {
  it("ignores Arabic diacritics and letter variants", () => {
    expect(normalizeArabic("لَبَّيْكَ")).toBe("لبيك");
    expect(normalizeArabic("إِنَّ")).toBe("ان");
    expect(matchesQuery("لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ", "لبيك اللهم")).toBe(true);
  });
  it("ignores Latin accents, case and apostrophes", () => {
    expect(normalizeForSearch("Miséricorde")).toBe("misericorde");
    expect(matchesQuery("Sa'i entre As-Safa", "sai safa")).toBe(true);
    expect(matchesQuery("Tawaf", "zzz")).toBe(false);
  });
  it("never alters the stored religious text", () => {
    const talbiya = duasById.get("talbiya")!;
    const before = talbiya.arabicText;
    matchesQuery(talbiya.arabicText, "لبيك");
    expect(talbiya.arabicText).toBe(before);
  });
});

describe("swapLocaleInPath", () => {
  it("keeps the current page when switching language", () => {
    expect(swapLocaleInPath("/fr/umrah/tawaf/", "ar")).toBe("/ar/umrah/tawaf/");
    expect(swapLocaleInPath("/es/", "en")).toBe("/en/");
    expect(swapLocaleInPath("/", "fr")).toBe("/fr/");
  });
});
