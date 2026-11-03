"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MODEL_VERSIONS, MOCK_EXPERT_REVIEWS } from "../../data/modelVersionsData";
import { DISEASES_KNOWLEDGE_BASE } from "../../data/diseasesData";
import { ExpertReviewCase, KnowledgeBaseEntry } from "../../types";
import {
  ShieldAlert,
  Cpu,
  Layers,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "models" | "knowledge">("reviews");
  const [reviewCases, setReviewCases] = useState<ExpertReviewCase[]>(MOCK_EXPERT_REVIEWS);
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeBaseEntry[]>(DISEASES_KNOWLEDGE_BASE);

  const handleAction = (id: string, action: "Confirmed" | "Overridden" | "Retrain Flagged") => {
    setReviewCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: action } : c))
    );
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              Expert Agronomist & MLOps Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-emerald-500" />
            <span>Admin & Model Governance Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Human-in-the-loop review for low-confidence foliar specimens, active learning, and knowledge base curation
          </p>
        </div>

        {/* Prototype Auth Demarcation Notice */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Demo Exhibition Role: Senior Agronomist (Admin)</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "reviews"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Cases Needing Review ({reviewCases.filter((c) => c.status === "Needs Review").length})</span>
        </button>

        <button
          onClick={() => setActiveTab("models")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "models"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Model Registry & Versions</span>
        </button>

        <button
          onClick={() => setActiveTab("knowledge")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "knowledge"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Disease Knowledge Base</span>
        </button>
      </div>

      {/* TAB 1: EXPERT CASES NEEDING REVIEW */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Pending Validation Queue (&lt;60% Confidence / OOD Instances)
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              Active Learning Candidates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewCases.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-zinc-200 dark:border-zinc-800">
                    <Image src={item.imageUrl} alt={item.predictedCrop} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">
                        {item.flagReason}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {item.confidence.toFixed(1)}%
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                      {item.predictedCrop}: {item.predictedDisease}
                    </h4>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Origin: {item.farmerLocation} • {new Date(item.submittedAt).toLocaleDateString()}
                    </p>

                    {item.reviewerNotes && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 italic pt-1">
                        &quot;{item.reviewerNotes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Status & Expert Action Buttons */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Status:</span>
                    <span
                      className={`text-xs font-bold ${
                        item.status === "Confirmed"
                          ? "text-emerald-500"
                          : item.status === "Retrain Flagged"
                          ? "text-ai-cyan"
                          : item.status === "Overridden"
                          ? "text-rose-500"
                          : "text-amber-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAction(item.id, "Confirmed")}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-500 text-xs font-semibold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "Overridden")}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-500 text-xs font-semibold"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "Retrain Flagged")}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-ai-cyan text-xs font-semibold border border-zinc-700"
                    >
                      Tag Retrain
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MODEL REGISTRY & VERSIONS */}
      {activeTab === "models" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Production Model Registry & Quantitative Metrics
              </h3>
              <p className="text-xs text-zinc-500">
                Performance indicators benchmarked on held-out foliar test sets
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-mono border border-amber-500/20">
              Demo Evaluation Metrics
            </span>
          </div>

          <div className="space-y-4">
            {MODEL_VERSIONS.map((model) => (
              <div
                key={model.id}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-zinc-900 dark:text-white">
                        {model.name}
                      </h4>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {model.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{model.architecture}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-400 block">Version {model.version}</span>
                    <span className="text-[11px] text-zinc-500">Released: {model.releaseDate}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Accuracy</span>
                    <span className="text-lg font-black font-mono text-emerald-500">{model.accuracy}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Precision</span>
                    <span className="text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{model.precision}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Recall</span>
                    <span className="text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{model.recall}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">F1-Score</span>
                    <span className="text-lg font-black font-mono text-zinc-800 dark:text-zinc-200">{model.f1Score}%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Latency</span>
                    <span className="text-lg font-black font-mono text-ai-cyan">{model.inferenceTimeMs} ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISEASE KNOWLEDGE BASE MANAGEMENT */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Agronomic Knowledge Entries ({knowledgeList.length})
            </h3>
            <button
              onClick={() => alert("Prototype action: Disease creation modal will connect to backend API.")}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Disease Entry</span>
            </button>
          </div>

          <div className="space-y-3">
            {knowledgeList.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">
                      {entry.crop}: {entry.disease}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
                      {entry.pathogenType}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono italic mt-0.5">
                    {entry.scientificName} • Verified by: {entry.verifiedBy}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => alert(`Editing entry for ${entry.disease}`)}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-500"
                    title="Edit entry"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setKnowledgeList((prev) => prev.filter((k) => k.id !== entry.id))}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

