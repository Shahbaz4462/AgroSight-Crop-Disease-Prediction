"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Upload,
  ShieldCheck,
  Cpu,
  BarChart2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scan,
  Activity,
  Layers,
  Leaf,
  Globe2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-emerald-950/10 dark:border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Learning Agricultural Pathology Detection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                AI-Powered Crop Disease Detection
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Scan a plant leaf, identify potential diseases with neural feature extraction, and receive
                evidence-based treatment and prevention guidance designed for sustainable agriculture.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/live-scan"
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 transition transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Live Scan</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/diagnose"
                  className="px-7 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-emerald-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-emerald-500" />
                  <span>Upload Leaf</span>
                </Link>
              </div>

              {/* Trust Indicators & Performance Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-500">
                    96.4%
                  </div>
                  <div className="text-[11px] text-zinc-500">Benchmark Accuracy</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-zinc-900 dark:text-white">
                    12+
                  </div>
                  <div className="text-[11px] text-zinc-500">Major Crops Supported</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-ai-cyan">
                    &lt; 50ms
                  </div>
                  <div className="text-[11px] text-zinc-500">Inference Latency</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Leaf Visual with Floating Neural Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/40 to-black/80 border border-emerald-500/30 shadow-2xl p-4 flex flex-col justify-between">
                {/* Background Specimen Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80"
                    alt="Rice leaf with brown spot"
                    fill
                    className="object-cover opacity-80"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* Top Scanner HUD Overlay */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>AI VISION ACTIVE</span>
                  </div>
                  <span>RES: 1080P</span>
                </div>

                {/* Animated Horizontal Scan Beam */}
                <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-ai-emerald to-transparent scan-laser z-10 shadow-[0_0_12px_#10b981]"></div>

                {/* Corner Targeting Reticles */}
                <div className="absolute top-16 left-8 w-6 h-6 border-t-2 border-l-2 border-emerald-400 z-10"></div>
                <div className="absolute top-16 right-8 w-6 h-6 border-t-2 border-r-2 border-emerald-400 z-10"></div>
                <div className="absolute bottom-28 left-8 w-6 h-6 border-b-2 border-l-2 border-emerald-400 z-10"></div>
                <div className="absolute bottom-28 right-8 w-6 h-6 border-b-2 border-r-2 border-emerald-400 z-10"></div>

                {/* Floating Cards (As requested in prompt) */}
                <div className="relative z-10 space-y-2 mt-auto">
                  {/* Floating Card 1: Crop Detected */}
                  <div className="p-3 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 shadow-lg flex items-center justify-between animate-float">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                        Crop Detected
                      </span>
                      <span className="text-sm font-bold text-white">Rice (Oryza sativa)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      Cereal Staple
                    </span>
                  </div>

                  {/* Floating Card 2: AI Confidence */}
                  <div className="p-3 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                        Pathology Diagnosis
                      </span>
                      <span className="text-sm font-bold text-rose-400">Brown Spot (Bipolaris)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black font-mono text-emerald-400">94.6%</span>
                      <span className="text-[9px] uppercase font-mono text-zinc-400 block">High Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE AI WORKS PIPELINE SECTION */}
      <section className="py-20 bg-zinc-50/50 dark:bg-black/30 border-b border-zinc-200 dark:border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
              Neural Processing Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              How the AgroSight Engine Works
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
              From continuous optical camera capture to verified agronomic prescription
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                step: "01",
                title: "Foliar Image",
                desc: "High-resolution optical capture via browser camera or upload.",
                icon: Camera,
              },
              {
                step: "02",
                title: "Preprocessing",
                desc: "Color normalization, noise reduction, and background suppression.",
                icon: Layers,
              },
              {
                step: "03",
                title: "Crop Detection",
                desc: "Botanical taxonomy segmentation and leaf leaf venation isolation.",
                icon: Leaf,
              },
              {
                step: "04",
                title: "Pathology Net",
                desc: "Deep neural feature extraction across 38+ plant disease classes.",
                icon: Cpu,
              },
              {
                step: "05",
                title: "Confidence Gate",
                desc: "Evaluates certainty (>60% threshold) and flags OOD instances.",
                icon: ShieldCheck,
              },
              {
                step: "06",
                title: "Expert Guidance",
                desc: "Instant biological, chemical safety, and prevention protocol.",
                icon: Activity,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-emerald-500">{item.step}</span>
                      <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORTED CROPS TEASER SECTION */}
      <section className="py-20 border-b border-zinc-200 dark:border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
                Botanical Coverage
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                12 Supported Crop Varieties
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Optimized for major agricultural cereals, cash crops, horticulture, and orchards
              </p>
            </div>
            <Link
              href="/crops"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400"
            >
              <span>Explore Complete Crop Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Rice", category: "Cereal", diseases: 4 },
              { name: "Wheat", category: "Cereal", diseases: 4 },
              { name: "Cotton", category: "Cash Crop", diseases: 4 },
              { name: "Tomato", category: "Vegetable", diseases: 4 },
              { name: "Potato", category: "Vegetable", diseases: 4 },
              { name: "Corn", category: "Cereal", diseases: 4 },
              { name: "Apple", category: "Fruit", diseases: 4 },
              { name: "Grape", category: "Fruit", diseases: 4 },
              { name: "Peach", category: "Fruit", diseases: 4 },
              { name: "Strawberry", category: "Fruit", diseases: 4 },
              { name: "Cherry", category: "Fruit", diseases: 4 },
              { name: "Citrus", category: "Fruit", diseases: 4 },
            ].map((c, i) => (
              <Link
                key={i}
                href="/crops"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-md transition text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{c.name}</h4>
                <p className="text-[10px] text-zinc-500">{c.category}</p>
                <span className="text-[10px] font-mono text-emerald-500 block mt-1">
                  {c.diseases} Pathologies
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPO PRESENTATION BANNER CALLOUT */}
      <section className="py-16 bg-gradient-to-r from-forest-dark via-emerald-950 to-forest-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-ai-emerald" />
            <span>EXHIBITION READY ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black max-w-2xl mx-auto">
            Engineered for International Agricultural Innovation Exhibitions
          </h2>

          <p className="text-sm text-emerald-200/80 max-w-xl mx-auto leading-relaxed">
            AgroSight combines real-time optical camera capture, interactive Pakistan provincial epidemiology,
            and a clean modular inference abstraction ready to integrate trained PyTorch / FastAPI backends.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/live-scan"
              className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Live Camera Scanner</span>
            </Link>

            <Link
              href="/insights"
              className="px-6 py-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 text-emerald-300 font-semibold text-sm border border-emerald-500/30 transition flex items-center gap-2"
            >
              <BarChart2 className="w-4 h-4" />
              <span>View Pakistan & Global Insights</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

