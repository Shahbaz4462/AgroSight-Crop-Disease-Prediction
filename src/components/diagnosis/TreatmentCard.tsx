import React from "react";
import { Leaf, FlaskConical, ShieldCheck, AlertTriangle } from "lucide-react";

interface TreatmentCardProps {
  organicSolution?: string[];
  chemicalSolution?: string[];
  prevention?: string[];
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  organicSolution = [],
  chemicalSolution = [],
  prevention = [],
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Organic / Natural Solutions */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Organic & Biological Interventions
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Environmentally sustainable bio-fungicides and natural soil amendments
            </p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {organicSolution.map((sol, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/15 text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed"
            >
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                0{index + 1}.
              </span>
              <span>{sol}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Chemical Solutions & Strict Safety Notice */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-ai-cyan/10 text-ai-cyan">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Chemical & Pharmacological Guidance
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Targeted synthetic fungicides and resistance management chemistry
            </p>
          </div>
        </div>

        {/* SRS Mandated Safety Notice */}
        <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block text-amber-800 dark:text-amber-300">
              Mandatory Chemical Safety Notice:
            </span>
            Chemical treatments should be used strictly according to product labels, local regulations,
            environmental protection laws, and professional agricultural guidance from certified crop specialists.
          </div>
        </div>

        <ul className="space-y-2.5">
          {chemicalSolution.map((chem, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed"
            >
              <span className="font-mono font-bold text-ai-cyan shrink-0">
                C-{index + 1}
              </span>
              <span>{chem}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Preventive Agronomic Measures */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-forest-light/20 text-emerald-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Long-term Preventive Measures
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Cultural practices, soil balance, and crop rotation schedules
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prevention.map((prev, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-200"
            >
              <span className="text-[11px] font-mono text-emerald-500 block mb-1">
                Strategy #{index + 1}
              </span>
              <p className="leading-relaxed">{prev}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

