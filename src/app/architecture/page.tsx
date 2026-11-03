"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Database,
  Server,
  Smartphone,
  ShieldCheck,
  CheckCircle,
  Activity,
  ArrowRight,
  Code2,
  Sparkles,
  GitBranch,
} from "lucide-react";

export default function ArchitecturePage() {
  const [selectedNode, setSelectedNode] = useState<string>("fastapi");

  const nodes = [
    {
      id: "client",
      title: "Client Presentation Layer",
      tech: "Next.js 14 / React / Tailwind CSS",
      category: "Frontend",
      desc: "Handles real-time webcam frame acquisition, optical viewfinder HUD, responsive mobile UX, and Web MediaDevices API orchestration.",
      specs: ["SSR / Client hydration", "Webcam 1080p stream", "Client-side gating threshold <60%"],
    },
    {
      id: "fastapi",
      title: "Inference API Gateway",
      tech: "FastAPI / Python 3.11 / Uvicorn",
      category: "Backend API Layer",
      desc: "Asynchronous microservice receiving multipart foliar image buffers. Coordinates image tensor transformation and model dispatching.",
      specs: ["POST /predict endpoint", "Pydantic schema validation", "CORS & rate limiting"],
    },
    {
      id: "preprocessing",
      title: "Computer Vision Preprocessing",
      tech: "OpenCV / Pillow / Albumentations",
      category: "Image Processing",
      desc: "Extracts Region of Interest (ROI), normalizes RGB spectral distributions, suppresses background noise, and resizes to 380x380 resolution.",
      specs: ["Channel standardization", "Center crop segmentation", "CLAHE contrast enhancement"],
    },
    {
      id: "model",
      title: "Deep Neural Network Backbone",
      tech: "PyTorch / EfficientNet-B4 / ViT Hybrid",
      category: "AI Core",
      desc: "Dual-branch convolutional and vision transformer network extracting fine lesion texture, halo gradients, and leaf venation embeddings.",
      specs: ["38 pathology classes", "Softmax probability distribution", "46ms inference latency"],
    },
    {
      id: "knowledge",
      title: "Agronomic Knowledge Base",
      tech: "PostgreSQL / JSON Knowledge Schema",
      category: "Domain Intelligence",
      desc: "Curated repository of certified biological, chemical safety, and cultural prevention protocols indexed by host crop and pathogen.",
      specs: ["Biological biostimulants", "Mandatory chemical safety", "Preventive scouting schedules"],
    },
    {
      id: "expert",
      title: "Expert Human-in-the-Loop",
      tech: "Agronomist Review & Active Learning",
      category: "Quality Assurance",
      desc: "Low-confidence (<60%) or out-of-distribution (OOD) captures are automatically routed to certified agronomists for review and retraining tagging.",
      specs: ["OOD rejection gate", "Active learning pipeline", "Confidence margin auditing"],
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              System Engineering & AI Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-500" />
            <span>End-to-End System Architecture</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Detailed technical blueprint matching the Software Requirements Specification (SRS)
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <GitBranch className="w-4 h-4" />
          <span>SRS v1.0 Architectural Reference</span>
        </div>
      </div>

      {/* Interactive Visual Architecture Pipeline Flow */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-emerald-500/20 shadow-md">
        <h3 className="text-xs font-mono uppercase text-zinc-400 font-bold mb-6 tracking-wider">
          Interactive Pipeline Stages (Click any block to inspect technical specifications)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {nodes.map((node, idx) => {
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-emerald-500/15 border-emerald-400 shadow-md ring-2 ring-emerald-500/30"
                    : "bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    {idx < nodes.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 hidden lg:block -mr-2" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 truncate">
                    {node.tech.split("/")[0]}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 font-mono">
                  {node.category}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Technical Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                {activeNodeData.category}
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">{activeNodeData.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs border border-emerald-500/30">
              {activeNodeData.tech}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {activeNodeData.desc}
          </p>

          <div>
            <span className="text-xs font-mono uppercase text-zinc-400 block mb-2 font-bold">
              Engineering Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeNodeData.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-xs font-mono text-emerald-300"
                >
                  ✓ {spec}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future FastAPI Integration Contract */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-500">
            <Code2 className="w-5 h-5" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              FastAPI Contract Spec
            </h4>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The frontend communicates via an abstract inference service. When the real PyTorch model is ready,
            simply update <code className="text-emerald-500 font-mono">NEXT_PUBLIC_AI_PROVIDER=api</code>.
          </p>

          <div className="p-3.5 rounded-xl bg-black/90 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-emerald-950">
            <pre>
{`POST /predict
Content-Type: multipart/form-data
file: <binary_leaf_image>

Response:
{
  "crop": "Rice",
  "disease": "Brown Spot",
  "confidence": 94.6,
  "status": "diseased",
  "symptoms": [...],
  "organic_solution": [...],
  "chemical_solution": [...]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

