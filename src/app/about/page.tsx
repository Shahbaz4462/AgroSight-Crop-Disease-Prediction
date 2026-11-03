import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldAlert,
  Cpu,
  Leaf,
  Globe2,
  CheckCircle2,
  Award,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>International University & Exhibition Project</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
          Pioneering AI-Driven Precision Agriculture
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          AgroSight is an international-level research initiative engineered to bridge advanced computer vision,
          edge deep neural networks, and sustainable agronomic treatment guidance for global smallholder farmers.
        </p>
      </div>

      {/* Mandatory Advisory Notice */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block text-amber-800 dark:text-amber-300">
            Advisory Technology Statement:
          </span>
          AgroSight is designed as an intelligent decision-support advisory system. While our neural models achieve
          high benchmark accuracy, all chemical interventions must be validated against official product labels, local
          regulations, and consultation with certified plant pathologists or local agricultural extension officers.
        </div>
      </div>

      {/* Six Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">The Global Challenge</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Foliar crop diseases account for an estimated 20% to 40% of global agricultural yield losses annually.
            In developing regions, delayed diagnosis and lack of access to trained plant pathologists cause farmers
            to misapply chemical pesticides, escalating financial strain and ecological degradation.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-ai-cyan/10 text-ai-cyan flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Our AI Technological Approach</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We utilize hybrid convolutional neural networks (EfficientNet-B4) paired with vision transformer
            attention mechanisms. The model isolates minute lesion colorations, necrotic concentric rings, and
            chlorosis borders while enforcing a strict 60% confidence gate to eliminate false positives.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Ecological & Sustainable Solutions</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Unlike generic diagnostic tools that recommend aggressive chemicals indiscriminately, AgroSight
            prioritizes bio-fungicides, neem botanicals, antagonistic Trichoderma strains, and soil amendment
            practices before escalating to targeted synthetic chemistry.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-forest-light/20 text-emerald-500 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Exhibition & Future Deployment</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The platform frontend is decoupled from inference via an abstract API gateway layer. It supports
            instant transition to a production FastAPI + PyTorch backend without modifying UI components, enabling
            frictionless deployment to offline edge tablets and drone payloads.
          </p>
        </div>
      </div>

      {/* CTA Callout */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-forest-dark via-emerald-950 to-forest-dark text-white text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">Ready to Experience AgroSight Live?</h3>
        <p className="text-xs sm:text-sm text-emerald-200/80 max-w-md mx-auto leading-relaxed">
          Launch our optical camera viewfinder or upload a sample leaf photograph to evaluate real-time neural
          inference.
        </p>
        <div className="pt-2">
          <Link
            href="/live-scan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg transition"
          >
            <span>Launch Live Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

