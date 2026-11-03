import { PredictionResult, PredictionServiceInterface } from "./types";

/**
 * ModelApiService connects directly to the future FastAPI backend.
 *
 * Architecture endpoint:
 * POST ${NEXT_PUBLIC_API_BASE_URL}/predict
 *
 * Expected payload:
 * multipart/form-data: { file: ImageBlob }
 *
 * Expected JSON response:
 * {
 *   "crop": "Rice",
 *   "disease": "Brown Spot",
 *   "confidence": 94.6,
 *   "status": "diseased",
 *   "symptoms": [...],
 *   "cause": "...",
 *   "organic_solution": [...],
 *   "chemical_solution": [...],
 *   "prevention": [...]
 * }
 */
export class ModelApiService implements PredictionServiceInterface {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    const formData = new FormData();

    if (typeof image !== "string") {
      formData.append("file", image);
    } else if (image.startsWith("data:")) {
      // Convert base64 data URL to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append("file", blob, "camera-capture.jpg");
    } else {
      formData.append("imageUrl", image);
    }

    try {
      const response = await fetch(`${this.baseUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Inference server responded with code ${response.status}: ${response.statusText}`);
      }

      const data: PredictionResult = await response.json();
      return {
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      };
    } catch (error) {
      console.warn("Backend API unavailable, check connection or backend server status:", error);
      throw error;
    }
  }
}

export const modelApiService = new ModelApiService();

