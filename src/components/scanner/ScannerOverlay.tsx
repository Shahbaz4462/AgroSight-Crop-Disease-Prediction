"use client";

import React from "react";
import { ScanningStage } from "../../services/ai/types";
import { Cpu, ShieldCheck, Activity, Target } from "lucide-react";

interface ScannerOverlayProps {
  isScanning: boolean;
  scanningStage: ScanningStage | null;
  cameraReady: boolean;
  leafDetected?: boolean;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({
  isScanning,
  scanningStage,
  cameraReady,
  leafDetected = true,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-8">
      {/* HUD Telemetry Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold tracking-wider">AI VISION ACTIVE</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400 hidden sm:inline">ENGINE: EFFICIENTNET-V1.4</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-zinc-400">FPS: 30</span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-emerald-300">CONFIDENCE THRESHOLD: 60%</span>
        </div>
      </div>

      {/* Target Framing Box */}
      <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl border-2 border-dashed border-emerald-500/40 flex items-center justify-center overflow-hidden transition-all duration-300">
        {/* Subtle grid pattern background inside viewport */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

        {/* High-tech Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>

        {/* Center Target Reticle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-emerald-400/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-400/50 stroke-[1.5]" />
          </div>
        </div>

        {/* Animated Laser Scanning Beam */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-ai-emerald to-transparent scan-laser shadow-[0_0_15px_#10b981]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-ai-emerald/30 blur-sm rounded-full"></div>
          </div>
        )}

        {/* Live Status Message Inside Frame */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          {isScanning && scanningStage ? (
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/40 rounded-xl p-3 text-left shadow-lg">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 mb-1.5">
                <span className="flex items-center gap-1.5 font-mono">
                  <Activity className="w-3.5 h-3.5 animate-spin text-ai-cyan" />
                  {scanningStage.stage}
                </span>
                <span className="font-mono text-emerald-400">{scanningStage.progress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-1.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-ai-cyan h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanningStage.progress}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono truncate">{scanningStage.detail}</p>
            </div>
          ) : cameraReady ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 text-xs font-medium border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Align leaf within the illuminated frame</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom Telemetry Guide */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <span className="text-[11px] font-mono text-zinc-400 bg-black/50 px-3 py-1 rounded-full border border-white/5">
          Tip: Ensure bright indirect daylight and avoid heavy motion blur
        </span>
      </div>
    </div>
  );
};

