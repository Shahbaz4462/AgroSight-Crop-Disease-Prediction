import type { KnowledgeBaseEntry } from "../types";
import { GUIDE_TRANSLATIONS } from "../data/diseasesGuide_i18n";
import type { Lang } from "./i18n";

// Return the guide text in the selected language. Crop, disease,
// scientific and chemical names stay in English in every language.
// Falls back to the English entry when no translation exists, so a
// missing translation can never show a blank guide.
export function guideText(entry: KnowledgeBaseEntry, lang: Lang) {
  if (lang === "en") return entry;
  const tr = GUIDE_TRANSLATIONS[entry.id]?.[lang];
  if (!tr) return entry;
  return {
    ...entry,
    cause: tr.cause,
    symptoms: tr.symptoms,
    organicSolution: tr.organicSolution,
    chemicalSolution: tr.chemicalSolution,
    prevention: tr.prevention,
  };
}
