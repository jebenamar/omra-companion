import type { Locale } from "@/i18n/routing";

/** A string available in every supported locale. */
export type LocalizedText = Record<Locale, string>;

/**
 * Review status of a religious text or translation.
 * - "sourced": the Arabic text has been checked against the cited primary source.
 * - "unofficial": translation of meaning written for this app; NOT an official translation,
 *   must be reviewed by a qualified person before being presented as authoritative.
 * - "pending": content awaiting verification; shown with a visible warning.
 */
export type ReviewStatus = "sourced" | "unofficial" | "pending";

export type SourceKind = "quran" | "hadith" | "athar" | "official" | "reference";

export interface Source {
  id: string;
  kind: SourceKind;
  /** Short citation, e.g. "Sahih al-Bukhari 1549". Kept language-neutral where possible. */
  citation: LocalizedText;
  /** Optional authenticity / grading note (e.g. "Hasan according to al-Albani"). */
  grading?: LocalizedText;
  url?: string;
  /** Set for practical information that may change over time (ISO date). */
  checkedOn?: string;
}

/** Legal status of an act. Schools differ; `note` explains divergences. */
export type RulingLevel = "pillar" | "obligation" | "sunnah" | "optional" | "forbidden" | "practical";

export interface Instruction {
  text: LocalizedText;
  ruling?: RulingLevel;
  sourceIds?: string[];
}

export interface Dua {
  id: string;
  category: DuaCategory;
  /** Original Arabic text with diacritics — never modified or "normalised" for display. */
  arabicText: string;
  transliteration?: string;
  translation: LocalizedText;
  explanation: LocalizedText;
  /** When it is appropriate to recite it. */
  when: LocalizedText;
  sourceIds: string[];
  stepIds: string[];
  textStatus: ReviewStatus;
  translationStatus: ReviewStatus;
  audioUrl?: string;
}

export type DuaCategory =
  | "preparation"
  | "ihram"
  | "talbiya"
  | "mosque"
  | "tawaf"
  | "safa-marwa"
  | "quranic"
  | "general"
  | "madinah";

export type StepCounter = "tawaf" | "sai";

export interface UmrahStep {
  id: string;
  order: number;
  arabicName: string;
  title: LocalizedText;
  summary: LocalizedText;
  /** "Que faire ?" — concrete numbered actions. */
  whatToDo: Instruction[];
  /** "Comment faire ?" — detailed explanation paragraphs. */
  howTo: LocalizedText[];
  mistakes: LocalizedText[];
  /** Points where scholars differ, shown separately and neutrally. */
  divergences?: LocalizedText[];
  duaIds: string[];
  videoIds: string[];
  sourceIds: string[];
  counter?: StepCounter;
  /** Ultra-short version for the "I am performing Umrah" focus mode. */
  focus: LocalizedText;
}

export type PlaceCity = "makkah" | "madinah";
export type PlaceKind = "umrah-rite" | "mosque" | "historical" | "hajj";

export interface Place {
  id: string;
  city: PlaceCity;
  kinds: PlaceKind[];
  arabicName: string;
  name: LocalizedText;
  description: LocalizedText;
  history: LocalizedText;
  significance: LocalizedText;
  access?: LocalizedText;
  latitude: number;
  longitude: number;
  /** Coordinates are approximate (site centre) unless marked "surveyed". */
  coordinatesPrecision: "approximate" | "surveyed";
  sourceIds: string[];
  photo?: { src: string; credit: string; license: string };
  contentStatus: ReviewStatus;
}

export type VideoLanguage = Locale;

export interface Video {
  id: string;
  youtubeId: string;
  language: VideoLanguage;
  channel: string;
  title: string;
  /** Offline text summary, localized. */
  summary: LocalizedText;
  durationSeconds?: number;
  stepIds: string[];
  verifiedOn: string;
}

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  label: LocalizedText;
}

export type ChecklistCategory =
  | "documents"
  | "bookings"
  | "religious"
  | "luggage"
  | "health"
  | "phone"
  | "offline";
