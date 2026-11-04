import * as tf from "@tensorflow/tfjs";
import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";

// Vercel-only prediction: the model runs in the visitor's browser.
// Model files live in public/model/ and are served by Vercel itself:
//   public/model/model.json + group1-shard*.bin  (added by the owner, see README)
//   public/model/class_names.json
//   public/model/solutions.json
// There is no external backend and no mock fallback. If the model files
// are missing, the scan fails with an error instead of a fake result.
//
// Note: this is a TensorFlow.js *graph* model, not a layers model.
// The layers conversion failed on the Keras 3 topology (InputLayer
// batch_shape), while the graph conversion loads and predicts correctly.

const DISPLAY: Record<string, [string, string]> = {
  cotton_aphids: ["Cotton", "Aphids"],
  cotton_army_worm: ["Cotton", "Army Worm"],
  diseased_rice: ["Rice", "Diseased"],
  healthy_cotton: ["Cotton", "Healthy"],
  healthy_rice: ["Rice", "Healthy"],
  healthy_wheat: ["Wheat", "Healthy"],
  wheat_aphid: ["Wheat", "Aphid"],
  wheat_brown_rust: ["Wheat", "Brown Rust"],
  wheat_yellow_rust: ["Wheat", "Yellow Rust"],
};

type Solution = {
  immediate_steps?: string;
  treatment?: string;
  prevention?: string;
  note?: string;
};

let modelPromise: Promise<tf.GraphModel> | null = null;
let classNames: string[] | null = null;
let solutions: Record<string, Solution> | null = null;

async function loadModelData() {
  if (!modelPromise) {
    modelPromise = tf.loadGraphModel("/model/model.json");
  }
  if (!classNames) {
    classNames = (await (await fetch("/model/class_names.json")).json()) as string[];
  }
  if (!solutions) {
    solutions = (await (await fetch("/model/solutions.json")).json()) as Record<string, Solution>;
  }
  const model = await modelPromise;
  return { model, classNames: classNames as string[], solutions: solutions as Record<string, Solution> };
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the image"));
    };
    img.src = url;
  });
}

async function resolveToBlob(image: File | Blob | string): Promise<Blob> {
  if (typeof image !== "string") return image;
  if (image.startsWith("data:")) {
    return await (await fetch(image)).blob();
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return await (await fetch(image)).blob();
  }
  const sample = SAMPLE_LEAVES.find((s) => s.id === image || image.includes(s.id));
  if (sample) {
    return await (await fetch(sample.thumbnail)).blob();
  }
  throw new Error(`Cannot send this image to the model: unsupported input "${image}"`);
}

export class TfjsPredictionService implements PredictionServiceInterface {
  public async predictLeaf(image: File | Blob | string): Promise<PredictionResult> {
    return this.predictLeafWithProgress(image);
  }

  public async predictLeafWithProgress(
    image: File | Blob | string,
    onProgress?: (stage: ScanningStage) => void
  ): Promise<PredictionResult> {
    onProgress?.({ stage: "Loading model in your browser...", progress: 20, detail: "First scan downloads the model once" });
    const { model, classNames: names, solutions: sols } = await loadModelData();
    onProgress?.({ stage: "Checking your leaf...", progress: 70, detail: "Resizing and analysing the photo" });

    const blob = await resolveToBlob(image);
    const img = await blobToImage(blob);

    // Preprocessing must match training: resize to 224x224 (bilinear),
    // then MobileNetV2 preprocess_input: pixels / 127.5 - 1.
    const input = tf.tidy(() => {
      const pixels = tf.browser.fromPixels(img).toFloat();
      const resized = tf.image.resizeBilinear(pixels, [224, 224]);
      return resized.div(127.5).sub(1).expandDims(0);
    });

    const output = model.execute(input) as tf.Tensor;
    const probs = (await output.data()) as Float32Array;
    tf.dispose([input, output]);

    let best = 0;
    for (let i = 1; i < probs.length; i++) {
      if (probs[i] > probs[best]) best = i;
    }
    const label = names[best];
    const confidence = probs[best] * 100;
    const [crop, disease] = DISPLAY[label] ?? [label, label];
    const sol = sols[label] ?? {};

    const status = confidence < 60 ? "uncertain" : disease === "Healthy" ? "healthy" : "diseased";
    onProgress?.({ stage: "Analysis complete", progress: 100, detail: "Result ready" });

    return {
      id: `pred-${Date.now()}`,
      crop,
      disease,
      confidence: Math.round(confidence * 100) / 100,
      status,
      organic_solution: sol.immediate_steps ? [sol.immediate_steps] : [],
      chemical_solution: sol.treatment ? [sol.treatment] : [],
      prevention: [sol.prevention, sol.note].filter(Boolean) as string[],
      message:
        confidence < 60
          ? "Photo is not clear enough for a reliable answer. Take a closer, well-lit photo of a single leaf."
          : undefined,
      timestamp: new Date().toISOString(),
    };
  }
}

export const tfjsPredictionService = new TfjsPredictionService();
