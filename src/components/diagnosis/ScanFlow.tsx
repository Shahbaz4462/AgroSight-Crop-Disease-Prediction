"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, RefreshCw, AlertCircle, Sun, Leaf, Focus, ScanLine, ChevronDown } from "lucide-react";
import { predictionService, preloadTfjsModel } from "../../services/ai/predictionService";
import { PredictionResult, ScanningStage } from "../../services/ai/types";
import { historyService } from "../../services/api/historyService";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";
import { downscaleImage } from "../../lib/image";
import { assessImageQuality, QualityWarning } from "../../lib/imageQuality";
import { useApp } from "../../context/AppContext";
import { LiveCamera } from "../scanner/LiveCamera";

const MAX_MB = 12;
const VALID = ["image/jpeg", "image/png", "image/webp"];

// Crop picker: the farmer picks the crop before scanning, so the
// scan never has to guess the crop. Crop names stay in English in
// every language (a farmer asks for the same name at a shop).
// The last picked crop is remembered in localStorage, so a farmer
// who always scans the same crop does not pick it again.
const CROP_STORAGE_KEY = "agrosight-crop";
const CROPS = [
  { id: "wheat", name: "Wheat" },
  { id: "cotton", name: "Cotton" },
  { id: "rice", name: "Rice" },
] as const;

function cropIdFromDisplay(name: string): string | null {
  const found = CROPS.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return found ? found.id : null;
}

// Tips are translated at render time, so changing language updates them.
const TIPS = [
  { icon: Sun, key: "tip1" },
  { icon: Leaf, key: "tip2" },
  { icon: Focus, key: "tip3" },
];

export const ScanFlow: React.FC = () => {
  const router = useRouter();
  const { setLastDiagnosis, t } = useApp();
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [qualityWarnings, setQualityWarnings] = useState<QualityWarning[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<ScanningStage | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  // Crop picked before scanning (null = Auto-detect: the crop gate
  // decides, as before). Restored from the last scan's pick.
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CROP_STORAGE_KEY);
      if (saved === "wheat" || saved === "cotton" || saved === "rice") setSelectedCrop(saved);
    } catch {
      // A missing/blocked store must never break the scan.
    }
  }, []);
  // When the picked crop changes, start downloading that crop's
  // disease model in the background, so it is ready by scan time.
  // With Auto-detect (null) only the leaf+crop model preloads, and
  // the decided crop's disease model loads at scan time.
  useEffect(() => {
    preloadTfjsModel(selectedCrop);
  }, [selectedCrop]);
  const chooseCrop = (crop: string | null) => {
    setSelectedCrop(crop);
    try {
      if (crop) localStorage.setItem(CROP_STORAGE_KEY, crop);
      else localStorage.removeItem(CROP_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  };

  const pick = async (f: File | undefined) => {
    if (!f) return;
    setError("");
    if (!VALID.includes(f.type)) {
      setError(t("err_file_type"));
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(t("err_too_large"));
      return;
    }
    setFile(f);
    try {
      const thumb = await downscaleImage(f, 900, 0.85);
      setPreview(thumb);
      setQualityWarnings(await assessImageQuality(thumb));
    } catch {
      setError(t("err_open_photo"));
      setFile(null);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setQualityWarnings([]);
    setError("");
    setStage(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const analyze = async (target: File | string, thumb: string | null, cropOverride?: string | null) => {
    setBusy(true);
    setError("");
    try {
      // The crop to scan for: an explicit override (sample leaves
      // carry their own crop), otherwise the farmer's pick, or
      // Auto-detect when nothing is picked.
      const crop = cropOverride !== undefined ? cropOverride : selectedCrop;
      const result: PredictionResult = await predictionService.predictLeafWithProgress(target, setStage, crop);
      const small = typeof target === "string" ? result.imageUrl || thumb || "" : thumb ? await shrink(thumb) : "";
      // An uncertain result is NOT a diagnosis, so it must never be
      // saved in My scans as if it were a crop/disease. Show it once
      // from memory (results page, no id) and do not store it.
      const uncertain = result.status === "uncertain" || result.confidence < 75;
      if (uncertain) {
        setLastDiagnosis({ ...result, imageUrl: small || result.imageUrl });
        router.push("/results");
        return;
      }
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
      setError(t("err_scan"));
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
      setError(t("err_frame"));
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
          <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-accent text-[#0b1a12] label !text-[10px] px-2 py-1">{t("analysing")}</span>
        </div>
        <div role="status" aria-live="polite" className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="font-display font-extrabold text-2xl leading-none">{t("checking")}</p>
            <p className="font-mono text-2xl font-medium leading-none">{pct}%</p>
          </div>
          <div className="grid grid-cols-10 gap-1" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={`h-3 border-2 border-ink ${i < Math.round(pct / 10) ? "bg-accent" : "bg-transparent"}`} />
            ))}
          </div>
          <p className="label text-muted min-h-[1rem]">{stage?.stage ? t(stage.stage) : t("checking")}</p>
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
          <span className="absolute top-3 left-3 bg-ink text-paper label !text-[10px] px-2 py-1">{t("preview")}</span>
        </div>
        {error && <ErrorNote msg={error} />}
        {qualityWarnings.length > 0 && (
          <div className="border-2 border-dashed border-ink p-4 text-sm space-y-2">
            <p className="font-bold">{t("quality_title")}</p>
            <ul className="space-y-1">
              {qualityWarnings.map((w) => (
                <li key={w.code}>• {t(`quality_${w.code}`)}</li>
              ))}
            </ul>
            <p className="text-muted">{t("quality_note")}</p>
          </div>
        )}
        <CropPicker value={selectedCrop} onChange={chooseCrop} t={t} />
        <button onClick={() => file && analyze(file, preview)} className="btn btn-accent w-full min-h-[4rem] text-xl">
          <ScanLine className="w-6 h-6" strokeWidth={2.5} /> {t("check_leaf")}
        </button>
        <button onClick={reset} className="w-full h-12 label flex items-center justify-center gap-2 hover:text-muted transition">
          <RefreshCw className="w-4 h-4" /> {t("different_photo")}
        </button>
      </div>
    );
  }

  /* ---------- Start ---------- */
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 fade-up">
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      <input ref={galleryRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />

      <CropPicker value={selectedCrop} onChange={chooseCrop} t={t} />

      <LiveCamera onCapture={onLiveCapture} onGallery={() => galleryRef.current?.click()} />

      <button
        onClick={() => cameraRef.current?.click()}
        className="w-full label py-3 text-muted hover:text-ink underline underline-offset-4"
      >
        {t("use_phone_camera")}
      </button>

      {error && <ErrorNote msg={error} />}

      <div className="panel p-5">
        <p className="label mb-4">{t("tips_title")}</p>
        <ul className="divide-y-2 divide-ink/15">
          {TIPS.map(({ icon: Icon, key }, i) => (
            <li key={key} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <span className="font-mono text-sm text-muted w-6">0{i + 1}</span>
              <span className="flex-1 font-medium">{t(key)}</span>
              <Icon className="w-5 h-5" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => setShowSamples((v) => !v)} aria-expanded={showSamples} className="w-full flex items-center justify-between label py-3 border-y-2 border-ink">
          {t("sample_title")}
          <ChevronDown className={`w-4 h-4 transition-transform ${showSamples ? "rotate-180" : ""}`} />
        </button>
        {showSamples && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pt-4 pb-2 snap-x">
            {SAMPLE_LEAVES.filter((x) => x.id !== "sample-ood-non-leaf").map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  setPreview(x.thumbnail);
                  // A sample carries its own crop, so it is scanned
                  // as that crop whatever the farmer picked.
                  analyze(x.id, x.thumbnail, cropIdFromDisplay(x.crop));
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

// Crop picker: the same buttons and panel as the rest of the
// interface (btn / btn-accent / btn-paper, panel) — no new look is
// introduced. The picked button is accent; the rest are paper.
const CropPicker: React.FC<{
  value: string | null;
  onChange: (crop: string | null) => void;
  t: (key: string) => string;
}> = ({ value, onChange, t }) => (
  <div className="panel p-4 space-y-3">
    <p className="label">{t("crop_select_label")}</p>
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={value === null}
        className={`btn ${value === null ? "btn-accent" : "btn-paper"} !min-h-[3rem] text-sm`}
      >
        {t("crop_auto")}
      </button>
      {CROPS.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          aria-pressed={value === c.id}
          className={`btn ${value === c.id ? "btn-accent" : "btn-paper"} !min-h-[3rem] text-sm`}
        >
          {c.name}
        </button>
      ))}
    </div>
  </div>
);

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
