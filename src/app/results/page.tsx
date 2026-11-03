"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";
import { PredictionResult } from "../../services/ai/types";
import { ConfidenceMeter } from "../../components/diagnosis/ConfidenceMeter";
import { SymptomsList } from "../../components/diagnosis/SymptomsList";
import { TreatmentCard } from "../../components/diagnosis/TreatmentCard";
import { HealthyCard } from "../../components/diagnosis/HealthyCard";
import { UncertainCard } from "../../components/diagnosis/UncertainCard";
import { ReportActions } from "../../components/diagnosis/ReportActions";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Leaf,
  ShieldCheck,
  Cpu,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function DiagnosisResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lastDiagnosis } = useApp();

  const id = searchParams.get("id");

  // Determine which diagnosis to display
  let result: PredictionResult = lastDiagnosis || {
    id: "pred-default",
    crop: SAMPLE_LEAVES[0].crop,
    disease: SAMPLE_LEAVES[0].disease,
    confidence: SAMPLE_LEAVES[0].confidence,
    status: SAMPLE_LEAVES[0].status,
    symptoms: SAMPLE_LEAVES[0].symptoms,
    cause: SAMPLE_LEAVES[0].cause,
    organic_solution: SAMPLE_LEAVES[0].organicSolution,
    chemical_solution: SAMPLE_LEAVES[0].chemicalSolution,
    prevention: SAMPLE_LEAVES[0].prevention,
    timestamp: new Date().toISOString(),
    imageUrl: SAMPLE_LEAVES[0].thumbnail,
    scientificName: SAMPLE_LEAVES[0].scientificName,
  };

  // If specific sample is requested via id
  if (id && id !== "latest") {
    const matchedSample = SAMPLE_LEAVES.find((s) => s.id === id);
    if (matchedSample) {
      result = {
        id: matchedSample.id,
        crop: matchedSample.crop,
        disease: matchedSample.disease,
        confidence: matchedSample.confidence,
        status: matchedSample.status,
        symptoms: matchedSample.symptoms,
        cause: matchedSample.cause,
        organic_solution: matchedSample.organicSolution,
        chemical_solution: matchedSample.chemicalSolution,
        prevention: matchedSample.prevention,
        message: matchedSample.message,
        timestamp: new Date().toISOString(),
        imageUrl: matchedSample.thumbnail,
        scientificName: matchedSample.scientificName,
      };
    }
  }

  const isHealthy = result.status === "healthy" || result.disease.toLowerCase().includes("healthy");
  const isUncertain = result.status === "uncertain" || result.confidence < 60;

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 print:hidden">
        <Link
          href="/live-scan"
          className="text-xs text-zinc-500 hover:text-emerald-500 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Scanner</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">REPORT ID:</span>
          <span className="text-[11px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {result.id || "PRED-2026-EXPO"}
          </span>
        </div>
      </div>

      {/* Main Top Header Card */}
      <div className="bg-white dark:bg-zinc-900/70 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-emerald-500/20 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Specimen Photo Thumbnail */}
          <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-zinc-200 dark:border-zinc-800 shadow-md">
            <Image
              src={result.imageUrl || "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80"}
              alt={`${result.crop} ${result.disease}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-mono text-emerald-300 flex items-center justify-between">
              <span>CAPTURED SPECIMEN</span>
              <span>1080P</span>
            </div>
          </div>

          {/* Core Diagnosis Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase font-bold text-emerald-500 tracking-wider">
                AI Diagnosis Report
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-[11px] text-zinc-400">
                {result.timestamp ? new Date(result.timestamp).toLocaleDateString() : "Just now"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              {result.crop}: {result.disease}
            </h1>

            {result.scientificName && (
              <p className="text-xs font-mono italic text-emerald-600 dark:text-emerald-400">
                {result.scientificName}
              </p>
            )}

            {result.cause && (
              <div className="pt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <span className="font-semibold block text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Etiology & Pathogen Cause:
                </span>
                <p>{result.cause}</p>
              </div>
            )}
          </div>

          {/* Animated Confidence Ring */}
          <div className="md:col-span-3 flex justify-center border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800/80 pt-6 md:pt-0 md:pl-6">
            <ConfidenceMeter confidence={result.confidence} />
          </div>
        </div>
      </div>

      {/* STATE-BASED DIAGNOSIS SECTIONS */}

      {/* CASE A: UNCERTAIN OR LOW CONFIDENCE (< 60%) */}
      {isUncertain && (
        <UncertainCard
          confidence={result.confidence}
          message={result.message}
          crop={result.crop}
          imageUrl={result.imageUrl}
        />
      )}

      {/* CASE B: HEALTHY SPECIMEN */}
      {isHealthy && !isUncertain && (
        <HealthyCard crop={result.crop} confidence={result.confidence} />
      )}

      {/* CASE C: CONFIRMED DISEASE (> 60%) */}
      {!isHealthy && !isUncertain && (
        <div className="space-y-6">
          {/* Symptoms List */}
          {result.symptoms && result.symptoms.length > 0 && (
            <SymptomsList symptoms={result.symptoms} />
          )}

          {/* Treatment Guidance (Organic, Chemical + Safety Notice, Prevention) */}
          <TreatmentCard
            organicSolution={result.organic_solution}
            chemicalSolution={result.chemical_solution}
            prevention={result.prevention}
          />
        </div>
      )}

      {/* Print, Download, Share Actions */}
      <ReportActions result={result} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-sm font-mono text-emerald-500 animate-pulse">
            Loading Diagnostic Results...
          </div>
        </div>
      }
    >
      <DiagnosisResultContent />
    </Suspense>
  );
}

