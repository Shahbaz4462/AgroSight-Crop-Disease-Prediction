// Treatment chemicals shown on the results page, for a confident
// diseased result only. Never for a healthy result, and never for
// "Diseased" rice, where the model does not identify the disease —
// recommending a specific chemical there would be a guess.
//
// Rules for every entry:
//  - Only the active ingredient / product type is named. No dose is
//    given here: the right dose depends on the product, the crop
//    stage and the label, and must be read from the label.
//  - Store links go to the store's search/shop page for that chemical
//    name. Prices and stock are NOT shown here, because they change
//    daily and no store offers a free live price feed for this site.
//    The store page itself shows the current price and stock.
//  - AgroSight is not a seller and earns nothing from these links.
//    Buy only a registered, labelled product and check its expiry date.

export interface Chemical {
  name: string;
  type: "Fungicide" | "Insecticide" | "Organic";
  detail: string;
}

export interface Store {
  name: string;
  detail: string;
  // A function of the chemical name, so each chemical links to its
  // own search on that store.
  urlFor: (chemical: string) => string;
}

export const STORES: Store[] = [
  {
    name: "Daraz.pk",
    detail: "General online marketplace in Pakistan. Mostly garden-size packs from many sellers — check the seller rating and pack size before buying.",
    urlFor: (chemical) => `https://www.daraz.pk/catalog/?q=${encodeURIComponent(chemical)}`,
  },
  {
    name: "GrowPak",
    detail: "Dedicated agriculture store in Pakistan, with brands such as FMC, Syngenta and Bayer. Search the chemical name on its shop page.",
    urlFor: (chemical) => `https://growpak.store/?s=${encodeURIComponent(chemical)}`,
  },
  {
    name: "IR Farm",
    detail: "Dedicated agriculture store (Sargodha) with nationwide delivery in Pakistan. Search the chemical name on its shop page.",
    urlFor: (chemical) => `https://irfarm.com/search?q=${encodeURIComponent(chemical)}`,
  },
];

// Keyed by the model's class name (see class_names.json).
export const CHEMICALS_BY_CLASS: Record<string, Chemical[]> = {
  cotton_aphids: [
    { name: "Acetamiprid", type: "Insecticide", detail: "Systemic insecticide labelled for sucking pests such as aphids. Use only at the dose on the product label." },
    { name: "Neem oil", type: "Organic", detail: "Plant-based oil for light aphid attacks. Spray the underside of leaves, preferably in the evening." },
  ],
  cotton_army_worm: [
    { name: "Chlorantraniliprole", type: "Insecticide", detail: "Insecticide labelled for army worm and other caterpillars (for example Coragen). Use only at the dose on the product label." },
    { name: "Emamectin benzoate", type: "Insecticide", detail: "Insecticide labelled for caterpillars. Works best while larvae are still small. Use only at the dose on the product label." },
  ],
  wheat_brown_rust: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat rust. Use only at the dose on the product label." },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat rust. Use only at the dose on the product label." },
  ],
  wheat_yellow_rust: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat yellow rust. Use only at the dose on the product label." },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat yellow rust. Use only at the dose on the product label." },
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat rust, for longer residual control. Use only at the dose on the product label." },
  ],
  wheat_aphid: [
    { name: "Acetamiprid", type: "Insecticide", detail: "Systemic insecticide labelled for wheat aphids. Use only at the dose on the product label." },
    { name: "Neem oil", type: "Organic", detail: "Plant-based oil for light aphid attacks. Spray the underside of leaves, preferably in the evening." },
  ],

  cotton_bacterial_blight: [
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based bactericide labelled for cotton bacterial blight. Use only at the dose on the product label." },
  ],
  cotton_powdery_mildew: [
    { name: "Sulphur", type: "Organic", detail: "Protective spray for powdery mildew. Do not spray in hot midday sun — it can scorch leaves. Use only at the dose on the product label." },
    { name: "Hexaconazole", type: "Fungicide", detail: "Triazole fungicide labelled for powdery mildew. Use only at the dose on the product label." },
  ],
  cotton_target_spot: [
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for target spot on cotton. Use only at the dose on the product label." },
    { name: "Mancozeb", type: "Fungicide", detail: "Protective fungicide labelled for cotton leaf spots. Use only at the dose on the product label." },
  ],
  wheat_black_rust: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat black (stem) rust. Use only at the dose on the product label." },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat black (stem) rust. Use only at the dose on the product label." },
  ],
  wheat_common_root_rot: [
    { name: "Tebuconazole", type: "Fungicide", detail: "Seed treatment for common root rot — applied to seed before sowing, not as a foliar spray. Use only at the dose on the product label." },
    { name: "Carboxin + Thiram", type: "Fungicide", detail: "Seed treatment for root rot and seed-borne disease — applied to seed before sowing. Use only at the dose on the product label." },
  ],
  wheat_fusarium_head_blight: [
    { name: "Prothioconazole + Tebuconazole", type: "Fungicide", detail: "Combination fungicide labelled for fusarium head blight. Spray at flowering/heading, as the label directs. Use only at the dose on the product label." },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for fusarium head blight. Spray at flowering/heading, as the label directs. Use only at the dose on the product label." },
  ],
  wheat_leaf_blight: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat leaf blight. Use only at the dose on the product label." },
    { name: "Mancozeb", type: "Fungicide", detail: "Protective fungicide labelled for wheat leaf blight. Use only at the dose on the product label." },
  ],
  wheat_mildew: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat powdery mildew. Use only at the dose on the product label." },
    { name: "Sulphur", type: "Organic", detail: "Protective spray for powdery mildew. Do not spray in hot midday sun — it can scorch leaves. Use only at the dose on the product label." },
  ],
  wheat_mite: [
    { name: "Abamectin", type: "Insecticide", detail: "Miticide (acaricide) labelled for mites on wheat. Check the label lists wheat and mites before use. Use only at the dose on the product label." },
    { name: "Neem oil", type: "Organic", detail: "Plant-based oil for light mite attacks. Spray the underside of leaves, preferably in the evening." },
  ],
  wheat_smut: [
    { name: "Carboxin", type: "Fungicide", detail: "Seed treatment for loose smut — applied to seed before sowing, not as a foliar spray. Spraying leaves cannot cure smut. Use only at the dose on the product label." },
    { name: "Tebuconazole", type: "Fungicide", detail: "Seed treatment for loose smut — applied to seed before sowing, not as a foliar spray. Use only at the dose on the product label." },
  ],
  wheat_tan_spot: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat tan spot. Use only at the dose on the product label." },
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat tan spot, for longer residual control. Use only at the dose on the product label." },
  ],
  rice_bacterial_blight: [
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based bactericide labelled for rice bacterial leaf blight. Use only at the dose on the product label." },
  ],
  rice_blast: [
    { name: "Tricyclazole", type: "Fungicide", detail: "Systemic fungicide labelled for rice blast. Use only at the dose on the product label." },
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice blast. Use only at the dose on the product label." },
  ],
  rice_brown_spot: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice brown spot. Use only at the dose on the product label." },
    { name: "Azoxystrobin", type: "Fungicide", detail: "Fungicide labelled for rice brown spot. Use only at the dose on the product label." },
  ],
  rice_tungro: [
    { name: "Imidacloprid", type: "Insecticide", detail: "Controls the green leafhopper that spreads tungro virus. There is no cure for the virus itself. Use only at the dose on the product label." },
  ],
  rice_leaf_scald: [
    { name: "Propiconazole", type: "Fungicide", detail: "Systemic fungicide labelled for rice leaf scald. Use only at the dose on the product label." },
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based fungicide labelled for rice. Use only at the dose on the product label." },
  ],
  rice_sheath_blight: [
    { name: "Validamycin", type: "Fungicide", detail: "Systemic fungicide labelled for rice sheath blight — the standard treatment. Use only at the dose on the product label." },
    { name: "Hexaconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice sheath blight. Use only at the dose on the product label." },
  ],
  cotton_curl_virus: [
    { name: "Imidacloprid", type: "Insecticide", detail: "Controls the whitefly that spreads cotton leaf curl virus. There is no cure for the virus itself. Use only at the dose on the product label." },
    { name: "Acetamiprid", type: "Insecticide", detail: "Controls the whitefly that spreads cotton leaf curl virus. There is no cure for the virus itself. Use only at the dose on the product label." },
  ],
  cotton_fusarium_wilt: [
    { name: "Carbendazim", type: "Fungicide", detail: "Seed treatment labelled for cotton fusarium wilt, before sowing. There is no cure once plants are infected. Use only at the dose on the product label." },
    { name: "Thiophanate-methyl", type: "Fungicide", detail: "Seed treatment labelled for cotton fusarium wilt, before sowing. Use only at the dose on the product label." },
  ],
  // wheat_blast: intentionally absent — exact cause not identified by the model.
  // wheat_septoria: intentionally absent — exact cause not identified by the model.
  // wheat_stem_fly: intentionally absent — exact pest not identified by the model.
  // diseased_rice: intentionally absent — the disease is unspecified.
  // healthy_*: intentionally absent — no chemical is needed.
};

// Map a display crop+disease pair (as shown on the results page) to a
// class name, for results that came from history or samples and do
// not carry a class name.
export function classForDisplay(crop: string, disease: string): string | null {
  const key = `${crop.toLowerCase()}|${disease.toLowerCase()}`;
  const map: Record<string, string> = {
    "cotton|aphids": "cotton_aphids",
    "cotton|army worm": "cotton_army_worm",
    "wheat|brown rust": "wheat_brown_rust",
    "wheat|yellow rust": "wheat_yellow_rust",
    "wheat|aphid": "wheat_aphid",
    "cotton|bacterial blight": "cotton_bacterial_blight",
    "cotton|powdery mildew": "cotton_powdery_mildew",
    "cotton|target spot": "cotton_target_spot",
    "wheat|black rust": "wheat_black_rust",
    "wheat|blast": "wheat_blast",
    "wheat|common root rot": "wheat_common_root_rot",
    "wheat|fusarium head blight": "wheat_fusarium_head_blight",
    "wheat|leaf blight": "wheat_leaf_blight",
    "wheat|mildew": "wheat_mildew",
    "wheat|mite": "wheat_mite",
    "wheat|septoria": "wheat_septoria",
    "wheat|smut": "wheat_smut",
    "wheat|stem fly": "wheat_stem_fly",
    "wheat|tan spot": "wheat_tan_spot",
    "rice|bacterial leaf blight": "rice_bacterial_blight",
    "rice|blast": "rice_blast",
    "rice|brown spot": "rice_brown_spot",
    "rice|leaf scald": "rice_leaf_scald",
    "rice|sheath blight": "rice_sheath_blight",
    "rice|tungro": "rice_tungro",
    "cotton|leaf curl virus": "cotton_curl_virus",
    "cotton|fusarium wilt": "cotton_fusarium_wilt",
  };
  return map[key] ?? null;
}
