/**
 * Search normalisation. Used ONLY to build comparison keys: religious texts are never modified.
 */

// Arabic diacritics (tashkeel), Qur'anic annotation marks, tatweel.
const ARABIC_MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;
const ORNATE_BRACKETS = /[﴾﴿]/g;

export function normalizeArabic(input: string): string {
  return input
    .replace(ARABIC_MARKS, "")
    .replace(ORNATE_BRACKETS, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه");
}

export function normalizeLatin(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ'’`ʼ-]/g, "")
    .toLowerCase();
}

export function normalizeForSearch(input: string): string {
  return normalizeLatin(normalizeArabic(input)).replace(/\s+/g, " ").trim();
}

/** True if every word of the query appears in the haystack (order-independent). */
export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalizeForSearch(query);
  if (!q) return true;
  const h = normalizeForSearch(haystack);
  return q.split(" ").every((word) => h.includes(word));
}
