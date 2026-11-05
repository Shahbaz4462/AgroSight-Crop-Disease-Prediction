import * as tf from "@tensorflow/tfjs";
import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";

// Vercel-only prediction: the model runs in the visitor's browser.
// Model files live in public/model/ and are served by Vercel itself,
// with the free jsDelivr CDN (which mirrors this GitHub repo) as the
// fallback:
//   model.json + group1-shard*.bin.b64 (base64 weights, see README)
//   class_names.json, solutions.json (always local, they are tiny)
// There is no external backend and no mock fallback. If the model files
// are missing, the scan fails with an error instead of a fake result.
//
// IMPORTANT: the files in /model/ are ALWAYS fetched first, and the
// CDN only second. The CDN mirrors the main branch, so on a preview
// deployment (or any branch) it serves the MAIN branch's model — a
// different model from the branch's own class list. Loading the
// main-branch 9-class model with the 23-class list silently mapped
// every rice photo to a cotton disease (the V1 model's "diseased
// rice" output slot is the V2 list's "cotton bacterial blight").
// Local-first keeps model and class list from the same deployment,
// and the output-length check in loadModelData() now fails loudly
// instead of mislabelling if they ever disagree again.
//
// Speed: three things together make scans feel fast.
//  1. Preload: preloadTfjsModel() is called when the Diagnose page
//     opens, so the model downloads while the user picks a photo,
//     instead of only after they press Scan.
//  2. Same-origin first: the model files come from the deployment
//     itself, and the split weight parts are fetched in parallel
//     instead of one by one (the old sequential fetch kept the
//     "Loading model in your browser..." screen up for minutes
//     on a phone connection).
//  3. Browser cache: after the first successful load, the decoded
//     weights + model topology are stored in IndexedDB, so later
//     visits skip the download entirely.
// Note: this is a TensorFlow.js *graph* model, not a layers model.
// The layers conversion failed on the Keras 3 topology (InputLayer
// batch_shape), while the graph conversion loads and predicts correctly.
// Weights are stored as base64 text (.b64) because the GitHub tool used
// for this repo cannot push binary files. The loader below decodes them
// back to the exact original bytes before handing them to TensorFlow.js,
// so predictions are identical to the binary-shard model.

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/Shahbaz4462/AgroSight-Crop-Disease-Prediction@main/public/model";
const LOCAL_BASE = "/model";
// Cache key MUST change whenever the model in public/model/ changes.
// The old key "v1" still holds the 9-class model in returning
// visitors' browsers; after the V2 model ships, that stale cache
// would keep answering with the old model forever.
const CACHE_KEY = "v2";

const DISPLAY: Record<string, [string, string]> = {
  cotton_aphids: ["Cotton", "Aphids"],
  cotton_army_worm: ["Cotton", "Army Worm"],
  cotton_bacterial_blight: ["Cotton", "Bacterial Blight"],
  cotton_powdery_mildew: ["Cotton", "Powdery Mildew"],
  cotton_target_spot: ["Cotton", "Target Spot"],
  diseased_rice: ["Rice", "Diseased"],
  healthy_cotton: ["Cotton", "Healthy"],
  healthy_rice: ["Rice", "Healthy"],
  healthy_wheat: ["Wheat", "Healthy"],
  wheat_aphid: ["Wheat", "Aphid"],
  wheat_black_rust: ["Wheat", "Black Rust"],
  wheat_blast: ["Wheat", "Blast"],
  wheat_brown_rust: ["Wheat", "Brown Rust"],
  wheat_common_root_rot: ["Wheat", "Common Root Rot"],
  wheat_fusarium_head_blight: ["Wheat", "Fusarium Head Blight"],
  wheat_leaf_blight: ["Wheat", "Leaf Blight"],
  wheat_mildew: ["Wheat", "Mildew"],
  wheat_mite: ["Wheat", "Mite"],
  wheat_septoria: ["Wheat", "Septoria"],
  wheat_smut: ["Wheat", "Smut"],
  wheat_stem_fly: ["Wheat", "Stem Fly"],
  wheat_tan_spot: ["Wheat", "Tan Spot"],
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

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Fetch a model file from the deployment's own /model/ copy first,
// then from the CDN if the local copy fails. Local-first is required:
// the CDN mirrors the main branch, so on any other branch it would
// serve the main branch's model with this deployment's class list.
// Returns null when neither has it.
async function fetchModelText(relative: string): Promise<string | null> {
  for (const base of [LOCAL_BASE, CDN_BASE]) {
    try {
      const res = await fetch(`${base}/${relative}`);
      if (res.ok) return await res.text();
    } catch {
      // Try the next source.
    }
  }
  return null;
}

// Fetch the split parts of one weight shard in parallel and join
// them in order. Parts are ~500 KB each; fetching them one by one
// kept the loading screen up for minutes on a phone connection.
// At most 24 parts are looked for (a 4 MB shard is ~11 parts).
async function fetchShardParts(file: string): Promise<string | null> {
  const found = await Promise.all(
    Array.from({ length: 24 }, (_, i) =>
      fetchModelText(`${file}.b64.part${String(i).padStart(2, "0")}`)
    )
  );
  const parts: string[] = [];
  for (const part of found) {
    if (part === null) break;
    parts.push(part);
  }
  return parts.length > 0 ? parts.join("") : null;
}

type CachedModel = { modelJsonText: string; weightData: ArrayBuffer };

function openModelCache(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === "undefined") return resolve(null);
      const req = indexedDB.open("agrosight-model", 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore("artifacts");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readModelCache(): Promise<CachedModel | null> {
  const db = await openModelCache();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction("artifacts", "readonly");
      const req = tx.objectStore("artifacts").get(CACHE_KEY);
      req.onsuccess = () => resolve((req.result as CachedModel) ?? null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeModelCache(entry: CachedModel): Promise<void> {
  const db = await openModelCache();
  if (!db) return;
  try {
    const tx = db.transaction("artifacts", "readwrite");
    tx.objectStore("artifacts").put(entry, CACHE_KEY);
  } catch {
    // Cache failure must never break a scan.
  }
}

type ModelJson = {
  modelTopology: unknown;
  weightsManifest: { paths: string[]; weights: unknown[] }[];
  format: string;
  generatedBy: string;
  convertedBy: string;
  signature: unknown;
};

function artifactsFrom(modelJson: ModelJson, weightData: ArrayBuffer): tf.io.ModelArtifacts {
  return {
    modelTopology: modelJson.modelTopology,
    weightSpecs: modelJson.weightsManifest.flatMap((g) => g.weights) as tf.io.WeightsManifestEntry[],
    weightData,
    format: modelJson.format,
    generatedBy: modelJson.generatedBy,
    convertedBy: modelJson.convertedBy,
    signature: modelJson.signature,
  } as tf.io.ModelArtifacts;
}

async function loadModelData() {
  if (!modelPromise) {
    const handler: tf.io.IOHandler = {
      load: async () => {
        const cached = await readModelCache();
        if (cached) {
          return artifactsFrom(JSON.parse(cached.modelJsonText) as ModelJson, cached.weightData);
        }
        const modelJsonText = await fetchModelText("model.json");
        if (!modelJsonText) throw new Error("Model file not found (model.json)");
        const modelJson = JSON.parse(modelJsonText) as ModelJson;
        // Weights are base64 text. Large shards are split into
        // ~500 KB parts because a single large push is rejected;
        // try the single file first, then its parts (in parallel).
        // All shard files are fetched at the same time as well.
        const files = modelJson.weightsManifest.flatMap((g) => g.paths);
        const b64s = await Promise.all(
          files.map(async (file: string) => {
            const single = await fetchModelText(`${file}.b64`);
            if (single !== null) return single;
            const joined = await fetchShardParts(file);
            if (joined === null) throw new Error(`Model weights not found for ${file}`);
            return joined;
          })
        );
        const buffers: ArrayBuffer[] = b64s.map((b64) => base64ToArrayBuffer(b64));
        const total = buffers.reduce((n, b) => n + b.byteLength, 0);
        const weightData = new Uint8Array(total);
        let offset = 0;
        for (const b of buffers) {
          weightData.set(new Uint8Array(b), offset);
          offset += b.byteLength;
        }
        await writeModelCache({ modelJsonText, weightData: weightData.buffer });
        return artifactsFrom(modelJson, weightData.buffer);
      },
    };
    modelPromise = tf.loadGraphModel(handler);
  }
  if (!classNames) {
    classNames = (await (await fetch("/model/class_names.json")).json()) as string[];
  }
  if (!solutions) {
    solutions = (await (await fetch("/model/solutions.json")).json()) as Record<string, Solution>;
  }
  const model = await modelPromise;
  // Safety net: the model must output exactly one probability per
  // class name. If a wrong-branch model ever loads again, fail loudly
  // instead of naming the wrong crop — this once mapped rice to cotton.
  const outputSize = (model.outputs?.[0]?.shape as number[] | undefined)?.[1];
  if (outputSize !== undefined && outputSize !== classNames.length) {
    throw new Error(
      `Model mismatch: the model predicts ${outputSize} classes but the class list has ${classNames.length}.`
    );
  }
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
    onProgress?.({ stage: "stage_loading", progress: 20, detail: "stage_loading_detail" });
    const { model, classNames: names, solutions: sols } = await loadModelData();
    onProgress?.({ stage: "stage_checking", progress: 70, detail: "stage_checking_detail" });

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

    const order = Array.from(probs)
      .map((p, i) => ({ i, p }))
      .sort((a, b) => b.p - a.p);
    const best = order[0].i;
    const label = names[best];
    const confidence = probs[best] * 100;
    const [crop, disease] = DISPLAY[label] ?? [label, label];
    const sol = sols[label] ?? {};

    // Confident threshold is 75%, not 60%. Measured on the 1,596
    // test images: at 60%, 61 wrong answers still looked confident;
    // at 75%, 91% of real leaves stay confident while the three
    // non-leaf / blurred sample images (top scores 65%, 68%, 51%)
    // all become "uncertain" instead of a wrong crop name.
    // A green-colour check was tried and rejected: real diseased
    // leaves are often yellow/brown, so it threw away more than
    // half of real leaves. This threshold is a trade-off, not a
    // guarantee — a confident answer can still be wrong, which is
    // why, on an uncertain scan, the top 3 guesses are shown (or a
    // likely disease family when the top two guesses fall in the
    // same family), and serious outbreaks should be confirmed with
    // a local agriculture officer.
    const CONFIDENT = 75;
    const status = confidence < CONFIDENT ? "uncertain" : disease === "Healthy" ? "healthy" : "diseased";
    const topPredictions = order.slice(0, 3).map(({ i, p }) => {
      const [c, d] = DISPLAY[names[i]] ?? [names[i], names[i]];
      return { className: names[i], crop: c, disease: d, confidence: Math.round(p * 10000) / 100 };
    });
    onProgress?.({ stage: "stage_done", progress: 100, detail: "stage_done_detail" });

    return {
      id: `pred-${Date.now()}`,
      crop,
      disease,
      confidence: Math.round(confidence * 100) / 100,
      status,
      topPredictions,
      organic_solution: sol.immediate_steps ? [sol.immediate_steps] : [],
      chemical_solution: sol.treatment ? [sol.treatment] : [],
      prevention: [sol.prevention, sol.note].filter(Boolean) as string[],
      message:
        confidence < CONFIDENT
          ? "The model is not sure enough about this photo, so no crop or disease is named as a confident answer. Take a closer, well-lit photo of a single leaf."
          : undefined,
      timestamp: new Date().toISOString(),
    };
  }
}

export const tfjsPredictionService = new TfjsPredictionService();

// Start loading the model in the background (Diagnose page mount).
// Failures are ignored here on purpose: a real scan will retry and
// show its normal error if the model still cannot load.
export async function preloadTfjsModel(): Promise<void> {
  try {
    await loadModelData();
  } catch {
    // The scan itself will surface any load failure.
  }
}
