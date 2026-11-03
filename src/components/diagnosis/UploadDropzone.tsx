"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { predictionService } from "../../services/ai/predictionService";
import { PredictionResult, ScanningStage } from "../../services/ai/types";
import { SampleLeafSelector } from "../scanner/SampleLeafSelector";
import { SampleLeaf } from "../../data/sampleLeaves";
import { historyService } from "../../services/api/historyService";
import { useApp } from "../../context/AppContext";
import {
  UploadCloud,
  FileImage,
  X,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface UploadDropzoneProps {
  onDiagnosisComplete?: (result: PredictionResult) => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onDiagnosisComplete }) => {
  const router = useRouter();
  const { setLastDiagnosis } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; sizeMb: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanningStage, setScanningStage] = useState<ScanningStage | null>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMsg("");

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Unsupported file format. Please upload a standard JPG or PNG photograph.");
      return;
    }

    // Validate size (10 MB max)
    const sizeInMb = file.size / (1024 * 1024);
    if (sizeInMb > 10) {
      setErrorMsg(`File exceeds 10 MB limit (${sizeInMb.toFixed(1)} MB). Please select a compressed image.`);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Read dimensions
    const img = new window.Image();
    img.src = objectUrl;
    img.onload = () => {
      setImageMeta({
        width: img.width,
        height: img.height,
        sizeMb: sizeInMb.toFixed(2),
      });
    };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageMeta(null);
    setErrorMsg("");
    setScanningStage(null);
  };

  const handleAnalyze = async (overrideTarget?: File | string) => {
    const target = overrideTarget || selectedFile;
    if (!target) return;

    setIsAnalyzing(true);
    setErrorMsg("");

    try {
      const result = await predictionService.predictLeafWithProgress(
        target,
        (stage: ScanningStage) => setScanningStage(stage)
      );

      // Save to local history
      historyService.addDiagnosis({
        crop: result.crop,
        disease: result.disease,
        confidence: result.confidence,
        status: result.status,
        thumbnail: previewUrl || result.imageUrl || "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80",
        notes: "Uploaded foliar specimen.",
        symptoms: result.symptoms,
        cause: result.cause,
        organicSolution: result.organic_solution,
        chemicalSolution: result.chemical_solution,
        prevention: result.prevention,
      });

      setLastDiagnosis(result);
      if (onDiagnosisComplete) {
        onDiagnosisComplete(result);
      } else {
        router.push(`/results?id=${result.id || "latest"}`);
      }
    } catch (err) {
      console.error("Upload inference failed:", err);
      setErrorMsg("Neural pipeline execution failed. Please verify image clarity.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleSelected = (sample: SampleLeaf) => {
    setPreviewUrl(sample.thumbnail);
    setImageMeta({
      width: 1200,
      height: 900,
      sizeMb: "1.4",
    });
    // Trigger analysis
    handleAnalyze(sample.id);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Dropzone Container */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full max-w-2xl rounded-3xl p-8 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden ${
          isDragging
            ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
            : "border-zinc-300 dark:border-emerald-500/25 bg-white/70 dark:bg-zinc-900/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              validateAndProcessFile(e.target.files[0]);
            }
          }}
        />

        {!previewUrl ? (
          <div className="space-y-4 py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Drag and drop your leaf photograph here
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Supports JPG, PNG up to 10 MB. High-resolution daylight captures produce the highest accuracy.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                Browse Files
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {/* Image Preview Card */}
            <div className="relative w-full aspect-[16/10] max-h-72 rounded-2xl overflow-hidden bg-black/50 border border-zinc-200 dark:border-zinc-800">
              <Image src={previewUrl} alt="Leaf preview" fill className="object-contain" />
              <button
                onClick={handleClear}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Meta tags */}
            {imageMeta && (
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-2">
                <span>{selectedFile ? selectedFile.name : "Exhibition Specimen"}</span>
                <span>
                  {imageMeta.width} × {imageMeta.height} px | {imageMeta.sizeMb} MB
                </span>
              </div>
            )}

            {/* Stage Progress if analyzing */}
            {isAnalyzing && scanningStage && (
              <div className="bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl p-4 text-left border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    {scanningStage.stage}
                  </span>
                  <span className="font-mono">{scanningStage.progress}%</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden mb-1">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${scanningStage.progress}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">{scanningStage.detail}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClear}
                className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                Change Image
              </button>
              <button
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing}
                className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <span>{isAnalyzing ? "Analyzing Features..." : "Diagnose Leaf Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Quick Test Leaf Gallery */}
      <div className="w-full max-w-2xl">
        <SampleLeafSelector onSelectSample={handleSampleSelected} />
      </div>
    </div>
  );
};

