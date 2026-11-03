"use client";

import React, { useState } from "react";
import { PAKISTAN_REGIONS_DATA } from "../../data/pakistanRegionsData";
import { ProvinceStatistic } from "../../types";
import { MapPin, AlertCircle, Info, ChevronRight, Activity } from "lucide-react";

export const PakistanMapInteractive: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceStatistic>(PAKISTAN_REGIONS_DATA[0]);

  return (
    <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-500">
              <MapPin className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Pakistan Agro-Epidemiological Map
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Interactive provincial foliar pathology distribution & national crop production share
          </p>
        </div>

        {/* SRS Mandated Sample Data Notice */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Verified Sample / Demo Exhibition Dataset</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SVG Interactive Graphic Map */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
          <div className="relative w-full aspect-[4/3] max-w-md">
            <svg
              viewBox="0 0 500 450"
              className="w-full h-full drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Balochistan polygon */}
              <path
                d="M 50 180 L 190 190 L 220 280 L 160 370 L 60 350 L 30 250 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "balochistan"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "balochistan")!)}
              />

              {/* Sindh polygon */}
              <path
                d="M 160 370 L 220 280 L 290 290 L 260 410 L 180 410 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "sindh"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "sindh")!)}
              />

              {/* Punjab polygon */}
              <path
                d="M 190 190 L 280 150 L 340 190 L 320 290 L 220 280 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "punjab"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "punjab")!)}
              />

              {/* KPK polygon */}
              <path
                d="M 180 100 L 250 80 L 280 150 L 190 190 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "kpk"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "kpk")!)}
              />

              {/* Gilgit-Baltistan polygon */}
              <path
                d="M 250 80 L 320 30 L 370 70 L 310 110 L 270 90 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "gilgit-baltistan"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "gilgit-baltistan")!)}
              />

              {/* AJK polygon */}
              <path
                d="M 280 110 L 310 110 L 300 160 L 275 145 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedProvince.id === "ajk"
                    ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                    : "fill-zinc-300 dark:fill-emerald-950/60 hover:fill-emerald-600/40 stroke-zinc-400 dark:stroke-emerald-800"
                }`}
                onClick={() => setSelectedProvince(PAKISTAN_REGIONS_DATA.find((p) => p.id === "ajk")!)}
              />

              {/* Map Labels */}
              <text x="100" y="270" fill="currentColor" className="text-[12px] font-bold dark:text-zinc-300 pointer-events-none">
                Balochistan
              </text>
              <text x="250" y="240" fill="currentColor" className="text-[12px] font-bold dark:text-zinc-300 pointer-events-none">
                Punjab
              </text>
              <text x="210" y="360" fill="currentColor" className="text-[12px] font-bold dark:text-zinc-300 pointer-events-none">
                Sindh
              </text>
              <text x="200" y="145" fill="currentColor" className="text-[11px] font-bold dark:text-zinc-300 pointer-events-none">
                KPK
              </text>
              <text x="300" y="65" fill="currentColor" className="text-[10px] font-bold dark:text-zinc-300 pointer-events-none">
                GB
              </text>
              <text x="310" y="140" fill="currentColor" className="text-[9px] font-bold dark:text-zinc-300 pointer-events-none">
                AJK
              </text>
            </svg>
          </div>

          {/* Quick province buttons underneath */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            {PAKISTAN_REGIONS_DATA.map((prov) => (
              <button
                key={prov.id}
                onClick={() => setSelectedProvince(prov)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  selectedProvince.id === prov.id
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                }`}
              >
                {prov.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Province Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-emerald-500/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl font-urdu text-emerald-600 dark:text-emerald-400 font-bold block">
                  {selectedProvince.urduName}
                </span>
                <h4 className="text-lg font-black text-zinc-900 dark:text-white">
                  {selectedProvince.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                  Agri Production Share
                </span>
                <span className="text-base font-extrabold font-mono text-emerald-500">
                  {selectedProvince.cropProductionShare}%
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-200 dark:border-zinc-800 text-center my-3">
              <div>
                <span className="text-[10px] text-zinc-400 font-mono block">Sample Scans</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">
                  {selectedProvince.totalDiagnoses.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-mono block">Healthy Ratio</span>
                <span className="text-xs font-bold text-emerald-500">
                  {selectedProvince.healthyPercentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-mono block">Pathology Risk</span>
                <span className="text-xs font-bold text-amber-500">
                  {selectedProvince.riskLevel}
                </span>
              </div>
            </div>

            {/* Major Crops */}
            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">
                Staple & Commercial Crops
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProvince.majorCrops.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium border border-emerald-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Diseases Prevalence */}
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
                Prevalent Crop Pathologies
              </span>
              <div className="space-y-2">
                {selectedProvince.topDiseases.map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[200px]">
                        {d.name}
                      </span>
                      <span className="font-mono text-zinc-500 text-[11px]">{d.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                        style={{ width: `${d.percentage * 2.5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

