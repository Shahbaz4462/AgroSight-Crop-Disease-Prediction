"use client";

import React, { useState } from "react";
import { PredictionResult } from "../../services/ai/types";
import { Printer, Download, Share2, BookmarkCheck, Check } from "lucide-react";

interface ReportActionsProps {
  result: PredictionResult;
}

export const ReportActions: React.FC<ReportActionsProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownload = () => {
    const reportData = JSON.stringify(result, null, 2);
    const blob = new Blob([reportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AgroSight-Diagnosis-${result.crop}-${result.disease.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm print:hidden">
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <BookmarkCheck className="w-4 h-4 text-emerald-500" />
        <span>Case archived to local diagnostic history</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition flex items-center gap-1.5"
          title="Print official diagnostic report"
        >
          <Printer className="w-3.5 h-3.5 text-zinc-500" />
          <span>Print Report</span>
        </button>

        <button
          onClick={handleDownload}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition flex items-center gap-1.5"
          title="Download raw inference JSON"
        >
          <Download className="w-3.5 h-3.5 text-zinc-500" />
          <span>Download JSON</span>
        </button>

        <button
          onClick={handleShare}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1.5"
          title="Copy link to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? "Link Copied!" : "Share Report"}</span>
        </button>
      </div>
    </div>
  );
};

