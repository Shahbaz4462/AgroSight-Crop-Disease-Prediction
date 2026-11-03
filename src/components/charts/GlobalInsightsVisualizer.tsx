"use client";

import React, { useState } from "react";
import { GLOBAL_REGIONS_DATA } from "../../data/globalRegionsData";
import { GlobalRegionStatistic } from "../../types";
import { Globe2, ShieldAlert, Thermometer, TrendingUp, Info } from "lucide-react";

export const GlobalInsightsVisualizer: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<GlobalRegionStatistic>(GLOBAL_REGIONS_DATA[0]);

  return (
    <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-ai-cyan/10 text-ai-cyan">
              <Globe2 className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Global Agricultural Insights & Phytopathology
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Crop health patterns and climatic risk indices across continental agricultural regions
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>International Sample Dataset</span>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {GLOBAL_REGIONS_DATA.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setActiveRegion(reg)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeRegion.id === reg.id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            {reg.region}
          </button>
        ))}
      </div>

      {/* Main Region Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Sample Scan Volume</span>
          </div>
          <p className="text-xl font-bold font-mono text-zinc-900 dark:text-white">
            {activeRegion.totalDiagnosesSample.toLocaleString()}
          </p>
          <span className="text-[11px] text-zinc-500">Aggregated research benchmark instances</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Thermometer className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Climate Stress Index</span>
          </div>
          <p className="text-xl font-bold font-mono text-amber-500">
            {activeRegion.climateImpactIndex} / 100
          </p>
          <span className="text-[11px] text-zinc-500">Vulnerability to humidity & heat spikes</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-ai-cyan mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Digital Agronomy Score</span>
          </div>
          <p className="text-xl font-bold font-mono text-ai-cyan">
            {activeRegion.adoptionScore}%
          </p>
          <span className="text-[11px] text-zinc-500">Mobile computer-vision field adoption</span>
        </div>
      </div>

      {/* Disease Prevalences */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
        <h4 className="text-xs font-mono uppercase text-zinc-400 mb-3 tracking-wider">
          Dominant Regional Plant Pathologies ({activeRegion.region})
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeRegion.prevalentDiseases.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.disease}</p>
                <p className="text-[11px] text-zinc-500">Host: {item.crop}</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-500 px-2 py-0.5 rounded bg-emerald-500/10">
                {item.rate}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

