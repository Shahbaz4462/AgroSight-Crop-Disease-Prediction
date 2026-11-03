"use client";

import React from "react";
import { PakistanMapInteractive } from "../../components/charts/PakistanMapInteractive";
import { GlobalInsightsVisualizer } from "../../components/charts/GlobalInsightsVisualizer";
import { DiseaseDistributionChart } from "../../components/charts/DiseaseDistributionChart";
import { CropYieldDistributionChart } from "../../components/charts/CropYieldDistributionChart";
import { BarChart3, Globe, TrendingUp, AlertCircle, Info, Sparkles } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              Agricultural Big Data & Epidemiology
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
            <span>Foliar Disease Analytics & Regional Trends</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Multi-regional crop health patterns, biological pathogen categories, and provincial distribution
          </p>
        </div>

        {/* SRS Demarcation Banner */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Research benchmark sample datasets for exhibition modeling</span>
        </div>
      </div>

      {/* Top Level Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            Total Monitored Specimens
          </span>
          <span className="text-2xl font-black font-mono text-zinc-900 dark:text-white">
            44,820
          </span>
          <span className="text-[11px] text-emerald-500 block mt-1">+14.2% verified this season</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            National Healthy Foliage Index
          </span>
          <span className="text-2xl font-black font-mono text-emerald-500">
            68.6%
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">Weighted across 6 provinces</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            Predominant Pathogen Vector
          </span>
          <span className="text-2xl font-black font-mono text-rose-500">
            Fungal (48%)
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">High humidity leaf spots</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            Mean Model Certainty
          </span>
          <span className="text-2xl font-black font-mono text-ai-cyan">
            94.8%
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">Exceeds 60% gating threshold</span>
        </div>
      </div>

      {/* 1. Interactive Pakistan Map Section */}
      <section className="space-y-4">
        <PakistanMapInteractive />
      </section>

      {/* 2. Analytical Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DiseaseDistributionChart />
        <CropYieldDistributionChart />
      </section>

      {/* 3. Global Agricultural Insights Section */}
      <section className="space-y-4">
        <GlobalInsightsVisualizer />
      </section>
    </div>
  );
}

