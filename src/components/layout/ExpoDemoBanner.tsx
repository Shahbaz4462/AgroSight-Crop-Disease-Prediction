"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { Sparkles, Camera, BarChart3, Cpu, ChevronRight, X, ShieldAlert } from "lucide-react";

export const ExpoDemoBanner: React.FC = () => {
  const { expoMode, toggleExpoMode, aiProvider, setAiProvider } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!expoMode || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-forest-dark via-emerald-950 to-forest-dark border-b border-emerald-500/30 text-white px-4 py-2 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ai-emerald"></span>
          </span>
          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-xs">
            International Expo Mode Active
          </span>
          <span className="hidden lg:inline text-emerald-200/80">
            | Prototype Demonstration with Simulated Edge-Inference & Sample Test Leaves
          </span>
        </div>

        {/* Quick Demo Shortcuts for Exhibition Judges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/live-scan"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600/60 hover:bg-emerald-500 text-white font-medium text-xs transition border border-emerald-400/40"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch Live Scanner</span>
          </Link>

          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-light/60 hover:bg-forest-light text-emerald-200 font-medium text-xs transition border border-emerald-700/40"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pakistan & Global</span> Stats
          </Link>

          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-light/60 hover:bg-forest-light text-emerald-200 font-medium text-xs transition border border-emerald-700/40"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Pipeline</span>
          </Link>

          {/* AI Backend Provider Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-emerald-800/40">
            <span className="text-[11px] text-zinc-400">AI Source:</span>
            <button
              onClick={() => setAiProvider(aiProvider === "mock" ? "api" : "mock")}
              className="text-[11px] font-mono text-emerald-400 hover:underline uppercase"
              title="Toggle between Mock Inference and FastAPI Backend API"
            >
              [{aiProvider}]
            </button>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-400 hover:text-white p-1 ml-1"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

