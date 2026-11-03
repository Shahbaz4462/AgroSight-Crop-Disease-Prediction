"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Upload, UserCheck, ShieldAlert, Check } from "lucide-react";

interface UncertainCardProps {
  confidence: number;
  message?: string;
  crop?: string;
  imageUrl?: string;
}

export const UncertainCard: React.FC<UncertainCardProps> = ({
  confidence,
  message,
  crop = "Unknown Specimen",
  imageUrl,
}) => {
  const router = useRouter();
  const [submittedToExpert, setSubmittedToExpert] = useState(false);

  const handleSubmitExpertReview = () => {
    setSubmittedToExpert(true);
  };

  const isOod = confidence < 30 || crop.toLowerCase().includes("unknown");

  return (
    <div className="space-y-6">
      {/* Primary Alert Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/40">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shrink-0">
            <AlertTriangle className="w-9 h-9" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-500 tracking-wider">
                {isOod ? "Out of Distribution (OOD)" : "Confidence Threshold (<60%) Unmet"}
              </span>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                {confidence.toFixed(1)}%
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              {isOod ? "Non-Crop or Out-of-Distribution Object" : "Uncertain Foliar Detection"}
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl leading-relaxed">
              {message ||
                "The neural feature embeddings do not exhibit sufficient statistical certainty to warrant a definitive diagnostic label. Applying pesticides without confirmed identification risks unnecessary chemical expense and crop phytotoxicity."}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Recovery Steps */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Recommended Next Actions for Accuracy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-bold text-emerald-500 block mb-1">1. Optical Contrast</span>
            Place a single leaf flat against a neutral background (e.g. palm of hand or sheet of paper).
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-bold text-emerald-500 block mb-1">2. Stable Focus</span>
            Ensure steady hand-holding 15-20 cm away; tap your screen to focus directly on lesion spots.
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-bold text-emerald-500 block mb-1">3. Supported Crop</span>
            Verify that specimen is one of the 12 supported crops (Rice, Wheat, Cotton, Apple, Tomato, etc.).
          </div>
        </div>

        {/* Action Buttons as required by SRS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => router.push("/live-scan")}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan Again</span>
            </button>

            <button
              onClick={() => router.push("/diagnose")}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload Better Image</span>
            </button>
          </div>

          <div>
            {!submittedToExpert ? (
              <button
                onClick={handleSubmitExpertReview}
                className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-semibold border border-amber-500/30 transition flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Submit to Agronomist Review Queue</span>
              </button>
            ) : (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Dispatched to Expert Review Queue (#REV-2026)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

