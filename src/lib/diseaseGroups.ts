// Disease families: groups of diseases that look alike on a photo and
// share the same first steps, used ONLY for uncertain scans (top-1
// confidence under 75%). When the model's top two guesses both fall
// in the same family, the results page names the family instead of
// leaving the farmer with nothing — but the result stays "Not sure":
// a family is not a diagnosis, and no chemical is ever named for it
// (one member, septoria, has no chemical recommendation at all, and
// the exact disease is still uncertain).
//
// Rule (measured on the 3,275-image V2 test set): the scan is
// uncertain AND the top-2 predictions are both in the same family AND
// top-1 + top-2 confidence >= 75%. On that test set it fires on
// 146 of 1,052 uncertain scans (13.9%) and the true disease is in
// the named family 89.7% of those times. The same V2 model is used;
// nothing is retrained or re-scored.
//
// Confidences here are percentages (0-100), the same units the
// results page already uses.

export type DiseaseFamilyId = "wheat_leaf_spot" | "wheat_rust" | "cotton_spot";

export type FamilyPrediction = {
  className?: string;
  crop: string;
  disease: string;
  confidence: number;
};

export type DiseaseFamily = {
  id: DiseaseFamilyId;
  name: string;
  members: string[];
  descKey: string;
  stepKeys: string[];
};

export const DISEASE_FAMILIES: Record<DiseaseFamilyId, DiseaseFamily> = {
  wheat_leaf_spot: {
    id: "wheat_leaf_spot",
    name: "Wheat Leaf Spot",
    members: ["wheat_tan_spot", "wheat_leaf_blight", "wheat_septoria"],
    descKey: "family_wheat_leaf_spot_desc",
    stepKeys: [
      "family_step_remove",
      "family_step_airflow",
      "family_step_residue",
      "family_step_confirm",
    ],
  },
  wheat_rust: {
    id: "wheat_rust",
    name: "Wheat Rust",
    members: ["wheat_brown_rust", "wheat_yellow_rust", "wheat_black_rust"],
    descKey: "family_wheat_rust_desc",
    stepKeys: [
      "family_step_remove_heavy",
      "family_step_base_water",
      "family_step_resistant",
      "family_step_confirm",
    ],
  },
  cotton_spot: {
    id: "cotton_spot",
    name: "Cotton Leaf Spot",
    members: ["cotton_bacterial_blight", "cotton_target_spot", "cotton_powdery_mildew"],
    descKey: "family_cotton_spot_desc",
    stepKeys: [
      "family_step_remove",
      "family_step_airflow",
      "family_step_scout",
      "family_step_confirm",
    ],
  },
};

export function detectDiseaseFamily(
  topPredictions?: FamilyPrediction[] | null
): { id: DiseaseFamilyId; name: string; candidates: FamilyPrediction[] } | null {
  if (!topPredictions || topPredictions.length < 2) return null;
  const [first, second] = topPredictions;
  if (first.confidence >= 75) return null;
  if (first.confidence + second.confidence < 75) return null;
  if (!first.className || !second.className) return null;
  for (const family of Object.values(DISEASE_FAMILIES)) {
    if (
      family.members.includes(first.className) &&
      family.members.includes(second.className)
    ) {
      return { id: family.id, name: family.name, candidates: [first, second] };
    }
  }
  return null;
}
