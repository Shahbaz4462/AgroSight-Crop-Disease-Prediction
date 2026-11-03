/**
 * General-purpose advice for every class the v1 model can output.
 *
 * Deliberately NOT product- or dose-specific: spray choices depend on local registration, crop stage
 * and resistance. Anything more specific lives in the curated knowledge base (diseasesData.ts), which
 * takes priority where an entry exists. An agronomist should review this file before real-world use.
 */

type Pathogen = "fungal" | "bacterial" | "viral" | "pest" | "soilborne";

interface Entry {
  pathogen: Pathogen;
  scientific?: string;
  symptoms: string[];
  /** Overrides the generic cause text when the template does not fit. */
  cause?: string;
}

export interface AdvicePack {
  cause: string;
  symptoms: string[];
  organic_solution: string[];
  chemical_solution: string[];
  prevention: string[];
  scientificName?: string;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const TEMPLATES: Record<Pathogen, Omit<AdvicePack, "symptoms" | "scientificName"> & { causeText: string }> = {
  fungal: {
    causeText: "A fungus. It spreads by spores in wind, rain splash and on tools, and thrives in warm, humid, wet-leaf conditions.",
    cause: "",
    organic_solution: [
      "Remove and destroy the worst-affected leaves. Do not compost them.",
      "Spray neem oil or a copper-based or sulphur-based product that is allowed for your crop, following the label.",
      "Water at the base of the plant, in the morning, so leaves dry quickly.",
    ],
    chemical_solution: [
      "Ask your local agriculture officer which fungicide is registered for this crop and disease in your area.",
      "Follow the label dose and the waiting period before harvest. Rotate between different fungicide groups.",
    ],
    prevention: [
      "Space plants so air can move between them.",
      "Rotate crops. Avoid planting the same crop in the same field every season.",
      "Clear crop residue after harvest, and use resistant varieties where they exist.",
    ],
  },
  bacterial: {
    causeText: "A bacterium. It spreads by water splash, wind-blown rain, insects and contaminated tools, and enters through leaf pores or small wounds.",
    cause: "",
    organic_solution: [
      "Remove and destroy infected leaves. Do not work in the field when plants are wet.",
      "Copper-based sprays allowed for your crop can slow spread. Follow the label.",
      "Clean tools and hands between plants.",
    ],
    chemical_solution: [
      "Ask your local agriculture officer which bactericide or copper product is registered for this crop.",
      "Sprays slow bacterial disease but rarely cure it. Combine with the hygiene steps above.",
    ],
    prevention: [
      "Use clean, disease-free seed or seedlings.",
      "Avoid overhead irrigation. Water at the base.",
      "Rotate with a non-host crop for at least a season.",
    ],
  },
  viral: {
    causeText: "A virus, usually carried from plant to plant by insects such as whiteflies or aphids. There is no spray that cures a plant once it is infected.",
    cause: "",
    organic_solution: [
      "Pull out and destroy badly infected plants so insects cannot carry the virus onward.",
      "Control the insect carriers: yellow sticky traps, neem oil spray, and removing weeds around the field.",
      "Keep plants well fed and watered so healthy plants resist better.",
    ],
    chemical_solution: [
      "No chemical cures the virus itself. Ask your agriculture officer whether an insecticide against the carrier insect is advised, and which one is registered.",
    ],
    prevention: [
      "Plant resistant or tolerant varieties.",
      "Use insect-proof nets for nurseries and seedlings.",
      "Control weeds and nearby infected crops that act as a source.",
    ],
  },
  pest: {
    causeText: "A pest, not a germ. Tiny mites or insects feed on the leaf and are worst in hot, dry, dusty weather.",
    cause: "",
    organic_solution: [
      "Wash the undersides of leaves with a strong spray of water to knock mites off.",
      "Spray neem oil or insecticidal soap on the undersides of leaves, repeating after a week.",
      "Protect natural enemies such as ladybirds and predatory mites.",
    ],
    chemical_solution: [
      "If the infestation is heavy, ask your agriculture officer which miticide is registered for this crop.",
      "Avoid broad-spectrum sprays, which kill the predators that keep mites down.",
    ],
    prevention: [
      "Keep plants watered. Drought-stressed plants are attacked first.",
      "Check the undersides of leaves weekly.",
      "Keep dust down around the field.",
    ],
  },
  soilborne: {
    causeText: "A fungus living in the soil. It enters through the roots and blocks the plant's water channels, so leaves wilt and yellow even when the soil is wet.",
    cause: "",
    organic_solution: [
      "Remove and destroy wilted plants with their roots. Do not move soil from the affected patch.",
      "Add well-rotted compost and, where available, Trichoderma bio-agents to the soil.",
      "Avoid over-watering and waterlogged patches.",
    ],
    chemical_solution: [
      "Sprays on the leaves do not cure wilt. Ask your agriculture officer about soil treatment or seed treatment options registered locally.",
    ],
    prevention: [
      "Plant resistant varieties. This is the most effective control.",
      "Rotate with non-host crops such as cereals for several seasons.",
      "Disinfect tools, and do not irrigate from a drain that runs through an infected field.",
    ],
  },
};

const E = (pathogen: Pathogen, symptoms: string[], scientific?: string, cause?: string): Entry => ({ pathogen, symptoms, scientific, cause });

// Keys: "Crop|Disease" exactly as the inference server returns them.
const ENTRIES: Record<string, Entry> = {
  "Apple|Apple scab": E("fungal", ["Olive-green to black velvety spots on leaves", "Leaves curl, pucker and drop early", "Rough, cracked spots on the fruit"], "Venturia inaequalis"),
  "Apple|Black rot": E("fungal", ["Purple-edged brown spots with a tan centre on leaves (frogeye)", "Fruit rots from the blossom end, turning black and hard", "Cankers on branches"], "Botryosphaeria obtusa"),
  "Apple|Cedar apple rust": E("fungal", ["Bright yellow-orange spots on the upper side of leaves", "Small tube-like growths under the spots", "Fruit may be deformed"], "Gymnosporangium juniperi-virginianae"),
  "Cherry|Powdery mildew": E("fungal", ["White powdery coating on young leaves", "Leaves curl upward and become distorted", "Growth stunted on new shoots"], "Podosphaera clandestina"),
  "Squash|Powdery mildew": E("fungal", ["White powdery patches on the upper side of leaves", "Leaves yellow, then turn brown and dry out", "Fruit is smaller and ripens poorly"], "Podosphaera xanthii"),
  "Corn|Gray Leaf Spot": E("fungal", ["Narrow, rectangular grey-tan spots running between the veins", "Spots join up and whole leaves dry out", "Worst on lower leaves in humid weather"], "Cercospora zeae-maydis"),
  "Corn|Common rust": E("fungal", ["Small round, powdery brick-red pustules on both leaf sides", "Pustules turn dark brown-black as the plant matures", "Heavy infection yellows and dries leaves"], "Puccinia sorghi"),
  "Corn|Northern Leaf Blight": E("fungal", ["Long cigar-shaped grey-green lesions, 2 to 15 cm", "Lesions turn tan and may have dark spore patches", "Severe cases scorch the whole leaf"], "Exserohilum turcicum"),
  "Grape|Black rot": E("fungal", ["Small brown circular spots with a dark border on leaves", "Berries shrivel into hard black mummies", "Tiny black dots inside the spots"], "Guignardia bidwellii"),
  "Grape|Esca (Black Measles)": E("fungal", ["Yellow or red stripes between leaf veins that later turn brown and dry", "Dark spots on berries", "Sudden wilting of shoots in summer"], "Phaeomoniella chlamydospora and related fungi", "A group of wood-rotting fungi that enter the vine trunk through pruning wounds. Leaf symptoms are the visible sign of rot inside the wood. It cannot be cured once established."),
  "Grape|Leaf Blight": E("fungal", ["Irregular dark brown spots on leaves", "Spots merge and leaves dry and fall early", "Reduced vine vigour"], "Pseudocercospora vitis"),
  "Citrus|Citrus Greening": E("viral", ["Yellow blotchy mottling on leaves, not following the veins", "Lopsided, small, bitter fruit that stays green at the bottom", "Twig dieback and heavy fruit drop"], "Candidatus Liberibacter (spread by psyllids)", "A bacterium spread from tree to tree by a small sap-sucking insect, the citrus psyllid. There is no cure once a tree is infected."),
  "Peach|Bacterial spot": E("bacterial", ["Small angular dark spots on leaves that fall out, leaving a shot-hole look", "Leaves yellow and drop early", "Sunken dark spots on fruit"], "Xanthomonas arboricola pv. pruni"),
  "Pepper|Bacterial spot": E("bacterial", ["Small water-soaked spots that turn dark brown with a yellow edge", "Spots may merge and leaves drop", "Raised scabby spots on fruit"], "Xanthomonas euvesicatoria"),
  "Potato|Early blight": E("fungal", ["Dark brown spots with concentric rings like a target", "Starts on older lower leaves, then moves up", "Leaves yellow around the spots and dry"], "Alternaria solani"),
  "Potato|Late blight": E("fungal", ["Large dark, water-soaked patches on leaves that spread fast", "White fuzzy growth under the leaf in damp weather", "Whole plants can collapse within days; tubers rot"], "Phytophthora infestans"),
  "Strawberry|Leaf scorch": E("fungal", ["Many small purple spots on the upper leaf surface", "Spots enlarge with a grey-brown centre and purple edge", "Heavily spotted leaves look scorched and dry"], "Diplocarpon earlianum"),
  "Tomato|Bacterial spot": E("bacterial", ["Small dark water-soaked spots on leaves, often with a yellow ring", "Rough scabby raised spots on fruit", "Heavy infection makes leaves drop"], "Xanthomonas spp."),
  "Tomato|Early blight": E("fungal", ["Dark spots with concentric rings like a target on older leaves", "Yellowing around the spots, then leaf drop", "Dark sunken patch near the stem end of the fruit"], "Alternaria solani"),
  "Tomato|Late blight": E("fungal", ["Large greasy dark patches on leaves and stems", "White fuzzy growth on the underside in damp weather", "Firm brown patches on fruit; plants can collapse quickly"], "Phytophthora infestans"),
  "Tomato|Leaf Mold": E("fungal", ["Pale green to yellow spots on the upper side of leaves", "Olive-green velvety mould on the underside", "Leaves curl, wither and drop"], "Passalora fulva"),
  "Tomato|Septoria leaf spot": E("fungal", ["Many small round spots with grey-white centres and dark edges", "Tiny black dots in the centre of spots", "Lower leaves yellow and drop first"], "Septoria lycopersici"),
  "Tomato|Spider Mites": E("pest", ["Fine yellow speckling on leaves", "Fine webbing on the underside of leaves", "Leaves turn bronze and dry out in hot, dry weather"], "Tetranychus urticae"),
  "Tomato|Target Spot": E("fungal", ["Brown spots with rings and a yellow halo on leaves", "Spots can also appear on stems and fruit", "Leaves drop, leaving fruit exposed to sun"], "Corynespora cassiicola"),
  "Tomato|Yellow Leaf Curl Virus": E("viral", ["Leaves curl upward and turn yellow at the edges", "Plants are stunted and bushy", "Few or no fruits set. Whiteflies are usually present"], "Tomato yellow leaf curl virus (spread by whitefly)"),
  "Tomato|Mosaic Virus": E("viral", ["Light and dark green mottling on leaves", "Leaves are narrow, twisted or fern-like", "Fruit ripens unevenly and plants are stunted"], "Tomato mosaic virus (spread on hands, tools and seed)"),
  "Cotton|Alternaria": E("fungal", ["Brown round spots, often with rings, on leaves", "Spots can dry and crack, leaving holes", "Heavy infection causes early leaf drop"], "Alternaria macrospora"),
  "Cotton|Bacterial Blight": E("bacterial", ["Angular water-soaked spots limited by the leaf veins", "Spots turn brown and black; black lesions can run along veins", "Boll rot and dark streaks on stems in bad cases"], "Xanthomonas citri pv. malvacearum"),
  "Cotton|Fusarium Wilt": E("soilborne", ["Leaves yellow and wilt, often on one side of the plant first", "Cutting the stem shows dark brown streaks inside", "Plants stunt and may die"], "Fusarium oxysporum f. sp. vasinfectum"),
  "Cotton|Verticillium Wilt": E("soilborne", ["Yellow patches between veins, turning brown (tiger-stripe look)", "Leaves wilt and drop from the bottom up", "Cutting the stem shows brown discoloration"], "Verticillium dahliae"),
};

const HEALTHY_PREVENTION = [
  "Keep checking your crop once a week, especially after rain.",
  "Water at the base of plants rather than over the leaves.",
  "Remove weeds and old crop waste that can hold disease.",
];

/** Look up advice for a model result. Returns null if we have nothing for this class. */
export function getModelAdvice(crop: string, disease: string): AdvicePack | null {
  if (norm(disease) === "healthy") {
    return { cause: "", symptoms: [], organic_solution: [], chemical_solution: [], prevention: HEALTHY_PREVENTION };
  }
  const hit = Object.entries(ENTRIES).find(([k]) => {
    const [c, d] = k.split("|");
    return norm(c) === norm(crop) && norm(d) === norm(disease);
  });
  if (!hit) return null;
  const e = hit[1];
  const t = TEMPLATES[e.pathogen];
  return {
    cause: e.cause ?? t.causeText,
    symptoms: e.symptoms,
    organic_solution: t.organic_solution,
    chemical_solution: t.chemical_solution,
    prevention: t.prevention,
    scientificName: e.scientific,
  };
}
