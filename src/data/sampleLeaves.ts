import { HealthStatus } from "../services/ai/types";

export interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  disease: string;
  confidence: number;
  status: HealthStatus;
  thumbnail: string;
  description: string;
  expectedStatus: HealthStatus;
  cause: string;
  symptoms: string[];
  organicSolution: string[];
  chemicalSolution: string[];
  prevention: string[];
  scientificName?: string;
  message?: string;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: "sample-rice-brown-spot",
    name: "Rice - Brown Spot",
    crop: "Rice",
    disease: "Brown Spot",
    confidence: 94.6,
    status: "diseased",
    expectedStatus: "diseased",
    thumbnail: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80",
    description: "Classic oval brown lesions with yellow halos on leaf blades.",
    scientificName: "Bipolaris oryzae (Cochliobolus miyabeanus)",
    cause: "Fungal pathogen favored by high humidity (86-100%), nutrient-deficient soil (especially potassium and silicon), and warm temperatures (25-30°C).",
    symptoms: [
      "Small, circular to oval brown lesions on young and mature leaves",
      "Spots feature dark brown margins with distinct yellowish halos",
      "Lesions coalesce, causing extensive foliar blighting and reduced photosynthesis",
      "Dark brown discolorations appearing on panicle glumes and grains",
    ],
    organicSolution: [
      "Apply certified cold-pressed Neem oil (3-5 ml/L) or botanical extracts of Ocimum sanctum.",
      "Seed treatment with Trichoderma viride or Pseudomonas fluorescens @ 10g/kg seed before sowing.",
      "Incorporate soil amendments rich in silicon (rice husk ash or calcium silicate) to strengthen leaf epidermis.",
      "Apply fermented bio-slurry and vermicompost to remediate nitrogen-potassium imbalances.",
    ],
    chemicalSolution: [
      "Foliar spray of Mancozeb 75% WP @ 2.0 g/L or Propiconazole 25% EC @ 1.0 ml/L at first appearance of spots.",
      "Alternate with Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L to mitigate fungal resistance.",
      "Seed dressing with Carbendazim 50% WP @ 2g/kg seed prior to nursery preparation.",
    ],
    prevention: [
      "Adopt balanced N-P-K fertilization according to soil test recommendations; avoid excess nitrogen.",
      "Ensure proper field drainage and avoid prolonged water stagnation during vegetative stages.",
      "Use certified disease-free, resistant rice cultivars (e.g., Basmati 385, Super Basmati resistance lines).",
      "Maintain adequate plant spacing (20x15 cm) to optimize canopy aeration and reduce relative humidity.",
    ],
  },
  {
    id: "sample-apple-scab",
    name: "Apple - Scab",
    crop: "Apple",
    disease: "Apple Scab",
    confidence: 92.4,
    status: "diseased",
    expectedStatus: "diseased",
    thumbnail: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    description: "Velvety olive-green to black fungal spots on leaves and fruit surfaces.",
    scientificName: "Venturia inaequalis",
    cause: "Ascomycete fungus overwintering on fallen dead leaves. Primary infection occurs during cool, wet spring weather with prolonged leaf wetness.",
    symptoms: [
      "Olive-green, velvety spots on the upper leaf surface that darken to black",
      "Leaves become distorted, puckered, and may drop prematurely",
      "Lesions on fruit develop corky, cracked brownish-black crusts",
      "Premature leaf drop leading to reduced vigor and smaller crop yields",
    ],
    organicSolution: [
      "Apply sulfur-based sprays or liquid copper hydroxide during early bud swell.",
      "Bio-control foliar treatment with Bacillus subtilis (Serenade) at 10-day intervals during wet periods.",
      "Rake, chop, and thoroughly compost fallen leaves in autumn or spray 5% urea to accelerate leaf breakdown.",
      "Apply horsetail (Equisetum) decoction to reinforce plant cuticle resistance.",
    ],
    chemicalSolution: [
      "Preventive application of Captan 50% WP @ 2.5 g/L or Dodine 65% WP during green tip stage.",
      "Systemic curative fungicide: Difenoconazole 25% EC @ 0.5 ml/L or Kresoxim-methyl 44.3% SC within 72 hours of rain.",
      "Rotate chemical classes (FRAC group 3, 9, 11) to prevent fungal strain resistance.",
    ],
    prevention: [
      "Plant scab-resistant apple cultivars (e.g., Enterprise, Liberty, Prima, GoldRush).",
      "Prune canopy annually to facilitate rapid leaf drying and sunlight penetration.",
      "Avoid overhead sprinkler irrigation; employ drip or micro-sprinkler systems near the soil level.",
      "Clear orchard floor floor debris thoroughly before spring bud break.",
    ],
  },
  {
    id: "sample-tomato-early-blight",
    name: "Tomato - Early Blight",
    crop: "Tomato",
    disease: "Early Blight",
    confidence: 95.8,
    status: "diseased",
    expectedStatus: "diseased",
    thumbnail: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    description: "Concentric rings ('bullseye' target patterns) with chlorotic yellow halo.",
    scientificName: "Alternaria solani",
    cause: "Soil-borne fungal pathogen surviving in crop residue and nightshade weeds. Splashed by rain or overhead irrigation during warm, humid intervals.",
    symptoms: [
      "Dark brown to black lesions with characteristic concentric rings (target pattern)",
      "Surrounding leaf tissue turns chlorotic yellow, leading to premature leaf defoliation",
      "Lower and older leaves exhibit initial symptoms first before progressing upward",
      "Stem collar rot and sunken dark lesions near the fruit calyx stem",
    ],
    organicSolution: [
      "Spray copper octanoate or certified Bordeaux mixture (1%) every 7 to 10 days.",
      "Apply compost tea rich in beneficial antagonistic microbes (Bacillus and Trichoderma).",
      "Mulch soil heavily with clean organic straw (5-8 cm) to create a barrier against soil-splash spores.",
      "Prune lower foliage 30 cm off the soil line to eliminate splash contact.",
    ],
    chemicalSolution: [
      "Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L applied as protective covers.",
      "Systemic intervention: Azoxystrobin 23% SC @ 1 ml/L or Boscalid + Pyraclostrobin @ 1.5 g/L.",
      "Target applications before forecasted rain events when humidity exceeds 85%.",
    ],
    prevention: [
      "Practice 3 to 4 year crop rotation away from Solanaceous crops (potato, eggplant, pepper).",
      "Stake and cage tomato vines to keep foliage elevated and well-aerated.",
      "Utilize drip irrigation exclusively; strictly avoid evening overhead wetting of foliage.",
      "Sanitize pruning shears between plants using 70% isopropyl alcohol.",
    ],
  },
  {
    id: "sample-healthy-wheat",
    name: "Wheat - Healthy Leaf",
    crop: "Wheat",
    disease: "Healthy",
    confidence: 97.2,
    status: "healthy",
    expectedStatus: "healthy",
    thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant emerald green leaf blade with uniform texture and no visible pathology.",
    scientificName: "Triticum aestivum",
    cause: "No pathogen detected. The cellular structure and chloroplast density reflect optimal photosynthetic activity.",
    symptoms: [
      "Uniform deep green chlorophyll pigmentation throughout flag and lower leaves",
      "No necrotic spots, rust pustules, powdery mildew mycelium, or chlorosis",
      "Strong turgor pressure with supple, undamaged vein structures",
      "Normal leaf elongation and vigorous canopy development",
    ],
    organicSolution: [
      "Maintain active soil organic matter (>2%) using well-decomposed farmyard manure.",
      "Foliar application of diluted seaweed extract (2 ml/L) during tillering for micronutrient priming.",
      "Support mycorrhizal fungal networks by minimizing deep tilling.",
    ],
    chemicalSolution: [
      "No chemical fungicide intervention required. Routine prophylactic spray is contraindicated.",
      "Ensure balanced starter fertilizer application (N-P-K 120-60-40 kg/ha or as per soil test report).",
    ],
    prevention: [
      "Conduct regular weekly scouting for early signs of yellow rust (Puccinia striiformis) or powdery mildew.",
      "Manage irrigation during critical stages: Crown Root Initiation (CRI), booting, and milk stages.",
      "Maintain recommended seed density (100-120 kg/ha) to prevent excessive canopy microclimate moisture.",
      "Keep field borders clear of wild grasses that serve as alternate hosts for cereal rusts.",
    ],
  },
  {
    id: "sample-low-confidence",
    name: "Uncertain / Blurred Leaf (<60%)",
    crop: "Cotton",
    disease: "Uncertain Detection",
    confidence: 43.2,
    status: "uncertain",
    expectedStatus: "uncertain",
    thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    description: "Image affected by motion blur, excessive shadows, and sub-optimal lighting.",
    message: "AI confidence (43.2%) is below the reliable diagnostic threshold (60.0%). Please capture a well-lit, steady photograph of a single leaf.",
    cause: "Diagnostic threshold not reached. Insufficient visual features to distinguish between early bacterial blight, physiological nutrient stress, or mechanical damage.",
    symptoms: [
      "Low contrast between leaf surface and background clutter",
      "Blurry venation patterns prevent accurate deep neural feature extraction",
      "Possible multiple overlapping leaves confusing spatial segmentation",
    ],
    organicSolution: [
      "Observe the plant physically in daylight: inspect underside of leaves for water-soaked angular spots or aphid sap.",
      "Take another photograph against a solid, neutral background (such as palm of hand or paper).",
    ],
    chemicalSolution: [
      "Do NOT apply broad-spectrum chemical pesticides while diagnosis is unconfirmed.",
      "Consult local agricultural extension officer or submit image for expert manual review.",
    ],
    prevention: [
      "Position camera 15-20 cm away perpendicular to the leaf blade.",
      "Ensure bright, indirect natural daylight without harsh glare or deep cast shadows.",
      "Keep camera steady and tap to focus directly on symptomatic lesion areas.",
    ],
  },
  {
    id: "sample-ood-non-leaf",
    name: "Out-of-Distribution / Non-Crop Object",
    crop: "Unknown Object",
    disease: "Out of Distribution",
    confidence: 18.5,
    status: "uncertain",
    expectedStatus: "uncertain",
    thumbnail: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80",
    description: "Non-agricultural object / background image submitted.",
    message: "Unable to identify a supported crop leaf. Please frame a supported agricultural crop leaf inside the scanning viewfinder.",
    cause: "The visual embeddings do not match any known botanical taxonomy in the crop model feature space.",
    symptoms: ["No plant leaf characteristics or chlorophyll patterns detected."],
    organicSolution: ["Please present a leaf from Rice, Wheat, Cotton, Tomato, Potato, Apple, Corn, or other supported crops."],
    chemicalSolution: ["No action applicable."],
    prevention: ["Use the system exclusively for agricultural crop foliar diagnostic workflows."],
  },
];

