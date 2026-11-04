import { PredictionResult, PredictionServiceInterface } from "./types";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";

/**
 * ModelApiService connects to the FastAPI backend in backend/.
 *
 * Architecture endpoint:
 * POST ${NEXT_PUBLIC_API_BASE_URL}/predict
 *
 * Expected payload:
 * multipart/form-data: { file: ImageBlob }
 *
 * Expected JSON response (confidence is 0-100, matching this frontend):
 * {
 *   "crop": "Wheat",
 *   "disease": "Yellow Rust",
 *   "confidence": 94.6,
 *   "status": "diseased",
 *   "organic_solution": [...],
 *   "chemical_solution": [...],
 *   "prevention": [...]
 * }
 *
 * There is no mock fallback here. A failed request throws, and the
 * scan UI shows an error instead of a simulated diagnosis.
 */
export class ModelApiService implements PredictionServiceInterface {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }

  private async resolveToBlob(image: string): Promise<Blob> {
    if (image.startsWith("data:")) {
      const response = await fetch(image);
      return await response.blob();
    }
    if (image.startsWith("http://") || image.startsWith("https://")) {
      const response = await fetch(image);
      return await response.blob();
    }
    // Sample-leaf IDs used by the scan flow (e.g. "sample-healthy-wheat"):
    // send the sample photo itself to the real backend, not a stored result.
    const sample = SAMPLE_LEAVES.find((s) => s.id === image || image.includes(s.id));
    if (sample) {
      const response = await fetch(sample.thumbnail);
      return await response.blob();
    }
    throw new Error(`Cannot send this image to the model: unsupported input "${image}"`);
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    const formData = new FormData();

    if (typeof image !== "string") {
      formData.append("file", image);
    } else {
      const blob = await this.resolveToBlob(image);
      formData.append("file", blob, "leaf.jpg");
    }

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
  }
}

export const modelApiService = new ModelApiService();
