import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";

export class MockPredictionService implements PredictionServiceInterface {
  private isCanceled = false;

  public cancelPrediction(): void {
    this.isCanceled = true;
  }

  /**
   * Simulates deep neural network inference on a foliar image.
   * Dispatches stage updates via callback for realistic UI scanning feedback.
   */
  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void
  ): Promise<PredictionResult> {
    this.isCanceled = false;

    const stages: ScanningStage[] = [
      { stage: "Initializing AI vision...", progress: 15, detail: "Loading tensor engine & normalizing RGB channels" },
      { stage: "Detecting leaf & foliage bounds...", progress: 35, detail: "Segmenting leaf margin from background" },
      { stage: "Extracting morphological features...", progress: 55, detail: "Analyzing venation patterns & chloroplast index" },
      { stage: "Classifying foliar pathology...", progress: 75, detail: "Evaluating lesion texture & necrosis embeddings" },
      { stage: "Verifying confidence & treatment...", progress: 95, detail: "Matching against agronomic knowledge base" },
    ];

    for (const step of stages) {
      if (this.isCanceled) {
        throw new Error("Prediction canceled by user");
      }
      onProgress?.(step);
      // Realistic simulation delay (350ms - 500ms per stage)
      await new Promise((res) => setTimeout(res, 380));
    }

    return this.resolvePrediction(image);
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    return this.predictLeafWithProgress(image);
  }

  private resolvePrediction(image: File | Blob | string): PredictionResult {
    // 1. Check if string matches a known sample leaf ID or hint
    if (typeof image === "string") {
      const matched = SAMPLE_LEAVES.find((s) => s.id === image || image.includes(s.id));
      if (matched) {
        return {
          id: `pred-${Date.now()}`,
          crop: matched.crop,
          disease: matched.disease,
          confidence: matched.confidence,
          status: matched.status,
          symptoms: matched.symptoms,
          cause: matched.cause,
          organic_solution: matched.organicSolution,
          chemical_solution: matched.chemicalSolution,
          prevention: matched.prevention,
          message: matched.message,
          timestamp: new Date().toISOString(),
          imageUrl: matched.thumbnail,
          scientificName: matched.scientificName,
        };
      }
    }

    // 2. Check file name for developer/expo testing triggers
    if (typeof image !== "string" && "name" in image) {
      const lower = (image as File).name.toLowerCase();
      if (lower.includes("healthy")) {
        const sample = SAMPLE_LEAVES.find((s) => s.id === "sample-healthy-wheat")!;
        return {
          id: `pred-${Date.now()}`,
          crop: sample.crop,
          disease: sample.disease,
          confidence: sample.confidence,
          status: "healthy",
          symptoms: sample.symptoms,
          cause: sample.cause,
          organic_solution: sample.organicSolution,
          chemical_solution: sample.chemicalSolution,
          prevention: sample.prevention,
          timestamp: new Date().toISOString(),
          imageUrl: sample.thumbnail,
        };
      }
      if (lower.includes("low") || lower.includes("blur") || lower.includes("uncertain")) {
        const sample = SAMPLE_LEAVES.find((s) => s.id === "sample-low-confidence")!;
        return {
          id: `pred-${Date.now()}`,
          crop: sample.crop,
          disease: sample.disease,
          confidence: 43.2,
          status: "uncertain",
          symptoms: sample.symptoms,
          cause: sample.cause,
          organic_solution: sample.organicSolution,
          chemical_solution: sample.chemicalSolution,
          prevention: sample.prevention,
          message: sample.message,
          timestamp: new Date().toISOString(),
        };
      }
    }

    // 3. Default demo prediction: High-accuracy Rice Brown Spot (standard primary demo)
    const primary = SAMPLE_LEAVES[0];
    return {
      id: `pred-${Date.now()}`,
      crop: primary.crop,
      disease: primary.disease,
      confidence: 94.6,
      status: "diseased",
      symptoms: primary.symptoms,
      cause: primary.cause,
      organic_solution: primary.organicSolution,
      chemical_solution: primary.chemicalSolution,
      prevention: primary.prevention,
      scientificName: primary.scientificName,
      timestamp: new Date().toISOString(),
      imageUrl: primary.thumbnail,
    };
  }
}

export const mockPredictionService = new MockPredictionService();

