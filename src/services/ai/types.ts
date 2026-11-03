export type HealthStatus = "diseased" | "healthy" | "uncertain";

export interface TreatmentPlan {
  organic: string[];
  chemical: string[];
  prevention: string[];
}

export interface PredictionResult {
  id?: string;
  crop: string;
  disease: string;
  confidence: number;
  status: HealthStatus;
  symptoms?: string[];
  cause?: string;
  organic_solution?: string[];
  chemical_solution?: string[];
  prevention?: string[];
  message?: string;
  timestamp?: string;
  imageUrl?: string;
  severity?: "Low" | "Moderate" | "High" | "Critical";
  scientificName?: string;
  leafType?: string;
}

export interface PredictionServiceInterface {
  predictLeaf(image: File | Blob | string): Promise<PredictionResult>;
  cancelPrediction?(): void;
}

export interface ScanningStage {
  stage: string;
  progress: number;
  detail: string;
}

