import { KnowledgeBaseEntry } from "../types";

// v1 scope: only the detailed guide that matches a delivered model class.
// Other v1 classes get their solution from the backend at scan time
// (backend/model/solutions.json), not from a static mock guide.
// Non-v1 crops (tomato, potato, apple, orange, etc.) are removed here;
// they return to the guide in update 2.0 when a model covers them.

export const DISEASES_KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  {
    id: "kb-wheat-yellow-rust",
    crop: "Wheat",
    disease: "Yellow Rust (Stripe Rust)",
    scientificName: "Puccinia striiformis f. sp. tritici",
    pathogenType: "Fungal",
    cause: "Obligate biotrophic fungus spreading over hundreds of kilometers via wind-borne urediniospores in cool, damp conditions (10-15°C).",
    symptoms: [
      "Parallel bright yellow to lemon-yellow rows of pustules (stripes) along leaf veins",
      "Powdery yellow spores dislodge readily upon rubbing",
      "Premature chlorosis and necrosis of the flag leaf leading to shriveled grains",
      "Glume infection in severe cases with yellow pustules on spikelets",
    ],
    organicSolution: [
      "Bio-priming seeds with antagonistic Trichoderma viride formulations.",
      "Foliar application of diluted liquid seaweed bio-stimulant to boost systemic acquired resistance (SAR).",
      "Intercropping with legumes (chickpea/lentil) to disrupt spore transmission corridors.",
    ],
    chemicalSolution: [
      "Propiconazole 25% EC (Tilt) @ 1.0 ml/L or Tebuconazole 250 EC @ 1.0 ml/L at first sign of stripe formation.",
      "Azoxystrobin + Tebuconazole combination spray @ 1.25 ml/L for extended residual control.",
      "Ensure spray reaches both flag leaf and lower canopy thoroughly.",
    ],
    prevention: [
      "Sow rust-resistant varieties recommended for the target agro-ecological zone (e.g., Akbar-19, Ghazi-19, Fakhr-e-Bhakkar).",
      "Avoid late sowing (complete sowing within the optimal November window).",
      "Conduct regular weekly scouting in early spring as temperatures rise.",
      "Eradicate volunteer wheat plants and barberry bushes (alternate hosts).",
    ],
    lastUpdated: "2026-10-02",
    verifiedBy: "Wheat Research Institute Faisalabad",
  },
];
