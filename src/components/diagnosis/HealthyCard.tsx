import React from "react";
import { CheckCircle2, Droplets, Sun, Sprout, Eye, ShieldCheck } from "lucide-react";

interface HealthyCardProps {
  crop: string;
  confidence: number;
}

export const HealthyCard: React.FC<HealthyCardProps> = ({ crop, confidence }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 shrink-0">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[11px] font-mono uppercase font-bold text-emerald-500 tracking-wider">
            Optimal Plant Vigor Detected
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            {crop} Leaf Appears Healthy ({confidence.toFixed(1)}%)
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
            No fungal lesions, bacterial streaks, or viral symptoms identified. Chlorophyll distribution
            and vein turgidity reflect sound physiological status.
          </p>
        </div>
      </div>

      {/* Routine Agronomic Care Tips (No disease chemicals!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <Droplets className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Irrigation Guidance</h4>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Maintain consistent soil moisture according to crop growth phase. Avoid standing water
            stagnation which predisposes roots to anaerobic pythium stress.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2 text-amber-500">
            <Sun className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Nutrient Balance</h4>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Supply balanced potassium and micronutrients (Zinc, Boron). Avoid excessive single-dose
            urea application which thins cell walls and attracts sucking pests.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2 text-ai-cyan">
            <Eye className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Scouting & Monitoring</h4>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Inspect lower leaves and canopy undersides weekly. Early detection of sporadic pathogen
            spores enables rapid biological containment before field-wide contagion.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2 text-emerald-500">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Prophylactic Prevention</h4>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Sanitize field implements and eradicate volunteer weeds along bunds that serve as alternate
            hosts for cereal rusts and insect virus vectors.
          </p>
        </div>
      </div>
    </div>
  );
};

