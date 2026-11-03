"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, RefreshCw, AlertCircle, Sun, Leaf, Focus, ScanLine, ChevronDown } from "lucide-react";
import { predictionService } from "../../services/ai/predictionService";
import { PredictionResult, ScanningStage } from "../../services/ai/types";
import { historyService } from "../../services/api/historyService";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";
import { downscaleImage } from "../../lib/image";
import { useApp } from "../../context/AppContext";
import { LiveCamera } from "../scanner/LiveCamera";

const MAX_MB = 12;
const VALID = ["image/jpeg", "image/png", "image/webp"];

const TIPS = [
  { icon: Sun, text: "Use daylight, avoid shadows" },
  { icon: Leaf, text: "One leaf, filling the frame" },
  { icon: Focus, text: "Keep it sharp, not blurry" },
];

export const ScanFlow: React.FC = () => {
  const router = useRouter();
  const { setLastDiagnosis } = useApp();
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<ScanningStage | null>(null);
  const [showSamples, setShowSamples] = useState(false);

  const pick = async (f: File | undefined) => {
    if (!f) return;
    setError("");
    if (!VALID.includes(f.type)) {
      setError("This file type isn't supported. Please use a JPG or PNG photo.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`This photo is too large (over ${MAX_MB} MB). Try a smaller one.`);
      return;
    }
    setFile(f);
    try {
      setPreview(await downscaleImage(f, 900, 0.85));
    } catch {
      setError("We couldn't open that photo. Please try another.");
      setFile(null);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setError("");
    setStage(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const analyze = async (target: File | string, thumb: string | null) => {
    setBusy(true);
    setError("");
    try {
      const result: PredictionResult = await predictionService.predictLeafWithProgress(target, setStage);
      const small = typeof target === "string" ? result.imageUrl || thumb || "" : thumb ? await shrink(thumb) : "";
      const saved = historyService.addDiagnosis({
        crop: result.crop,
        disease: result.disease,
        confidence: result.confidence,
        status: result.status,
        thumbnail: small,
        notes: typeof target === "string" ? "Sample leaf" : "Photo scan",
        symptoms: result.symptoms,
        cause: result.cause,
        organicSolution: result.organic_solution,
        chemicalSolution: result.chemical_solution,
        prevention: result.prevention,
      });
      setLastDiagnosis({ ...result, id: saved.id, imageUrl: small || result.imageUrl });
      router.push(`/results?id=${saved.id}`);
    } catch (e) {
      console.error(e);
      setError("Something went wrong while checking the leaf. Please try again.");
      setBusy(false);
      setStage(null);
    }
  };

  const onLiveCapture = async (f: File) => {
    setError("");
    try {
      const thumb = await downscaleImage(f, 900, 0.85);
      setFile(f);
      setPreview(thumb);
      analyze(f, thumb);
    } catch {
      setError("We couldn't read that frame. Please try again.");
    }
  };

  /* ---------- Analyzing ---------- */
  if (busy && preview) {
    const pct = stage?.progress ?? 6;
    return (
      <div className="w-full max-w-md mx-auto space-y-5 fade-up">
        <div className="relative aspect-[4/5] panel shadow-hard-lg overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Your leaf" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0b1a12]/30" />
          <div className="absolute inset-x-0 h-[3px] bg-accent shadow-[0_0_18px_4px_rgba(200,241,53,0.8)] scan-laser" />
          {["top-3 left-3 border-t-4 border-l-4", "top-3 right-3 border-t-4 border-r-4", "bottom-3 left-3 border-b-4 border-l-4", "bottom-3 right-3 border-b-4 border-r-4"].map((c) => (
            <span key={c} className={`absolute w-9 h-9 border-accent ${c}`} />
          ))}
          <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-accent text-[#0b1a12] label !text-[10px] px-2 py-1">Analysing</span>
        </div>
        <div role="status" aria-live="polite" className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="font-display font-extrabold text-2xl leading-none">Checking your leaf</p>
            <p className="font-mono text-2xl font-medium leading-none">{pct}%</p>
          </div>
          <div className="grid grid-cols-10 gap-1" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={`h-3 border-2 border-ink ${i < Math.round(pct / 10) ? "bg-accent" : "bg-transparent"}`} />
            ))}
          </div>
          <p className="label text-muted min-h-[1rem]">{stage?.stage ?? "Getting ready"}</p>
        </div>
      </div>
    );
  }

  /* ---------- Preview ---------- */
  if (preview) {
    return (
      <div className="w-full max-w-md mx-auto space-y-5 fade-up">
        <div className="relative aspect-[4/5] panel shadow-hard-lg overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Selected leaf preview" className="absolute inset-0 w-full h-full object-contain" />
          <span className="absolute top-3 left-3 bg-ink text-paper label !text-[10px] px-2 py-1">Preview</span>
        </div>
        {error && <ErrorNote msg={error} />}
        <button onClick={() => file && analyze(file, preview)} className="btn btn-accent w-full min-h-[4rem] text-xl">
          <ScanLine className="w-6 h-6" strokeWidth={2.5} /> Check this leaf
        </button>
        <button onClick={reset} className="w-full h-12 label flex items-center justify-center gap-2 hover:text-muted transition">
          <RefreshCw className="w-4 h-4" /> Use a different photo
        </button>
      </div>
    );
  }

  /* ---------- Start ---------- */
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 fade-up">
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      <input ref={galleryRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />

      <LiveCamera onCapture={onLiveCapture} onGallery={() => galleryRef.current?.click()} />

      <button
        onClick={() => cameraRef.current?.click()}
        className="w-full label py-3 text-muted hover:text-ink underline underline-offset-4"
      >
        Or use your phone&apos;s camera app
      </button>

      {error && <ErrorNote msg={error} />}

      <div className="panel p-5">
        <p className="label mb-4">For a sharp result</p>
        <ul className="divide-y-2 divide-ink/15">
          {TIPS.map(({ icon: Icon, text }, i) => (
            <li key={text} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <span className="font-mono text-sm text-muted w-6">0{i + 1}</span>
              <span className="flex-1 font-medium">{text}</span>
              <Icon className="w-5 h-5" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => setShowSamples((v) => !v)} aria-expanded={showSamples} className="w-full flex items-center justify-between label py-3 border-y-2 border-ink">
          No leaf nearby? Try a sample
          <ChevronDown className={`w-4 h-4 transition-transform ${showSamples ? "rotate-180" : ""}`} />
        </button>
        {showSamples && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pt-4 pb-2 snap-x">
            {SAMPLE_LEAVES.filter((x) => x.id !== "sample-ood-non-leaf").map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  setPreview(x.thumbnail);
                  analyze(x.id, x.thumbnail);
                }}
                className="snap-start shrink-0 w-28 text-left group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.thumbnail} alt={x.name} className="w-28 h-28 object-cover border-2 border-ink bg-card group-hover:shadow-hard-sm transition" />
                <span className="block mt-1.5 font-display font-bold text-sm truncate">{x.crop}</span>
                <span className="block label !text-[9px] text-muted truncate">{x.disease}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ErrorNote: React.FC<{ msg: string }> = ({ msg }) => (
  <div role="alert" className="flex items-start gap-3 border-2 border-ink bg-danger text-white p-3.5 text-sm font-medium shadow-hard-sm">
    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
    <span>{msg}</span>
  </div>
);

async function shrink(dataUrl: string): Promise<string> {
  const blob = await (await fetch(dataUrl)).blob();
  return downscaleImage(blob, 320, 0.7);
}
