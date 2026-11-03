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
  majorCrops: string[];
  totalDiagnoses: number;
  healthyPercentage: number;
  diseasedPercentage: number;
  topDiseases: { name: string; percentage: number }[];
  cropProductionShare: number; // in %
  riskLevel: "Low" | "Medium" | "High" | "Alert";
  coordinates: { x: number; y: number }; // Relative SVG positioning
}

export interface GlobalRegionStatistic {
  id: string;
  region: "Asia" | "Europe" | "Africa" | "North America" | "South America" | "Oceania";
  totalDiagnosesSample: number;
  primaryCropThreats: string[];
  prevalentDiseases: { disease: string; crop: string; rate: number }[];
  climateImpactIndex: number; // 0-100
  adoptionScore: number;
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
  pathogenType: "Fungal" | "Bacterial" | "Viral" | "Oomycete" | "Physiological" | "Nematode";
  cause: string;
  symptoms: string[];
  organicSolution: string[];
  chemicalSolution: string[];
  prevention: string[];
  lastUpdated: string;
  verifiedBy: string;
}

