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
    organicSolution: ["Please present a leaf from Rice, Wheat, or Cotton."],
    chemicalSolution: ["No action applicable."],
    prevention: ["Use the system exclusively for agricultural crop foliar diagnostic workflows."],
  },
];

