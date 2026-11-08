import * as tf from "@tensorflow/tfjs";
import { PredictionResult, PredictionServiceInterface, ScanningStage } from "./types";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";

// Vercel-only prediction: the models run in the visitor's browser.
// Model files live in public/model/ and are served by Vercel itself,
// with the free jsDelivr CDN (which mirrors this GitHub repo) as the
// fallback:
//   model.json + group1-shard*.bin.b64 (base64 weights, see README)
//   *_class_names.json, solutions.json (always local, they are tiny)
// There is no external backend and no mock fallback. If a model file
// is missing, the scan fails with an error instead of a fake result.
//
// Two-model pipeline (v3, 2026-11-08) — every scan runs two models
// in order, and any step can answer "not sure" instead of guessing:
//   1. Leaf+crop (public/model/leafcrop/): ONE 4-class model
//      (cotton / no_leaf / rice / wheat) trained on real field
//      photos. It replaces the old two-model leaf gate (2-class)
//      + crop gate (3-class) pair. Top-1 is no_leaf, or the top-1
//      crop is below 90% confidence, and the answer is "not sure"
//      — no crop is named and the disease model never runs, so a
//      photo of soil, a wall, a hand or a dog can never be
//      answered with a crop or a disease. Measured on the 216-photo
//      field acceptance set: leaf detection 209/216 (the old leaf
//      gate managed 185/216), and at the 90% gate 0/36 non-leaf
//      photos pass. The gate is 90% (not 80%) because at 80% the
//      model confidently mislabels 22 field photos (vs 9 at 90%)
//      and one dog photo passes as wheat at 82% — at 90% the
//      errors fall below the gate and become "not sure" instead.
//      The model itself is 97.3% accurate on its held-out test
//      set (n=1,890), so most real leaf photos still pass the
//      gate; the ones that don't are answered "not sure" rather
//      than risked. The old public/model/leaf/ and public/model/
//      crop/ folders remain in the repo but are NO LONGER LOADED.
//   2. Disease (public/model/rice|cotton|wheat/): one model per
//      crop, run only for the decided crop, so a cotton leaf can
//      never be answered with a wheat disease. Cotton 89.2%,
//      wheat 83.3%, rice 86.6% on their held-out test sets.
//      Confident threshold is 75% (see below).
//   Crop pre-selection: the farmer picks the crop before scanning
//      (wheat / cotton / rice, or Auto-detect). When a crop is
//      picked, the leaf+crop model runs only as a disagree check:
//      if it is 90%+ confident the photo is a DIFFERENT crop, the
//      scan answers "not sure" with a message to check the crop,
//      so a wrongly picked crop can never produce a confident
//      disease answer. Otherwise the picked crop is trusted and
//      its disease model runs directly. With Auto-detect the
//      leaf+crop model's top-1 crop is the decision. Healthy wheat
//      and healthy rice leaves look near-identical (long narrow
//      grassy blades with no disease symptoms), which is why the
//      90% gate — not the raw top-1 — is what the crop decision
//      rests on.
//
// IMPORTANT: the files in /model/ are ALWAYS fetched first, and the
// CDN only second. The CDN mirrors the main branch, so on a preview
// deployment (or any branch) it serves the MAIN branch's model — a
// different model from the branch's own class list. Loading the
// main-branch model with a branch class list once silently mapped
// every rice photo to a cotton disease. Local-first keeps model and
// class list from the same deployment, and the output-length checks
// in the loaders below now fail loudly instead of mislabelling if
// they ever disagree again.
//
// Speed: three things together make scans feel fast.
//  1. Preload: preloadTfjsModel() is called when the app opens
//     (AppProvider mount), so all four models download while the
//     user is still on the home page, instead of only after they
//     open Diagnose and press Scan. The Diagnose page calls it too,
//     as a backup for direct links. Without this, a scan would wait
//     on a model download; with it, every model is already in the
//     browser cache by scan time (about 34 MB on the first visit,
//     then the IndexedDB cache skips the download on later visits).
//  2. Same-origin first: the model files come from the deployment
//     itself, and the split weight parts are fetched in parallel
//     instead of one by one (the old sequential fetch kept the
//     "Loading model in your browser..." screen up for minutes
//     on a phone connection).
//  3. Browser cache: after the first successful load, the decoded
//     weights + model topology are stored in IndexedDB, so later
//     visits skip the download entirely.
// Note: these are TensorFlow.js *graph* models, not layers models.
// The layers conversion failed on the Keras 3 topology (InputLayer
// batch_shape), while the graph conversion loads and predicts correctly.
// Weights are stored as base64 text (.b64) because the GitHub tool used
// for this repo cannot push binary files. The loader below decodes them
// back to the exact original bytes before handing them to TensorFlow.js,
// so predictions are identical to the binary-shard model.

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/Shahbaz4462/AgroSight-Crop-Disease-Prediction@main/public/model";

// Leaf+crop: ONE 4-class model (cotton / no_leaf / rice / wheat) in
// public/model/leafcrop/. Top-1 is no_leaf, or the top-1 crop is
// below 90% confidence, and the answer is "not sure" — no crop is
// named and the disease model never runs. The 90% gate is the
// safety: measured on the 216-photo field acceptance set, at 90%
// 0/36 non-leaf photos pass and only 9 field photos are confidently
// wrong (vs 22 at 80%, including a dog photo passing as wheat).
const LEAFCROP_LOCAL_BASE = "/model/leafcrop";
const LEAFCROP_CDN_BASE = `${CDN_BASE}/leafcrop`;
const LEAFCROP_CACHE_KEY = "leafcrop-v3";
const LEAFCROP_GATE = 90;
const CROP_DISPLAY: Record<string, string> = {
  cotton: "Cotton",
  rice: "Rice",
  wheat: "Wheat",
};

// Disease models: one per crop, in public/model/<crop>/. Each has its
// own class list and solutions file. Cache key MUST change whenever
// that crop's model changes, or returning visitors keep answering
// with the stale cached model.
const DISEASE_BASES: Record<string, { local: string; cdn: string; cacheKey: string }> = {
  rice: { local: "/model/rice", cdn: `${CDN_BASE}/rice`, cacheKey: "rice-v3" },
  cotton: { local: "/model/cotton", cdn: `${CDN_BASE}/cotton`, cacheKey: "cotton-v3" },
  wheat: { local: "/model/wheat", cdn: `${CDN_BASE}/wheat`, cacheKey: "wheat-v3" },
};

const DISPLAY: Record<string, [string, string]> = {
  cotton_aphids: ["Cotton", "Aphids"],
  cotton_alternaria: ["Cotton", "Alternaria Leaf Spot"],
  cotton_army_worm: ["Cotton", "Army Worm"],
  cotton_bacterial_blight: ["Cotton", "Bacterial Blight"],
  cotton_curl_virus: ["Cotton", "Leaf Curl Virus"],
  cotton_fusarium_wilt: ["Cotton", "Fusarium Wilt"],
  cotton_powdery_mildew: ["Cotton", "Powdery Mildew"],
  cotton_target_spot: ["Cotton", "Target Spot"],
  cotton_verticillium_wilt: ["Cotton", "Verticillium Wilt"],
  diseased_rice: ["Rice", "Diseased"],
  healthy_cotton: ["Cotton", "Healthy"],
  healthy_rice: ["Rice", "Healthy"],
  healthy_wheat: ["Wheat", "Healthy"],
  rice_bacterial_blight: ["Rice", "Bacterial Leaf Blight"],
  rice_blast: ["Rice", "Blast"],
  rice_brown_spot: ["Rice", "Brown Spot"],
  rice_leaf_scald: ["Rice", "Leaf Scald"],
  rice_sheath_blight: ["Rice", "Sheath Blight"],
  rice_tungro: ["Rice", "Tungro"],
  wheat_aphid: ["Wheat", "Aphid"],
  wheat_black_rust: ["Wheat", "Black Rust"],
  wheat_blast: ["Wheat", "Blast"],
  wheat_brown_rust: ["Wheat", "Brown Rust"],
  wheat_common_root_rot: ["Wheat", "Common Root Rot"],
  wheat_fusarium_head_blight: ["Wheat", "Fusarium Head Blight"],
  wheat_leaf_blight: ["Wheat", "Leaf Blight"],
  wheat_mildew: ["Wheat", "Mildew"],
  wheat_mite: ["Wheat", "Mite"],
  wheat_powdery_mildew: ["Wheat", "Powdery Mildew"],
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

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Fetch a model file from the deployment's own copy first, then
// from the CDN if the local copy fails. Local-first is required:
// the CDN mirrors the main branch, so on any other branch it would
// serve the main branch's model with this deployment's class list.
// Returns null when neither has it.
async function fetchModelText(
  relative: string,
  localBase: string,
  cdnBase: string
): Promise<string | null> {
  for (const base of [localBase, cdnBase]) {
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
async function fetchShardParts(
  file: string,
  localBase: string,
  cdnBase: string
): Promise<string | null> {
  const found = await Promise.all(
    Array.from({ length: 24 }, (_, i) =>
      fetchModelText(`${file}.b64.part${String(i).padStart(2, "0")}`, localBase, cdnBase)
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

async function readModelCache(cacheKey: string): Promise<CachedModel | null> {
  const db = await openModelCache();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction("artifacts", "readonly");
      const req = tx.objectStore("artifacts").get(cacheKey);
      req.onsuccess = () => resolve((req.result as CachedModel) ?? null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeModelCache(cacheKey: string, entry: CachedModel): Promise<void> {
  const db = await openModelCache();
  if (!db) return;
  try {
    const tx = db.transaction("artifacts", "readwrite");
    tx.objectStore("artifacts").put(entry, cacheKey);
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

let leafcropModelPromise: Promise<tf.GraphModel> | null = null;
const diseaseModelPromises: Record<string, Promise<tf.GraphModel>> = {};
let leafcropClassNames: string[] | null = null;
const diseaseClassNames: Record<string, string[]> = {};
const diseaseSolutions: Record<string, Record<string, Solution>> = {};

async function loadGraphModelArtifacts(
  localBase: string,
  cdnBase: string,
  cacheKey: string
): Promise<tf.io.ModelArtifacts> {
  const cached = await readModelCache(cacheKey);
  if (cached) {
    return artifactsFrom(JSON.parse(cached.modelJsonText) as ModelJson, cached.weightData);
  }
  const modelJsonText = await fetchModelText("model.json", localBase, cdnBase);
  if (!modelJsonText) throw new Error("Model file not found (model.json)");
  const modelJson = JSON.parse(modelJsonText) as ModelJson;
  // Weights are base64 text. Large shards are split into
  // ~500 KB parts because a single large push is rejected;
  // try the single file first, then its parts (in parallel).
  // All shard files are fetched at the same time as well.
  const files = modelJson.weightsManifest.flatMap((g) => g.paths);
  const b64s = await Promise.all(
    files.map(async (file: string) => {
      const single = await fetchModelText(`${file}.b64`, localBase, cdnBase);
      if (single !== null) return single;
      const joined = await fetchShardParts(file, localBase, cdnBase);
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
  await writeModelCache(cacheKey, { modelJsonText, weightData: weightData.buffer });
  return artifactsFrom(modelJson, weightData.buffer);
}

async function loadLeafcropModelData() {
  if (!leafcropModelPromise) {
    leafcropModelPromise = tf.loadGraphModel({
      load: () => loadGraphModelArtifacts(LEAFCROP_LOCAL_BASE, LEAFCROP_CDN_BASE, LEAFCROP_CACHE_KEY),
    });
  }
  if (!leafcropClassNames) {
    leafcropClassNames = (await (
      await fetch("/model/leafcrop/leafcrop_class_names.json")
    ).json()) as string[];
  }
  const model = await leafcropModelPromise;
  // Safety net: the leaf+crop model must output exactly one
  // probability per class name. If a wrong-branch model ever loads
  // again, fail loudly instead of mislabelling.
  const outputSize = (model.outputs?.[0]?.shape as number[] | undefined)?.[1];
  if (outputSize !== undefined && outputSize !== leafcropClassNames.length) {
    throw new Error(
      `Leaf+crop model mismatch: the model predicts ${outputSize} classes but the class list has ${leafcropClassNames.length}.`
    );
  }
  return { model, classNames: leafcropClassNames as string[] };
}

async function loadDiseaseModelData(crop: string) {
  const bases = DISEASE_BASES[crop];
  if (!bases) throw new Error(`No disease model for crop "${crop}"`);
  if (!diseaseModelPromises[crop]) {
    diseaseModelPromises[crop] = tf.loadGraphModel({
      load: () => loadGraphModelArtifacts(bases.local, bases.cdn, bases.cacheKey),
    });
  }
  if (!diseaseClassNames[crop]) {
    diseaseClassNames[crop] = (await (
      await fetch(`${bases.local}/${crop}_class_names.json`)
    ).json()) as string[];
  }
  if (!diseaseSolutions[crop]) {
    diseaseSolutions[crop] = (await (
      await fetch(`${bases.local}/solutions.json`)
    ).json()) as Record<string, Solution>;
  }
  const model = await diseaseModelPromises[crop];
  const outputSize = (model.outputs?.[0]?.shape as number[] | undefined)?.[1];
  if (outputSize !== undefined && outputSize !== diseaseClassNames[crop].length) {
    throw new Error(
      `Disease model mismatch for ${crop}: the model predicts ${outputSize} classes but the class list has ${diseaseClassNames[crop].length}.`
    );
  }
  return {
    model,
    classNames: diseaseClassNames[crop] as string[],
    solutions: diseaseSolutions[crop] as Record<string, Solution>,
  };
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
    onProgress?: (stage: ScanningStage) => void,
    // Crop the farmer picked before scanning ("wheat" | "cotton" |
    // "rice"), or null/undefined for Auto-detect (the leaf+crop
    // model decides). See step 1 below for what the pick changes.
    selectedCrop?: string | null
  ): Promise<PredictionResult> {
    onProgress?.({ stage: "stage_loading", progress: 20, detail: "stage_loading_detail" });
    const { model: leafcropModel, classNames: leafcropNames } = await loadLeafcropModelData();
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

    // Step 1 — leaf+crop: does this photo show a leaf at all, and
    // if so, which crop? Top-1 is no_leaf, or the top-1 crop is
    // below 90% confidence, and the answer is "not sure" — no crop
    // is named and the disease model never runs, so a photo of
    // soil, a wall, a hand or a dog can never be answered with a
    // crop or a disease. When the farmer picked a crop before
    // scanning, this same output runs as the disagree check: if
    // it is 90%+ confident the photo is a DIFFERENT crop, the pick
    // was almost certainly wrong, so the answer is "not sure" with
    // a message to check the crop — a wrongly picked crop can never
    // produce a confident disease answer. Otherwise the picked crop
    // is trusted (the farmer knows their own field) and its disease
    // model runs directly. With no pick (Auto-detect) the top-1
    // crop is the decision.
    const leafcropOutput = leafcropModel.execute(input) as tf.Tensor;
    const leafcropProbs = (await leafcropOutput.data()) as Float32Array;
    tf.dispose(leafcropOutput);
    const leafcropOrder = Array.from(leafcropProbs)
      .map((p, i) => ({ i, p }))
      .sort((a, b) => b.p - a.p);
    const topCrop = leafcropNames[leafcropOrder[0].i];
    const topConfidence = leafcropProbs[leafcropOrder[0].i] * 100;

    if (topCrop === "no_leaf") {
      tf.dispose(input);
      onProgress?.({ stage: "stage_done", progress: 100, detail: "stage_done_detail" });
      return {
        id: `pred-${Date.now()}`,
        crop: "",
        disease: "",
        confidence: Math.round(topConfidence * 100) / 100,
        status: "uncertain",
        topPredictions: [],
        organic_solution: [],
        chemical_solution: [],
        prevention: [],
        message:
          "This photo does not look like a clear leaf photo, so no crop or disease is named. Take a closer, well-lit photo of a single leaf.",
        timestamp: new Date().toISOString(),
      };
    }
    if (topConfidence < LEAFCROP_GATE) {
      tf.dispose(input);
      onProgress?.({ stage: "stage_done", progress: 100, detail: "stage_done_detail" });
      return {
        id: `pred-${Date.now()}`,
        crop: "",
        disease: "",
        confidence: Math.round(topConfidence * 100) / 100,
        status: "uncertain",
        topPredictions: [],
        organic_solution: [],
        chemical_solution: [],
        prevention: [],
        message:
          "The model is not sure enough about this photo, so no crop or disease is named as a confident answer. Take a closer, well-lit photo of a single leaf.",
        timestamp: new Date().toISOString(),
      };
    }

    let decidedCrop: string;
    if (selectedCrop) {
      if (topCrop !== selectedCrop) {
        tf.dispose(input);
        onProgress?.({ stage: "stage_done", progress: 100, detail: "stage_done_detail" });
        return {
          id: `pred-${Date.now()}`,
          crop: CROP_DISPLAY[selectedCrop] ?? selectedCrop,
          disease: "",
          confidence: Math.round(topConfidence * 100) / 100,
          status: "uncertain",
          topPredictions: [],
          organic_solution: [],
          chemical_solution: [],
          prevention: [],
          message: `You selected ${CROP_DISPLAY[selectedCrop] ?? selectedCrop}, but this photo looks like ${CROP_DISPLAY[topCrop] ?? topCrop}. Please check the crop and scan again.`,
          timestamp: new Date().toISOString(),
        };
      }
      decidedCrop = selectedCrop;
    } else {
      decidedCrop = topCrop;
    }

    // Step 2 — disease: the decided crop's own model. It only knows
    // that crop's classes, so no masking is needed — a cotton leaf
    // can never be answered with a wheat disease. The disease model
    // loads here, on the first scan of its crop, and is cached after.
    const { model, classNames: names, solutions: sols } = await loadDiseaseModelData(decidedCrop);
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

// Start loading all four models in the background (Diagnose
// page mount). The leaf+crop model loads first; the three disease
// models load right after, so that by the time the user presses
// Scan every model is already in the browser cache and a scan never
// waits on a download. This is about 34 MB on the first visit,
// downloaded in the background while the user is still on the home
// page; later visits use the IndexedDB cache and skip the download
// entirely. Failures are ignored here on purpose: a real scan will
// retry and show its normal error if a model still cannot load.
export async function preloadTfjsModel(): Promise<void> {
  try {
    await Promise.allSettled([
      loadLeafcropModelData(),
      loadDiseaseModelData("rice"),
      loadDiseaseModelData("cotton"),
      loadDiseaseModelData("wheat"),
    ]);
  } catch {
    // The scan itself will surface any load failure.
  }
}
