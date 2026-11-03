import React from "react";
import { Check, AlertCircle } from "lucide-react";

interface SymptomsListProps {
  symptoms: string[];
}

export const SymptomsList: React.FC<SymptomsListProps> = ({ symptoms }) => {
  if (!symptoms || symptoms.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-5 border border-zinc-200 dark:border-emerald-500/20 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <AlertCircle className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Observed Morphological Symptoms
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {symptoms.map((symptom, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed"
          >
            <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-500 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{symptom}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

