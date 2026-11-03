import { PredictionResult, PredictionServiceInterface } from "./types";
import { DISEASES_KNOWLEDGE_BASE } from "../../data/diseasesData";
import { getModelAdvice } from "../../data/modelAdvice";

/**
 * Talks to the FastAPI inference server in /ml (ml/serve.py).
 *
 * POST ${NEXT_PUBLIC_API_BASE_URL}/predict   multipart/form-data { file }
 * -> { crop, disease, confidence, status, alternatives, model }
 *
 * The server only classifies. Advice text is attached here from curated data, never generated.
 * Errors are thrown (no silent fake result) so the UI can tell the farmer the check failed.
 */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

interface ServerResponse {
  crop: string;
  disease: string;
  confidence: number;
  status: "diseased" | "healthy" | "uncertain";
  alternatives?: { crop: string; disease: string; confidence: number }[];
  model?: string;
}

function attachAdvice(r: ServerResponse): Partial<PredictionResult> {
  if (r.status === "uncertain") return {};

  // 1) curated knowledge base (richer, has local doses) wins when it has this exact disease
  const kb = DISEASES_KNOWLEDGE_BASE.find(
    (k) => norm(k.disease) === norm(r.disease) && (norm(k.crop).startsWith(norm(r.crop)) || norm(r.crop).startsWith(norm(k.crop)))
  );
  if (kb) {
    return {
      scientificName: kb.scientificName,
      cause: kb.cause,
      symptoms: kb.symptoms,
      organic_solution: kb.organicSolution,
      chemical_solution: kb.chemicalSolution,
      prevention: kb.prevention,
    };
  }

  // 2) general advice written for every model class
  const g = getModelAdvice(r.crop, r.disease);
  if (g) {
    return {
      scientificName: g.scientificName,
      cause: g.cause || undefined,
      symptoms: g.symptoms,
      organic_solution: g.organic_solution,
      chemical_solution: g.chemical_solution,
      prevention: g.prevention,
    };
  }
  return {};
}

export class ModelApiService implements PredictionServiceInterface {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    const formData = new FormData();

    if (typeof image !== "string") {
      formData.append("file", image, (image as File).name || "leaf.jpg");
    } else if (image.startsWith("data:") || image.startsWith("http")) {
      const blob = await (await fetch(image)).blob();
      formData.append("file", blob, "leaf.jpg");
    } else {
      throw new Error("Unsupported image source");
    }

    const response = await fetch(`${this.baseUrl}/predict`, { method: "POST", body: formData });
    if (!response.ok) {
      throw new Error(`Inference server responded ${response.status}`);
    }
    const data: ServerResponse = await response.json();

    return {
      id: `pred-${Date.now()}`,
      crop: data.crop,
      disease: data.disease,
      confidence: data.confidence,
      status: data.status,
      message:
        data.status === "uncertain" && data.alternatives?.length
          ? `Closest matches: ${data.alternatives.slice(0, 2).map((a) => `${a.crop} ${a.disease} (${Math.round(a.confidence)}%)`).join(", ")}.`
          : undefined,
      timestamp: new Date().toISOString(),
      ...attachAdvice(data),
    };
  }
}

export const modelApiService = new ModelApiService();
