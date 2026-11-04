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
  };
  return map[key] ?? null;
}
