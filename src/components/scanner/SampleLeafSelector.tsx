"use client";

import React from "react";
import Image from "next/image";
import { SAMPLE_LEAVES, SampleLeaf } from "../../data/sampleLeaves";
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

interface SampleLeafSelectorProps {
  onSelectSample: (sample: SampleLeaf) => void;
  selectedSampleId?: string | null;
}

export const SampleLeafSelector: React.FC<SampleLeafSelectorProps> = ({
  onSelectSample,
  selectedSampleId,
}) => {
  return (
    <div className="w-full bg-emerald-950/20 dark:bg-emerald-950/40 rounded-2xl p-4 border border-emerald-500/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Exhibition Quick-Test Leaves
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
          Click any specimen to simulate instant live scan
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {SAMPLE_LEAVES.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`group text-left p-2 rounded-xl transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/40"
                  : "bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-zinc-800">
                <Image
                  src={sample.thumbnail}
                  alt={sample.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute top-1 right-1">
                  {sample.status === "healthy" ? (
                    <span className="bg-emerald-500 text-white p-1 rounded-full text-[10px] inline-flex">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                  ) : sample.status === "uncertain" ? (
                    <span className="bg-amber-500 text-white p-1 rounded-full text-[10px] inline-flex">
                      <AlertTriangle className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="bg-rose-500 text-white p-1 rounded-full text-[10px] inline-flex">
                      <HelpCircle className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {sample.crop}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {sample.disease}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono font-semibold px-1 py-0.2 rounded ${
                      sample.status === "healthy"
                        ? "text-emerald-500 bg-emerald-500/10"
                        : sample.status === "uncertain"
                        ? "text-amber-500 bg-amber-500/10"
                        : "text-rose-400 bg-rose-500/10"
                    }`}
                  >
                    {sample.confidence}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

