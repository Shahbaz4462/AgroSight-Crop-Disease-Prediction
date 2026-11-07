import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { tfjsPredictionService, TfjsPredictionService, preloadTfjsModel } from "./tfjsPredictionService";

export { preloadTfjsModel };

// Vercel-only v1: the model runs in the browser via TensorFlow.js.
// There is no external backend and no mock fallback. If the model files
// in public/model/ are missing, the scan fails with an error instead of
// returning a simulated diagnosis.
export type AIProvider = "mock" | "tfjs";

class UnifiedPredictionService implements PredictionServiceInterface {
  private tfjsService: TfjsPredictionService;

  constructor() {
    this.tfjsService = tfjsPredictionService;
  }

  public getActiveProvider(): AIProvider {
    return "tfjs";
  }

  public setProvider(_provider: AIProvider): void {
    // Provider switching is kept for the AppContext API, but only "tfjs"
    // is supported in v1. Any other value is ignored on purpose.
  }

  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    return await this.tfjsService.predictLeaf(image);
  }

  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void,
    // Crop the farmer picked before scanning, or null/undefined for
    // Auto-detect. Passed straight through to the TFJS service.
    selectedCrop?: string | null
  ): Promise<PredictionResult> {
    return await this.tfjsService.predictLeafWithProgress(image, onProgress, selectedCrop);
  }

  public cancelPrediction(): void {
    // A browser inference run cannot be cancelled here.
  }
}

export const predictionService = new UnifiedPredictionService();
