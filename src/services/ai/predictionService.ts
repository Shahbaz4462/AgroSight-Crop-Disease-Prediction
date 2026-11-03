import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { mockPredictionService, MockPredictionService } from "./mockPredictionService";
import { modelApiService, ModelApiService } from "./modelApiService";

export type AIProvider = "mock" | "api";

class UnifiedPredictionService implements PredictionServiceInterface {
  private activeProvider: AIProvider;
  private mockService: MockPredictionService;
  private apiService: ModelApiService;

  constructor() {
    // Default to mock for offline Expo presentation unless explicitly configured
    const configured = process.env.NEXT_PUBLIC_AI_PROVIDER as AIProvider;
    this.activeProvider = configured === "api" ? "api" : "mock";
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
    if (this.activeProvider === "api") {
      try {
        return await this.apiService.predictLeaf(image);
      } catch (err) {
        console.warn("Live API inference failed. Falling back to mock prediction for continuous demo experience.", err);
        return await this.mockService.predictLeaf(image);
      }
    }
    return await this.mockService.predictLeaf(image);
  }

  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void
  ): Promise<PredictionResult> {
    if (this.activeProvider === "api") {
      onProgress?.({ stage: "Connecting to FastAPI inference gateway...", progress: 30, detail: "Transmitting image buffer" });
      try {
        const result = await this.apiService.predictLeaf(image);
        onProgress?.({ stage: "Analysis complete", progress: 100, detail: "Inference response parsed" });
        return result;
      } catch (err) {
        console.warn("Live API unavailable. Falling back to simulated pipeline.", err);
        return await this.mockService.predictLeafWithProgress(image, onProgress);
      }
    }
    return await this.mockService.predictLeafWithProgress(image, onProgress);
  }

  public cancelPrediction(): void {
    this.mockService.cancelPrediction();
  }
}

export const predictionService = new UnifiedPredictionService();

