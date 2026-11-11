import { HealthStatus, PredictionResult } from "../services/ai/types";

export * from "../services/ai/types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "researcher" | "agronomist" | "admin";
  avatar?: string;
  organization?: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  scientificName?: string;
  crop: string;
  cause: string;
  description: string;
  severity: "Low" | "Moderate" | "High" | "Critical";
  symptoms: string[];
  organicSolution: string[];
  chemicalSolution: string[];
  prevention: string[];
  sampleImageUrl?: string;
}

export interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  category: "Cereal" | "Cash Crop" | "Fruit" | "Vegetable" | "Legume";
  iconName: string;
  description: string;
  commonDiseases: string[];
  growthCycleDays: number;
  optimalTemperature: string;
  waterRequirement: "Low" | "Moderate" | "High";
  imageUrl: string;
  // False (or omitted) means the v1 model scans this crop. True means
  // guide only: the Crop guide shows information, but no scan is offered.
  guideOnly?: boolean;
}

export interface DiagnosisHistoryItem {
  id: string;
  date: string;
  crop: string;
  disease: string;
  confidence: number;
  status: HealthStatus;
  thumbnail: string;
  notes?: string;
  location?: string;
  symptoms?: string[];
  cause?: string;
  organicSolution?: string[];
  chemicalSolution?: string[];
  prevention?: string[];
}

export interface ProvinceStatistic {
  id: string;
  name: string;
  urduName: string;
  capital: string;
  urduCapital: string;
  majorCrops: string[];
  // Ranked by documented importance. No percentages: no institution
  // publishes province-level disease-share percentages, so the list is
  // qualitative — disease name + a complete source reference.
  topDiseases: { name: string; source: string }[];
  // Verified key facts only (each with a complete reference in `sources`).
  // Rendered in the same 3-cell grid as before; a province with fewer
  // verified facts shows fewer cells. `labelKey` is an i18n key.
  keyFacts: { labelKey: string; value: string }[];
  riskLevel: "Low" | "Medium" | "High" | "Alert";
  // Most recent significant official alert, if one exists.
  // textUr/textRoman are the same alert translated for Urdu/Roman Urdu.
  currentAlert?: { text: string; source: string; textUr?: string; textRoman?: string };
  // Complete references (institution + document + date/year) for every
  // fact and disease above, plus the verification date.
  sources: string;
  lastUpdated: string;
}

export interface GlobalRegionStatistic {
  id: string;
  region: "Asia" | "Europe" | "Africa" | "North America" | "South America" | "Oceania";
  // One real published figure per region (value + what it means + source).
  // Replaces the invented totalDiagnosesSample number.
  // labelUr/labelRoman are the same label translated for Urdu/Roman Urdu.
  headlineStat: { value: string; label: string; source: string; labelUr?: string; labelRoman?: string };
  primaryCropThreats: string[];
  // Ranked by documented importance. No rates: no institution publishes
  // regional disease-share percentages, so the list is qualitative —
  // disease + crop + a complete source reference.
  prevalentDiseases: { disease: string; crop: string; source: string }[];
  // Complete references (institution + document + date/year) for every
  // fact above, plus the verification date.
  sources: string;
  lastUpdated: string;
}

export interface ModelVersion {
  id: string;
  name: string;
  version: string;
  status: "Active" | "Testing" | "Deprecated" | "Staging";
  architecture: string; // e.g. "EfficientNet-B4 + ViT Hybrid"
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  inferenceTimeMs: number;
  datasetSize: string;
  supportedClasses: number;
  releaseDate: string;
  isDemo: boolean;
}

export interface ExpertReviewCase {
  id: string;
  imageUrl: string;
  predictedCrop: string;
  predictedDisease: string;
  confidence: number;
  submittedAt: string;
  farmerLocation: string;
  status: "Needs Review" | "Confirmed" | "Overridden" | "Retrain Flagged";
  reviewerNotes?: string;
  flagReason: "Low Confidence (<60%)" | "Out of Distribution (OOD)" | "Conflicting Features";
}

export interface KnowledgeBaseEntry {
  id: string;
  crop: string;
  disease: string;
  scientificName: string;
  pathogenType: "Fungal" | "Bacterial" | "Viral" | "Oomycete" | "Physiological" | "Nematode" | "Pest" | "Healthy" | "Unknown" | "Fungal-like (oomycete)";
  cause: string;
  symptoms: string[];
  organicSolution: string[];
  chemicalSolution: string[];
  prevention: string[];
  lastUpdated: string;
  verifiedBy: string;
}

