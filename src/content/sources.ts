import type { LocalizedText, Source } from "./types";

/**
 * Central registry of religious and official references.
 * Hadith numbers follow the numbering used by sunnah.com (Fath al-Bari numbering for al-Bukhari,
 * Fu'ad 'Abd al-Baqi numbering for Muslim). Quran references are surah:verse.
 */

const quran = (surah: number, verses: string, nameAr: string, name: string): Source => ({
  id: `quran-${surah}-${verses}`,
  kind: "quran",
  citation: {
    ar: `القرآن الكريم، سورة ${nameAr}، الآية ${verses}`,
    fr: `Coran, sourate ${name} (${surah}), verset ${verses}`,
    en: `Qur'an, Surah ${name} (${surah}), verse ${verses}`,
    es: `Corán, sura ${name} (${surah}), aleya ${verses}`,
  },
  url: `https://quran.com/${surah}/${verses}`,
});

type Collection = "bukhari" | "muslim" | "abudawud" | "tirmidhi" | "ibnmajah";

const collectionNames: Record<Collection, LocalizedText> = {
  bukhari: { ar: "صحيح البخاري", fr: "Sahih al-Bukhari", en: "Sahih al-Bukhari", es: "Sahih al-Bujari" },
  muslim: { ar: "صحيح مسلم", fr: "Sahih Muslim", en: "Sahih Muslim", es: "Sahih Muslim" },
  abudawud: { ar: "سنن أبي داود", fr: "Sunan Abi Dawud", en: "Sunan Abi Dawud", es: "Sunan Abi Dawud" },
  tirmidhi: { ar: "جامع الترمذي", fr: "Jami' at-Tirmidhi", en: "Jami' at-Tirmidhi", es: "Yami' at-Tirmidhi" },
  ibnmajah: { ar: "سنن ابن ماجه", fr: "Sunan Ibn Majah", en: "Sunan Ibn Majah", es: "Sunan Ibn Mayah" },
};

/**
 * `urlSuffix`: sunnah.com splits some hadiths into variants (e.g. Muslim 1251 → "1251a").
 * Every reference below was opened on sunnah.com on 2026-10-29 and its Arabic text compared.
 */
const hadith = (collection: Collection, number: string, grading?: LocalizedText, urlSuffix = ""): Source => {
  const n = collectionNames[collection];
  return {
    id: `${collection}-${number}`,
    kind: "hadith",
    citation: {
      ar: `${n.ar}، رقم ${number}`,
      fr: `${n.fr}, n° ${number}`,
      en: `${n.en}, no. ${number}`,
      es: `${n.es}, n.º ${number}`,
    },
    grading,
    url: `https://sunnah.com/${collection}:${number}${urlSuffix}`,
  };
};

const albaniSahih: LocalizedText = {
  ar: "صححه الألباني",
  fr: "Jugé authentique (sahih) par al-Albani",
  en: "Graded authentic (sahih) by al-Albani",
  es: "Calificado como auténtico (sahih) por al-Albani",
};

const albaniHasan: LocalizedText = {
  ar: "حسّنه الألباني",
  fr: "Jugé bon (hasan) par al-Albani",
  en: "Graded good (hasan) by al-Albani",
  es: "Calificado como bueno (hasan) por al-Albani",
};

/** `checkedOn` is set only when the page was actually opened and checked on that date. */
const official = (id: string, name: LocalizedText, url: string, checkedOn?: string): Source => ({
  id,
  kind: "official",
  citation: name,
  url,
  checkedOn,
});

export const sources: Source[] = [
  // Qur'an
  quran(2, "125", "البقرة", "Al-Baqarah"),
  quran(2, "127", "البقرة", "Al-Baqarah"),
  quran(2, "144", "البقرة", "Al-Baqarah"),
  quran(2, "158", "البقرة", "Al-Baqarah"),
  quran(2, "196", "البقرة", "Al-Baqarah"),
  quran(2, "197", "البقرة", "Al-Baqarah"),
  quran(2, "198", "البقرة", "Al-Baqarah"),
  quran(2, "201", "البقرة", "Al-Baqarah"),
  quran(3, "8", "آل عمران", "Al 'Imran"),
  quran(3, "96-97", "آل عمران", "Al 'Imran"),
  quran(5, "95", "المائدة", "Al-Ma'idah"),
  quran(7, "23", "الأعراف", "Al-A'raf"),
  quran(9, "40", "التوبة", "At-Tawbah"),
  quran(14, "40-41", "إبراهيم", "Ibrahim"),
  quran(17, "1", "الإسراء", "Al-Isra'"),
  quran(22, "29", "الحج", "Al-Hajj"),
  quran(33, "9-10", "الأحزاب", "Al-Ahzab"),
  quran(48, "27", "الفتح", "Al-Fath"),
  quran(96, "1-5", "العلق", "Al-'Alaq"),

  // Hadith — al-Bukhari
  hadith("bukhari", "3"),
  hadith("bukhari", "305"),
  hadith("bukhari", "831"),
  hadith("bukhari", "1189"),
  hadith("bukhari", "1190"),
  hadith("bukhari", "1193"),
  hadith("bukhari", "1196"),
  hadith("bukhari", "1524"),
  hadith("bukhari", "1531"),
  hadith("bukhari", "1542"),
  hadith("bukhari", "1549"),
  hadith("bukhari", "1597"),
  hadith("bukhari", "1609"),
  hadith("bukhari", "1613"),
  hadith("bukhari", "1727"),
  hadith("bukhari", "1784"),
  hadith("bukhari", "1838"),
  hadith("bukhari", "3653"),
  hadith("bukhari", "4083"),
  hadith("bukhari", "5089"),
  hadith("bukhari", "6306"),

  // Hadith — Muslim
  hadith("muslim", "713"),
  hadith("muslim", "974"),
  hadith("muslim", "975"),
  hadith("muslim", "1177"),
  hadith("muslim", "1181"),
  hadith("muslim", "1184"),
  hadith("muslim", "1207"),
  hadith("muslim", "1218"),
  hadith("muslim", "1251", undefined, "a"),
  hadith("muslim", "1267"),
  hadith("muslim", "1270"),
  hadith("muslim", "1301"),
  hadith("muslim", "1342"),
  hadith("muslim", "1391"),
  hadith("muslim", "1392"),
  hadith("muslim", "1394"),
  hadith("muslim", "1397"),
  hadith("muslim", "1399"),
  hadith("muslim", "1409"),
  hadith("muslim", "2473"),

  // Hadith — Sunan
  hadith("abudawud", "466", albaniSahih),
  hadith("abudawud", "1884", albaniSahih),
  hadith("abudawud", "1892", albaniHasan),
  hadith("abudawud", "1985", albaniSahih),
  hadith("tirmidhi", "324", {
    ar: "قال الترمذي: حسن غريب",
    fr: "Jugé « hasan gharib » par at-Tirmidhi",
    en: "Graded \"hasan gharib\" by at-Tirmidhi",
    es: "Calificado como «hasan gharib» por at-Tirmidhi",
  }),
  hadith("tirmidhi", "2140", {
    ar: "قال الترمذي: حسن",
    fr: "Jugé bon (hasan) par at-Tirmidhi",
    en: "Graded good (hasan) by at-Tirmidhi",
    es: "Calificado como bueno (hasan) por at-Tirmidhi",
  }),
  hadith("ibnmajah", "3062", {
    ar: "حسّنه بعض المحققين، وتكلّم آخرون في إسناده",
    fr: "Jugé hasan (édition Darussalam) ; sa chaîne est discutée par d'autres savants",
    en: "Graded hasan (Darussalam edition); its chain is disputed by other scholars",
    es: "Calificado como hasan (edición Darussalam); su cadena es discutida por otros sabios",
  }),

  // Official references (practical information that may change)
  official(
    "nusuk-umrah-journey",
    {
      ar: "منصة نسك — رحلة العمرة",
      fr: "Plateforme Nusuk — Parcours de la Omra",
      en: "Nusuk platform — Umrah journey",
      es: "Plataforma Nusuk — Recorrido de la Umrah",
    },
    "https://umrah.nusuk.sa/Journey",
    "2026-10-29",
  ),
  official(
    "nusuk",
    { ar: "منصة نسك", fr: "Plateforme Nusuk", en: "Nusuk platform", es: "Plataforma Nusuk" },
    "https://www.nusuk.sa",
    "2026-10-29",
  ),
  official(
    "haj-gov",
    {
      ar: "وزارة الحج والعمرة — المملكة العربية السعودية",
      fr: "Ministère du Hajj et de la Omra — Arabie saoudite",
      en: "Ministry of Hajj and Umrah — Saudi Arabia",
      es: "Ministerio del Hajj y la Umrah — Arabia Saudí",
    },
    "https://haj.gov.sa",
    "2026-10-29",
  ),
  official(
    "alharamain",
    {
      ar: "الهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي",
      fr: "Autorité générale des affaires des deux Saintes Mosquées",
      en: "General Authority for the Affairs of the Two Holy Mosques",
      es: "Autoridad General de los Asuntos de las Dos Sagradas Mezquitas",
    },
    // Unreachable from the build environment on 2026-10-29: not marked as checked.
    "https://alharamain.gov.sa",
  ),
];

export const sourcesById: ReadonlyMap<string, Source> = new Map(sources.map((s) => [s.id, s]));
