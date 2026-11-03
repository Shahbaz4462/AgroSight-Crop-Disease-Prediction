import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { mockPredictionService, MockPredictionService } from "./mockPredictionService";
import { modelApiService, ModelApiService } from "./modelApiService";

export type AIProvider = "mock" | "api";

/**
 * Chooses between the real model server ("api") and the offline demo ("mock").
 * Set NEXT_PUBLIC_AI_PROVIDER=api in .env.local to use the real model.
 * In "api" mode a failure is thrown to the UI. It never falls back to fake results.
 */
class UnifiedPredictionService implements PredictionServiceInterface {
  private activeProvider: AIProvider;
  private mockService: MockPredictionService;
  private apiService: ModelApiService;

  constructor() {
    this.activeProvider = process.env.NEXT_PUBLIC_AI_PROVIDER === "api" ? "api" : "mock";
    this.mockService = mockPredictionService;
    this.apiService = modelApiService;
  }

  public getActiveProvider(): AIProvider {
    return this.activeProvider;
  }

  public setProvider(provider: AIProvider): void {
    this.activeProvider = provider;
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    if (this.activeProvider === "api") return this.apiService.predictLeaf(image);
    return this.mockService.predictLeaf(image);
  }

  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void
  ): Promise<PredictionResult> {
    if (this.activeProvider === "api") {
      onProgress?.({ stage: "Sending your photo", progress: 25, detail: "Uploading image" });
      const tick = window.setTimeout(() => onProgress?.({ stage: "Checking the leaf", progress: 65, detail: "Running the model" }), 500);
      try {
        const result = await this.apiService.predictLeaf(image);
        onProgress?.({ stage: "Done", progress: 100, detail: "Result ready" });
        return result;
      } finally {
        window.clearTimeout(tick);
      }
    }
    return this.mockService.predictLeafWithProgress(image, onProgress);
  }

  public cancelPrediction(): void {
    this.mockService.cancelPrediction();
  }
}

export const predictionService = new UnifiedPredictionService();
