import { KnowledgeBaseEntry } from "../types";

// Disease guide.
// Two kinds of entries live here, and they must not be confused:
//  - "Scannable" entries match a v1 model class (wheat, cotton, rice).
//    Those diseases can be checked with a photo on /diagnose.
//  - "Guide only" entries are educational information for crops the
//    v1 model does NOT scan yet (tomato, potato, mango, citrus, apple).
//    They are shown in the Crop guide with a "Guide only" label, and
//    the Crop guide does not offer a scan for those crops.
// For every chemical, follow the product label and local agricultural
// extension advice. Doses are not given here on purpose: the right dose
// depends on the product, the crop stage and the label.

export const DISEASES_KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  {
    id: "kb-wheat-yellow-rust",
    crop: "Wheat",
    disease: "Yellow Rust",
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
      "Propiconazole 25% EC (Tilt) or Tebuconazole 250 EC at first sign of stripe formation, at the dose on the product label.",
      "Azoxystrobin + Tebuconazole combination spray for extended residual control, at the dose on the product label.",
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
  {
    id: "kb-wheat-brown-rust",
    crop: "Wheat",
    disease: "Brown Rust",
    scientificName: "Puccinia triticina",
    pathogenType: "Fungal",
    cause: "Wind-borne rust fungus that thrives in warm, humid weather. Spores land on leaves, germinate in leaf wetness and form orange-brown pustules.",
    symptoms: [
      "Scattered orange-brown, round pustules on the upper leaf surface",
      "Pustules break the leaf skin and release powdery spores",
      "Leaves turn yellow and dry from the tip in severe attacks",
      "Weakened plants with shriveled, lighter grains",
    ],
    organicSolution: [
      "Remove heavily infected leaves and do not leave them in the field.",
      "Improve air circulation and avoid wetting leaves when watering.",
      "Use rust-resistant wheat varieties where available.",
    ],
    chemicalSolution: [
      "A fungicide labelled for wheat brown rust (for example a triazole such as propiconazole or tebuconazole, or a strobilurin mix), at the dose on the product label.",
      "Spray at the first sign of pustules and repeat only as the label allows.",
    ],
    prevention: [
      "Sow resistant varieties and avoid late sowing.",
      "Water at the base, space plants for airflow and rotate crops.",
      "Clean up fallen leaves and volunteer wheat after harvest.",
      "Scout weekly, especially the flag leaf, in spring.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-wheat-aphid",
    crop: "Wheat",
    disease: "Wheat Aphid",
    scientificName: "Sitobion avenae and Rhopalosiphum padi",
    pathogenType: "Pest",
    cause: "Small sap-sucking insects that cluster on leaves and ears, especially in mild, dry weather. They also spread barley yellow dwarf virus.",
    symptoms: [
      "Tiny green, brown or black insects clustered on leaves, stems and ears",
      "Curled, yellowing leaves and stunted growth",
      "Sticky honeydew on leaves, sometimes with black sooty mould",
      "Ants present on plants, attracted by honeydew",
    ],
    organicSolution: [
      "Remove heavily infested leaves by hand where practical.",
      "Spray neem oil or insecticidal soap labelled for aphids.",
      "Encourage natural predators such as ladybirds and lacewings — avoid broad-spectrum sprays that kill them.",
    ],
    chemicalSolution: [
      "An insecticide labelled for wheat aphids (for example acetamiprid), at the dose on the product label, only if numbers are high and spreading.",
      "Do not spray during flowering if pollinators are active, unless the label allows it.",
    ],
    prevention: [
      "Inspect leaves weekly, especially the underside, from tillering onwards.",
      "Keep plants healthy and avoid excess nitrogen, which attracts aphids.",
      "Remove weeds that host aphids around the field edge.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-cotton-aphids",
    crop: "Cotton",
    disease: "Cotton Aphids",
    scientificName: "Aphis gossypii",
    pathogenType: "Pest",
    cause: "Sap-sucking aphids that multiply fast in warm, dry weather and on young, soft growth. They also spread cotton viruses.",
    symptoms: [
      "Clusters of small green or black insects under leaves and on growing tips",
      "Curled, crinkled leaves and stunted plants",
      "Sticky honeydew and black sooty mould on leaves",
      "Yellowing and early leaf drop in heavy attacks",
    ],
    organicSolution: [
      "Wash small infestations off with a strong water spray.",
      "Spray neem oil or insecticidal soap labelled for cotton aphids.",
      "Protect ladybirds, lacewings and hoverflies, which eat aphids.",
    ],
    chemicalSolution: [
      "An insecticide labelled for cotton aphids (for example acetamiprid), at the dose on the product label, only if the attack is spreading.",
      "Rotate chemical groups between sprays to slow resistance.",
    ],
    prevention: [
      "Inspect the underside of leaves twice a week in the early season.",
      "Avoid excess nitrogen fertilizer, which makes soft growth aphids prefer.",
      "Control weeds that host aphids and keep field borders clean.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-cotton-army-worm",
    crop: "Cotton",
    disease: "Army Worm",
    scientificName: "Spodoptera litura",
    pathogenType: "Pest",
    cause: "Caterpillars of a night-flying moth. Young larvae feed together on leaves; older larvae eat leaves, squares and bolls, and move in groups, hence the name.",
    symptoms: [
      "Skeletonised leaves with only veins left, or large irregular holes",
      "Green caterpillars with dark markings, hiding under leaves by day",
      "Damaged squares and young bolls, sometimes with frass (droppings) on leaves",
      "Rapid spread across a field in a few days",
    ],
    organicSolution: [
      "Pick caterpillars and egg masses off by hand in small fields.",
      "Use pheromone traps to watch moth numbers and time control.",
      "Spray a Bt (Bacillus thuringiensis) product labelled for army worm, or neem oil, early while larvae are small.",
    ],
    chemicalSolution: [
      "An insecticide labelled for cotton army worm (for example chlorantraniliprole or emamectin benzoate), at the dose on the product label.",
      "Spray in the evening when larvae feed, and cover the underside of leaves.",
    ],
    prevention: [
      "Scout every 2-3 days in the growing season, looking under leaves.",
      "Remove weeds and crop residue that shelter moths and larvae.",
      "Rotate crops and avoid planting cotton after cotton in the same field every year.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-rice-diseased",
    crop: "Rice",
    disease: "Diseased",
    scientificName: "Unspecified — exact disease not identified by the model",
    pathogenType: "Unknown",
    cause: "The v1 model only says a rice leaf is diseased, not which disease it is. The cause could be fungal, bacterial, viral or a nutrient problem, and each needs different treatment.",
    symptoms: [
      "Leaf spots, yellowing, wilting or drying that do not match a healthy leaf",
      "Symptoms spreading from one leaf or plant to neighbours",
      "Poor growth compared with healthy plants in the same field",
    ],
    organicSolution: [
      "Remove affected leaves and do not compost diseased material in the field.",
      "Improve drainage and airflow, and avoid waterlogging where possible.",
      "Take a clear photo of a single leaf and show it to a local agriculture officer for identification.",
    ],
    chemicalSolution: [
      "Do NOT apply a specific fungicide or bactericide until the exact disease is identified — the wrong chemical wastes money and may not help.",
      "Once identified, use only a product labelled for that disease and crop, at the dose on the label.",
    ],
    prevention: [
      "Use clean, certified seed and resistant varieties where available.",
      "Balance fertilizer — excess nitrogen makes rice more disease-prone.",
      "Rotate crops and clean field bunds and tools between fields.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-healthy-wheat",
    crop: "Wheat",
    disease: "Healthy",
    scientificName: "Triticum aestivum — healthy leaf",
    pathogenType: "Healthy",
    cause: "No disease or pest found. The leaf is growing normally.",
    symptoms: [
      "Even green colour across the leaf, no spots, stripes or pustules",
      "No insects, honeydew or webbing on the leaf",
      "Firm leaf with normal growth for the crop stage",
    ],
    organicSolution: [
      "No treatment needed.",
      "Keep balanced watering and feeding, and remove any dead leaves promptly.",
    ],
    chemicalSolution: [
      "No spray needed. Do not spray preventively unless a local advisory warns of an outbreak.",
    ],
    prevention: [
      "Check leaves weekly so any new problem is caught early.",
      "Give good air circulation and avoid overwatering.",
      "Keep field borders clear of volunteer wheat.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-healthy-cotton",
    crop: "Cotton",
    disease: "Healthy",
    scientificName: "Gossypium hirsutum — healthy leaf",
    pathogenType: "Healthy",
    cause: "No disease or pest found. The leaf is growing normally.",
    symptoms: [
      "Even green colour, no curling, spots or sticky honeydew",
      "No insects clustered under leaves",
      "Normal leaf size and growth for the crop stage",
    ],
    organicSolution: [
      "No treatment needed.",
      "Keep balanced watering and feeding, and remove any dead leaves promptly.",
    ],
    chemicalSolution: [
      "No spray needed.",
    ],
    prevention: [
      "Inspect the underside of leaves twice a week in the early season.",
      "Avoid excess nitrogen and keep weeds under control.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-healthy-rice",
    crop: "Rice",
    disease: "Healthy",
    scientificName: "Oryza sativa — healthy leaf",
    pathogenType: "Healthy",
    cause: "No disease or pest found. The leaf is growing normally.",
    symptoms: [
      "Even green colour, no spots, yellowing or drying at the tips",
      "No insects or lesions on the leaf",
      "Normal growth for the crop stage",
    ],
    organicSolution: [
      "No treatment needed.",
      "Keep water and feeding balanced, and remove any dead leaves promptly.",
    ],
    chemicalSolution: [
      "No spray needed.",
    ],
    prevention: [
      "Check leaves weekly, especially after rain or flooding.",
      "Use clean seed and avoid excess nitrogen.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  // ---- Guide only: v1 model does NOT scan these crops. ----
  {
    id: "kb-tomato-early-blight",
    crop: "Tomato",
    disease: "Early Blight",
    scientificName: "Alternaria solani",
    pathogenType: "Fungal",
    cause: "Soil-borne fungus that spreads in warm, wet weather through splashing water and infected plant debris.",
    symptoms: [
      "Dark brown spots with concentric rings (target pattern) on older, lower leaves first",
      "Yellowing around spots, leaves drying and dropping from the bottom up",
      "Dark, sunken spots on stems and fruit near the stalk",
    ],
    organicSolution: [
      "Remove infected lower leaves and destroy them away from the field.",
      "Mulch under plants to stop soil splashing onto leaves.",
      "Spray neem oil or a copper-based product labelled for tomato early blight.",
    ],
    chemicalSolution: [
      "A fungicide labelled for tomato early blight (for example chlorothalonil or mancozeb, or azoxystrobin), at the dose on the product label.",
      "Start at the first spots and repeat only as the label allows.",
    ],
    prevention: [
      "Rotate tomatoes with non-solanaceous crops for 2-3 years.",
      "Water at the base, stake plants for airflow, and space plants well.",
      "Use clean seed and resistant varieties where available.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-potato-late-blight",
    crop: "Potato",
    disease: "Late Blight",
    scientificName: "Phytophthora infestans",
    pathogenType: "Fungal-like (oomycete)",
    cause: "Water mould that spreads very fast in cool, wet, humid weather through wind-borne spores and infected seed tubers.",
    symptoms: [
      "Large, dark, water-soaked patches on leaves, often with a white mould fringe underneath in damp weather",
      "Leaves blacken and collapse within days in a bad attack",
      "Brown, firm rot spreading into tubers",
    ],
    organicSolution: [
      "Remove and destroy infected plants immediately — do not compost them.",
      "Hill up soil around plants and avoid wetting foliage.",
      "Use certified disease-free seed tubers.",
    ],
    chemicalSolution: [
      "A fungicide labelled for potato late blight (for example metalaxyl + mancozeb, or dimethomorph + mancozeb), at the dose on the product label.",
      "In wet weather, protectant sprays must be repeated as the label directs — a single spray will not stop an outbreak.",
    ],
    prevention: [
      "Plant certified seed and resistant varieties where available.",
      "Space plants for airflow and avoid overhead watering late in the day.",
      "Destroy volunteer potatoes and infected tubers left in the field.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-mango-anthracnose",
    crop: "Mango",
    disease: "Anthracnose",
    scientificName: "Colletotrichum gloeosporioides",
    pathogenType: "Fungal",
    cause: "Fungus that survives on dead leaves and twigs and spreads in warm, humid weather and rain, attacking flowers, leaves and fruit.",
    symptoms: [
      "Black, sunken spots on leaves, flowers and young fruit",
      "Flowers blacken and drop, reducing fruit set",
      "Fruit develops black spots that grow and rot the flesh, especially after harvest",
    ],
    organicSolution: [
      "Prune dead twigs and remove fallen fruit and leaves from under trees.",
      "Improve airflow by pruning the canopy after harvest.",
      "Spray neem oil or a copper-based product labelled for mango anthracnose before flowering.",
    ],
    chemicalSolution: [
      "A fungicide labelled for mango anthracnose (for example copper hydroxide, or azoxystrobin + difenoconazole), at the dose on the product label.",
      "Time sprays to flowering and early fruit set, as the label directs.",
    ],
    prevention: [
      "Choose less susceptible varieties where available and plant in sunny, airy sites.",
      "Avoid overhead watering and keep the orchard floor clean.",
      "Harvest carefully and handle fruit gently to avoid skin breaks.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-citrus-canker",
    crop: "Citrus",
    disease: "Canker",
    scientificName: "Xanthomonas citri",
    pathogenType: "Bacterial",
    cause: "Bacteria spread by rain splash, wind, insects and contaminated tools. It enters through wounds and leaf pores, especially after storms.",
    symptoms: [
      "Raised, corky, brown spots with a yellow halo on leaves, fruit and twigs",
      "Leaves yellow and drop, fruit becomes blemished and may drop early",
      "Twig dieback in severe, repeated attacks",
    ],
    organicSolution: [
      "Prune infected twigs and burn or bury them away from trees.",
      "Disinfect pruning tools between trees.",
      "Spray a copper-based product labelled for citrus canker as a protectant.",
    ],
    chemicalSolution: [
      "Copper-based bactericides labelled for citrus canker are the main option, at the dose on the product label. Antibiotics are not a routine field treatment — follow local regulations and extension advice.",
    ],
    prevention: [
      "Plant windbreaks to reduce storm damage and bacterial spread.",
      "Avoid working in wet trees, and use clean nursery stock.",
      "Control leaf miner insects, whose tunnels let bacteria in.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
  {
    id: "kb-apple-scab",
    crop: "Apple",
    disease: "Scab",
    scientificName: "Venturia inaequalis",
    pathogenType: "Fungal",
    cause: "Fungus that overwinters in fallen leaves and releases spores in spring rain, infecting young leaves and fruit in cool, wet weather.",
    symptoms: [
      "Olive-green to black velvety spots on leaves, which yellow and drop early",
      "Dark, corky, cracked spots on fruit, sometimes causing misshapen apples",
      "Reduced growth and smaller fruit in repeated attacks",
    ],
    organicSolution: [
      "Rake up and destroy fallen leaves in autumn to remove the overwintering fungus.",
      "Prune for airflow and sunlight into the canopy.",
      "Spray neem oil or a sulphur product labelled for apple scab in early spring.",
    ],
    chemicalSolution: [
      "A fungicide labelled for apple scab (for example captan, or a triazole such as myclobutanil), at the dose on the product label, timed from bud break through wet spring weather.",
    ],
    prevention: [
      "Plant scab-resistant varieties where available.",
      "Avoid overhead watering and keep the orchard floor clean.",
      "Scout weekly in spring and act at the first spots.",
    ],
    lastUpdated: "2026-11-05",
    verifiedBy: "General agricultural guidance — confirm with local extension",
  },
];
