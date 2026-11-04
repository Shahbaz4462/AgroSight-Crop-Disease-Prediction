import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { modelApiService, ModelApiService } from "./modelApiService";

// v1: the real backend is the only provider. There is no mock fallback.
// If the backend is unavailable, the scan fails with an error instead of
// returning a simulated diagnosis, so the site never shows a fake result.
export type AIProvider = "mock" | "api";

class UnifiedPredictionService implements PredictionServiceInterface {
  private apiService: ModelApiService;

  constructor() {
    this.apiService = modelApiService;
  }

  public getActiveProvider(): AIProvider {
    return "api";
  }

  public setProvider(_provider: AIProvider): void {
    // Provider switching is kept for the AppContext API, but only "api"
    // is supported in v1. Any other value is ignored on purpose.
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    return await this.apiService.predictLeaf(image);
  }

  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void
  ): Promise<PredictionResult> {
    onProgress?.({ stage: "Connecting to inference service...", progress: 30, detail: "Transmitting image buffer" });
    const result = await this.apiService.predictLeaf(image);
    onProgress?.({ stage: "Analysis complete", progress: 100, detail: "Inference response parsed" });
    return result;
  }

  public cancelPrediction(): void {
    // No local mock to cancel; a real request cannot be cancelled here.
  }
}

export const predictionService = new UnifiedPredictionService();
