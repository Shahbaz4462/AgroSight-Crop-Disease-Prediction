"use client";

import React, { useState } from "react";
import { UploadDropzone } from "../../components/diagnosis/UploadDropzone";
import { LiveScanner } from "../../components/scanner/LiveScanner";
import { Camera, Upload, Sparkles, Layers } from "lucide-react";

export default function DiagnosePage() {
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("camera");

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diagnostic Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
          Plant Foliar Diagnosis
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Choose either real-time camera scanning or upload a high-resolution leaf photograph for deep
          pathological classification.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mt-4">
          <button
            onClick={() => setActiveTab("camera")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "camera"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "upload"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Leaf Photo</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full flex justify-center">
        {activeTab === "camera" ? (
          <LiveScanner />
        ) : (
          <UploadDropzone />
        )}
      </div>
    </div>
  );
}

