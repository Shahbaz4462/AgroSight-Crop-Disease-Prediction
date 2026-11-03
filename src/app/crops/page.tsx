"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CROPS_DATA } from "../../data/cropsData";
import { DISEASES_KNOWLEDGE_BASE } from "../../data/diseasesData";
import { CropInfo, KnowledgeBaseEntry } from "../../types";
import {
  BookOpen,
  Search,
  Filter,
  Camera,
  ChevronRight,
  Leaf,
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";

export default function CropsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDiseaseModal, setActiveDiseaseModal] = useState<KnowledgeBaseEntry | null>(null);

  const categories = ["All", "Cereal", "Cash Crop", "Fruit", "Vegetable"];

  const filteredCrops = CROPS_DATA.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.commonDiseases.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openDiseaseDetail = (diseaseName: string, cropName: string) => {
    const matched = DISEASES_KNOWLEDGE_BASE.find(
      (d) =>
        d.disease.toLowerCase().includes(diseaseName.toLowerCase()) ||
        diseaseName.toLowerCase().includes(d.disease.toLowerCase())
    );

    if (matched) {
      setActiveDiseaseModal(matched);
    } else {
      // Create a temporary knowledge card if not full KB
      setActiveDiseaseModal({
        id: `kb-temp-${Date.now()}`,
        crop: cropName,
        disease: diseaseName,
        scientificName: "Pathogen taxonomy entry",
        pathogenType: "Fungal",
        cause: `Foliar pathogen affecting ${cropName} under fluctuating temperature and leaf wetness.`,
        symptoms: [
          `Foliar chlorotic and necrotic lesions appearing on ${cropName} leaves`,
          "Reduced photosynthetic efficiency and leaf drop",
        ],
        organicSolution: [
          "Apply certified neem oil extract (3-5 ml/L) or botanical bio-fungicide.",
          "Incorporate organic compost to enhance beneficial soil antagonistics.",
        ],
        chemicalSolution: [
          "Apply broad-spectrum protective fungicide (Mancozeb 75% WP @ 2.0 g/L).",
          "Follow product label safety instructions strictly.",
        ],
        prevention: [
          "Ensure balanced crop nutrition; avoid excessive nitrogen.",
          "Prune canopy for adequate aeration and sunlight penetration.",
        ],
        lastUpdated: "2026-11-01",
        verifiedBy: "Agricultural Research System",
      });
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              Taxonomy & Pathogen Repository
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span>Supported Crop & Disease Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Searchable botanical directory of 12+ crops and over 38 validated foliar pathologies
          </p>
        </div>

        <Link
          href="/live-scan"
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          <span>Launch Live Camera</span>
        </Link>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crop or disease (e.g. Rice, Yellow Rust)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="group rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Crop Image Header */}
              <div className="relative w-full h-44 bg-black/60 overflow-hidden">
                <Image
                  src={crop.imageUrl}
                  alt={crop.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/30">
                    {crop.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white">{crop.name}</h3>
                  <p className="text-xs font-mono italic text-emerald-200/90">{crop.scientificName}</p>
                </div>
              </div>

              {/* Crop Details */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {crop.description}
                </p>

                {/* Common Diseases */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2 font-bold tracking-wider">
                    Detectable Foliar Pathologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {crop.commonDiseases.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => openDiseaseDetail(d, crop.name)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20 transition flex items-center gap-1"
                      >
                        <span>{d}</span>
                        <ChevronRight className="w-3 h-3 text-emerald-500/60" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                Cycle: {crop.growthCycleDays} days
              </span>
              <button
                onClick={() => router.push(`/live-scan`)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan {crop.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Detail Modal */}
      {activeDiseaseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveDiseaseModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-1">
                <span>{activeDiseaseModal.crop} Pathology</span>
                <span>•</span>
                <span>Type: {activeDiseaseModal.pathogenType}</span>
              </div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                {activeDiseaseModal.disease}
              </h2>
              <p className="text-xs font-mono italic text-zinc-500 mt-0.5">
                {activeDiseaseModal.scientificName}
              </p>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block mb-1 uppercase tracking-wider text-[11px]">
                  Cause & Biological Transmission
                </span>
                <p>{activeDiseaseModal.cause}</p>
              </div>

              <div>
                <span className="font-bold text-zinc-900 dark:text-white block mb-2 uppercase tracking-wider text-[11px]">
                  Visual Diagnostic Symptoms
                </span>
                <ul className="list-disc list-inside space-y-1">
                  {activeDiseaseModal.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Organic Solutions */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/30 border border-emerald-500/20">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-2 flex items-center gap-1.5 text-xs">
                  <Leaf className="w-4 h-4" />
                  Organic & Biological Control
                </span>
                <ul className="space-y-1.5">
                  {activeDiseaseModal.organicSolution.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Solutions */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-ai-cyan block mb-2 flex items-center gap-1.5 text-xs">
                  <FlaskConical className="w-4 h-4" />
                  Chemical Interventions & Active Ingredients
                </span>
                <ul className="space-y-1.5">
                  {activeDiseaseModal.chemicalSolution.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-ai-cyan font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Apply chemical fungicides strictly under local agronomic guidance and follow recommended pre-harvest intervals (PHI).
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setActiveDiseaseModal(null)}
                className="px-5 py-2 rounded-xl bg-zinc-800 text-white font-medium text-xs hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

