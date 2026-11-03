import React from "react";
import Link from "next/link";
import { Scan, ShieldAlert, Cpu, Heart, ExternalLink, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-emerald-950/20 dark:border-emerald-500/20 bg-emerald-950/5 dark:bg-[#040e0a] text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
      {/* Top Advisory Disclaimer Banner (SRS Requirement) */}
      <div className="border-b border-emerald-900/10 dark:border-emerald-500/15 bg-amber-500/5 dark:bg-amber-950/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-800 dark:text-amber-300/90 text-center">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Agricultural Advisory Notice:</strong> AgroSight provides AI-assisted diagnostic decision support.
            Chemical and organic treatments should be applied strictly according to official pesticide label directions,
            safety guidelines, and advice from certified agronomists or local extension officers.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Research Scope */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white">
                <Scan className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                AgroSight
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              International exhibition platform demonstrating real-time computer vision and deep learning architectures
              for foliar crop pathology detection, treatment guidance, and regional agricultural epidemiology.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>FastAPI & EfficientNet Inference Ready</span>
            </div>
          </div>

          {/* Column 2: System Capabilities */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-3">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/live-scan" className="hover:text-emerald-500 transition">
                  Real-time Camera Scanner
                </Link>
              </li>
              <li>
                <Link href="/diagnose" className="hover:text-emerald-500 transition">
                  High-Resolution Foliar Upload
                </Link>
              </li>
              <li>
                <Link href="/crops" className="hover:text-emerald-500 transition">
                  12+ Crop Pathology Library
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-emerald-500 transition">
                  Pakistan Regional Epidemiology
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-emerald-500 transition">
                  Global Crop Health Visualizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Architecture & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-3">
              Architecture & Research
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/architecture" className="hover:text-emerald-500 transition">
                  End-to-End Pipeline Specs
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-500 transition">
                  Expert Review & Model Registry
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-emerald-500 transition">
                  Diagnostic History & Auditing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition">
                  Project Mission & Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: International Project Info */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-3">
              Exhibition Reference
            </h4>
            <div className="p-3 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Standard:</span>
                <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">SRS v1.0 Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Inference Mode:</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">Modular API Layer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Target Deploy:</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">FastAPI + ONNX/PyTorch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-900/10 dark:border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 <strong>AgroSight</strong>. International University & Exhibition Research Project. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500" /> for Smart Agriculture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

