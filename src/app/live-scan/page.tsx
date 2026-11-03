"use client";

import React from "react";
import { LiveScanner } from "../../components/scanner/LiveScanner";
import { Sparkles, Camera, ShieldCheck, Cpu, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LiveScanPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-emerald-500 flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              Live Optical Computer Vision
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-3">
            <span>Real-Time Foliar Scanner</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Position a single leaf specimen inside the optical viewfinder. The neural pipeline continuously
            processes morphology, venation, and lesion symptoms in real time.
          </p>
        </div>

        {/* Expo Badge */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Expo Interactive Mode</span>
        </div>
      </div>

      {/* Main Scanner Component */}
      <LiveScanner />

      {/* Instructions & Guidelines Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 text-xs space-y-1">
          <span className="font-bold text-emerald-500 block">1. Daylight Lighting</span>
          <p className="text-zinc-500 dark:text-zinc-400">
            Natural or bright white illumination reveals genuine color chlorosis and fungal sporulation halos.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 text-xs space-y-1">
          <span className="font-bold text-emerald-500 block">2. Single Leaf Framing</span>
          <p className="text-zinc-500 dark:text-zinc-400">
            Isolate an individual symptomatic leaf to avoid multi-object background confusion in the bounding reticle.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 text-xs space-y-1">
          <span className="font-bold text-emerald-500 block">3. Exhibition Quick Presets</span>
          <p className="text-zinc-500 dark:text-zinc-400">
            No live leaf available? Tap any specimen thumbnail in the test bar to simulate instant live scans!
          </p>
        </div>
      </div>
    </div>
  );
}

