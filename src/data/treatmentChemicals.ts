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
  type: "Fungicide" | "Insecticide" | "Organic" | "Bactericide";
  detail: string;
  /** Reference: institution/company + document/label the chemical was verified from. */
  source?: string;
  /** Exact page URL of the reference above, when one is verified. Shown as a button; no button when absent. */
  sourceUrl?: string;
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
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat rust. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations (Tilt 200 ml/acre); AARI trial, cv. Akbar-19 (Tilt 88.9% disease decrease)", sourceUrl: "https://www.journalaprj.com/index.php/APRJ/article/download/257/514/413" },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat rust. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations (Folicur)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801523" },
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat rust, for longer residual control. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — leaf rust trial (Amistar Top 83.4% disease decrease)", sourceUrl: "https://www.journalaprj.com/index.php/APRJ/article/download/257/514/413" },
  ],
  wheat_yellow_rust: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat yellow rust. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations (Tilt); ICAR — stripe rust trial (propiconazole 25% EC economically best)", sourceUrl: "https://fasalbachao.com/wheat-rust-control/?redirect_uri=https" },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat yellow rust. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations (Folicur)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801523" },
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat rust, for longer residual control. Use only at the dose on the product label.", source: "Syngenta Pakistan — Amistar Top 325 SC product label (wheat rust); Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations", sourceUrl: "https://www.syngenta.com.pk/product/crop-protection/amistar-top" },
  ],
  wheat_aphid: [
    { name: "Acetamiprid", type: "Insecticide", detail: "Systemic insecticide labelled for wheat aphids. Use only at the dose on the product label." },
    { name: "Neem oil", type: "Organic", detail: "Plant-based oil for light aphid attacks. Spray the underside of leaves, preferably in the evening." },
  ],

  cotton_bacterial_blight: [
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based bactericide labelled for cotton bacterial blight. Use only at the dose on the product label.", source: "Plantix — Bacterial Blight of Cotton (plant disease library); UAF Faisalabad / AARI Dera Ghazi Khan field trials, Pakistan", sourceUrl: "https://plantix.net/en/library/plant-diseases/300044/bacterial-blight-of-cotton/" },
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
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat black (stem) rust. Use only at the dose on the product label.", source: "CABI Plantwise Plus Knowledge Bank — stem rust PMDG (propiconazole); FAO AGRIS stem-rust fungicide trial", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801523" },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat black (stem) rust. Use only at the dose on the product label.", source: "FAO AGRIS stem-rust fungicide trial (tebuconazole 74.92% incidence reduction); CABI Plantwise Plus Knowledge Bank — stem rust PMDG", sourceUrl: "https://agris.fao.org/search/en/providers/122648/records/65fab1a4ce216acd4b804f69" },
    { name: "Azoxystrobin + Difenoconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat stem rust, as an alternative to triazoles. Use only at the dose on the product label.", source: "Ayub Agricultural Research Institute (AARI), Faisalabad — wheat rust control recommendations (Amistar Top 200 ml/acre); FAO AGRIS stem-rust fungicide trial", sourceUrl: "https://fasalbachao.com/wheat-rust-control/?redirect_uri=https" },
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
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based bactericide labelled for rice bacterial leaf blight. Use only at the dose on the product label.", source: "Punjab Agriculture Department, Pest Warning & Quality Control of Pesticides — bacterial leaf blight alert, 14 Sep 2026; Nasir et al. 2019, J. Agric. Res. (AARI Faisalabad trial, copper oxychloride 76.48% control)", sourceUrl: "http://jaragri.com/jar/index.php/jar/article/view/299" },
    { name: "Kasugamycin", type: "Bactericide", detail: "Antibiotic bactericide recommended by the Punjab Agriculture Department for rice bacterial leaf blight. Use only at the dose on the product label.", source: "Punjab Agriculture Department, Pest Warning & Quality Control of Pesticides — bacterial leaf blight alert, 14 Sep 2026 (kasugamycin first-listed); Nasir et al. 2019, J. Agric. Res. (Cordate 86.31%, Castle 87.97% control)", sourceUrl: "http://jaragri.com/jar/index.php/jar/article/view/299" },
  ],
  rice_blast: [
    { name: "Tricyclazole", type: "Fungicide", detail: "Systemic fungicide labelled for rice blast. Use only at the dose on the product label.", source: "Punjab Agriculture Department advisory — Tricyclazole 75% WP for rice blast; IRRI Rice Knowledge Bank — Blast (leaf/collar)", sourceUrl: "http://knowledgebank.irri.org/index.php?option=com_zoo&task=item&item_id=808&itemid=739" },
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice blast. Use only at the dose on the product label.", source: "Syngenta Pakistan — Filia (tricyclazole + propiconazole) product label, rice blast; IRRI Rice Knowledge Bank — Blast (leaf/collar)", sourceUrl: "http://knowledgebank.irri.org/index.php?option=com_zoo&task=item&item_id=808&itemid=739" },
  ],
  rice_brown_spot: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice brown spot. Use only at the dose on the product label.", source: "IRRI Rice Knowledge Bank — Brown Spot (propiconazole listed); Syngenta Pakistan — Tilt 250 EC product label", sourceUrl: "http://www.knowledgebank.irri.org/decision-tools/rice-doctor/rice-doctor-fact-sheets/item/brown-spot" },
    { name: "Azoxystrobin", type: "Fungicide", detail: "Fungicide labelled for rice brown spot. Use only at the dose on the product label.", source: "IRRI Rice Knowledge Bank — Brown Spot (azoxystrobin listed); Syngenta Pakistan — Amistar Top (azoxystrobin + difenoconazole) product label", sourceUrl: "http://www.knowledgebank.irri.org/decision-tools/rice-doctor/rice-doctor-fact-sheets/item/brown-spot" },
  ],
  rice_tungro: [
    { name: "Imidacloprid", type: "Insecticide", detail: "Controls the green leafhopper that spreads tungro virus — but insecticides often do NOT prevent tungro, because leafhoppers spread it in very short feeding times. Resistant varieties and synchronous planting are the main control. Use only at the dose on the product label, and only if leafhoppers cross the threshold.", source: "TNAU — Tungro management (imidacloprid 17.8 SL for vector control); Bayer — Confidor 20 SL product label (rice, green leafhopper); IRRI Rice Knowledge Bank — Tungro (insecticides often not effective)", sourceUrl: "https://agritech.tnau.ac.in/crop_protection/rice_diseases/another%20methods_rice_23.html" },
  ],
  rice_leaf_scald: [
    { name: "Propiconazole", type: "Fungicide", detail: "Systemic fungicide labelled for rice leaf scald. Use only at the dose on the product label.", source: "Syngenta — Armure 300 EC product label (paddy leaf scald listed as target)", sourceUrl: "https://www.syngenta.com.my/product/crop-protection/armure-300ec" },
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based fungicide labelled for rice. Use only at the dose on the product label.", source: "IRRI Rice Knowledge Bank — Leaf Scald (copper oxychloride foliar application)", sourceUrl: "http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/leaf-scald" },
    { name: "Carbendazim", type: "Fungicide", detail: "Systemic fungicide labelled for rice leaf scald, as a seed treatment or foliar spray. Use only at the dose on the product label.", source: "IRRI Rice Knowledge Bank — Leaf Scald (carbendazim listed)", sourceUrl: "http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/leaf-scald" },
    { name: "Validamycin", type: "Fungicide", detail: "Antibiotic fungicide labelled for rice leaf scald. Use only at the dose on the product label.", source: "IRRI Rice Knowledge Bank — Leaf Scald (validamycin listed)", sourceUrl: "http://www.knowledgebank.irri.org/training/fact-sheets/pest-management/diseases/item/leaf-scald" },
  ],
  rice_sheath_blight: [
    { name: "Validamycin", type: "Fungicide", detail: "Systemic fungicide labelled for rice sheath blight — the standard treatment. Use only at the dose on the product label.", source: "IRRI Odisha — Handbook on Quality Seed Production in Rice (Validamycin 3 L); Punjab Agriculture Department, Pest Warning alert, 27 Aug 2026 (Validamycin 5% SL first)", sourceUrl: "https://rkb-odisha.in/wp-content/uploads/2024/09/handbook-on-quality-seed-production-in-rice-english.pdf" },
    { name: "Hexaconazole", type: "Fungicide", detail: "Triazole fungicide labelled for rice sheath blight. Use only at the dose on the product label.", source: "IRRI Odisha — Handbook on Quality Seed Production in Rice (Hexaconazole 5 EC)", sourceUrl: "https://rkb-odisha.in/wp-content/uploads/2024/09/handbook-on-quality-seed-production-in-rice-english.pdf" },
  ],
  cotton_curl_virus: [
    { name: "Imidacloprid", type: "Insecticide", detail: "Controls the whitefly that spreads cotton leaf curl virus. There is no cure for the virus itself. Use only at the dose on the product label.", source: "CABI Plantwise Plus Knowledge Bank — Pakistan factsheet: Cotton leaf curl virus (20147801354)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801354" },
    { name: "Acetamiprid", type: "Insecticide", detail: "Controls the whitefly that spreads cotton leaf curl virus. There is no cure for the virus itself. Use only at the dose on the product label.", source: "CABI Plantwise Plus Knowledge Bank — Pakistan factsheet: Cotton leaf curl virus (20147801354)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801354" },
    { name: "Diafenthiuron", type: "Insecticide", detail: "Insecticide for whitefly control; a rotation partner for neonicotinoids (imidacloprid/acetamiprid) to slow resistance. Use only at the dose on the product label.", source: "CABI Plantwise Plus Knowledge Bank — Pakistan factsheet: Cotton leaf curl virus (20147801354)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801354" },
    { name: "Buprofezin", type: "Insecticide", detail: "Insect growth regulator for whitefly nymphs; a rotation partner for neonicotinoids. Use only at the dose on the product label.", source: "CABI Plantwise Plus Knowledge Bank — Pakistan factsheet: Cotton leaf curl virus (20147801354)", sourceUrl: "https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20147801354" },
  ],
  cotton_fusarium_wilt: [
    { name: "Carbendazim", type: "Fungicide", detail: "Seed treatment labelled for cotton fusarium wilt, before sowing. There is no cure once plants are infected. Check current registration — Punjab has restricted carbendazim on paddy. Use only at the dose on the product label.", source: "PARC — Handbook on Agriculture Pesticides 2018 (Dr Muhammad Anjum Ali): Carbendazim registered in Pakistan (Derosal 60 WP, Bavistin 50% WP)", sourceUrl: "https://www.slideshare.net/slideshow/hand-book-on-agriculture-pesticides-2018-by-dr-muhammad-anjum-ali/94444142" },
    { name: "Thiophanate-methyl", type: "Fungicide", detail: "Seed treatment labelled for cotton fusarium wilt, before sowing. Use only at the dose on the product label.", source: "Arysta/UPL Pakistan — Topsin-M 70 WP (thiophanate-methyl) product label, Pakistan" },
  ],
  wheat_powdery_mildew: [
    { name: "Propiconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat powdery mildew. Spray soon after the disease appears. Use only at the dose on the product label.", source: "Pacific Northwest Plant Disease Management Handbook (rev. Mar 2026) — Wheat Powdery Mildew; Crop Protection Network fungicide efficacy table 2026 (Tilt 'Very Good')", sourceUrl: "https://pnwhandbooks.org/plantdisease/host-disease/wheat-triticum-aestivum-powdery-mildew" },
    { name: "Tebuconazole", type: "Fungicide", detail: "Triazole fungicide labelled for wheat powdery mildew. Use only at the dose on the product label.", source: "Pacific Northwest Plant Disease Management Handbook (rev. Mar 2026) — Wheat Powdery Mildew", sourceUrl: "https://pnwhandbooks.org/plantdisease/host-disease/wheat-triticum-aestivum-powdery-mildew" },
    { name: "Azoxystrobin", type: "Fungicide", detail: "Strobilurin fungicide labelled for wheat powdery mildew, often used in combination with a triazole. Use only at the dose on the product label.", source: "University of Agriculture Faisalabad (UAF) 2026 review — strobilurin + triazole for powdery mildew at heading", sourceUrl: "http://uniquescientificpublishers.com/pdf-files/TL/explicable-agriculture/78-86.pdf" },
    { name: "Sulphur", type: "Organic", detail: "Protective spray for powdery mildew. Do not spray in hot midday sun — it can scorch leaves. Use only at the dose on the product label." },
  ],
  cotton_alternaria: [
    { name: "Mancozeb", type: "Fungicide", detail: "Protectant fungicide labelled for cotton Alternaria leaf spot. Spray at the first sign of spots. Use only at the dose on the product label.", source: "Plantix — Alternaria Leaf Spot of Cotton (plant disease library)", sourceUrl: "https://plantix.net/en/library/plant-diseases/100104/alternaria-leaf-spot-of-cotton/" },
    { name: "Propiconazole", type: "Fungicide", detail: "Systemic triazole fungicide labelled for cotton Alternaria leaf spot. Use only at the dose on the product label.", source: "Bhattiprolu et al. — field evaluation of fungicides against Alternaria leaf spot on cotton (propiconazole 0.1%, Tilt 25% EC, most effective)", sourceUrl: "https://www.researchtrend.net/bfij/pdf/50%20Field%20Evaluation%20of%20Fungicides%20against%20Alternaria%20and%20Corynespora%20Leaf%20Spot%20Pathogens%20on%20Cotton%20S.L.%20Bhattiprolu.pdf" },
    { name: "Copper oxychloride", type: "Fungicide", detail: "Copper-based protectant fungicide labelled for cotton leaf spot. Use only at the dose on the product label.", source: "Bhattiprolu et al. — field evaluation of fungicides against Alternaria leaf spot on cotton (Blitox 0.3%)", sourceUrl: "https://www.researchtrend.net/bfij/pdf/50%20Field%20Evaluation%20of%20Fungicides%20against%20Alternaria%20and%20Corynespora%20Leaf%20Spot%20Pathogens%20on%20Cotton%20S.L.%20Bhattiprolu.pdf" },
  ],
  cotton_verticillium_wilt: [
    { name: "Trichoderma spp.", type: "Organic", detail: "Biological seed treatment (for example T. virens or T. harzianum) that may reduce wilt severity in the next crop. There is no cure once plants are infected and no fungicide controls this disease. Use only at the dose on the product label.", source: "Journal of Cotton Science (Hanson, 2000) — Trichoderma virens seed treatment reduced Verticillium wilt severity in cotton; Oklahoma State Extension — Verticillium wilt (no effective chemical control)", sourceUrl: "https://journal.cotton.org/wp-content/uploads/2025/08/jcs04-224.pdf" },
  ],
  // wheat_blast: intentionally absent — exact cause not identified by the model.
  wheat_septoria: [
    { name: "Propiconazole", type: "Fungicide", detail: "Systemic fungicide (triazole) labelled for wheat Septoria leaf blotch. Spray at early flag-leaf emergence. Use only at the dose on the product label.", source: "Pacific Northwest Plant Disease Management Handbook (rev. Mar 2026) — Wheat Septoria Tritici Blotch", sourceUrl: "https://pnwhandbooks.org/plantdisease/host-disease/wheat-triticum-aestivum-septoria-tritici-blotch" },
    { name: "Tebuconazole", type: "Fungicide", detail: "Systemic fungicide (triazole) labelled for wheat Septoria leaf blotch. Spray at early flag-leaf emergence. Use only at the dose on the product label.", source: "Pacific Northwest Plant Disease Management Handbook (rev. Mar 2026) — Wheat Septoria Tritici Blotch", sourceUrl: "https://pnwhandbooks.org/plantdisease/host-disease/wheat-triticum-aestivum-septoria-tritici-blotch" },
    { name: "Azoxystrobin + Propiconazole", type: "Fungicide", detail: "Combination fungicide labelled for wheat Septoria leaf blotch. Use only at the dose on the product label.", source: "Pacific Northwest Plant Disease Management Handbook (rev. Mar 2026) — Wheat Septoria Tritici Blotch", sourceUrl: "https://pnwhandbooks.org/plantdisease/host-disease/wheat-triticum-aestivum-septoria-tritici-blotch" },
  ],
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
    "wheat|powdery mildew": "wheat_powdery_mildew",
    "cotton|alternaria leaf spot": "cotton_alternaria",
    "cotton|verticillium wilt": "cotton_verticillium_wilt",
  };
  return map[key] ?? null;
}
