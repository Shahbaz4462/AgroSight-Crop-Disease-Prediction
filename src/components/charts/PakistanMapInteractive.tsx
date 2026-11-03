"use client";

import React, { useState } from "react";
import { PAKISTAN_REGIONS_DATA } from "../../data/pakistanRegionsData";
import { ProvinceStatistic } from "../../types";

const SHAPES: { id: string; d: string; label: string; lx: number; ly: number }[] = [
  { id: "balochistan", d: "M 50 180 L 190 190 L 220 280 L 160 370 L 60 350 L 30 250 Z", label: "Balochistan", lx: 80, ly: 275 },
  { id: "sindh", d: "M 160 370 L 220 280 L 290 290 L 260 410 L 180 410 Z", label: "Sindh", lx: 200, ly: 360 },
  { id: "punjab", d: "M 190 190 L 280 150 L 340 190 L 320 290 L 220 280 Z", label: "Punjab", lx: 235, ly: 235 },
  { id: "kpk", d: "M 180 100 L 250 80 L 280 150 L 190 190 Z", label: "KPK", lx: 205, ly: 145 },
  { id: "gilgit-baltistan", d: "M 250 80 L 320 30 L 370 70 L 310 110 L 270 90 Z", label: "GB", lx: 300, ly: 75 },
  { id: "ajk", d: "M 280 110 L 310 110 L 300 160 L 275 145 Z", label: "AJK", lx: 283, ly: 140 },
];

const riskBg: Record<string, string> = { Low: "bg-ok", Medium: "bg-warn", High: "bg-danger", Alert: "bg-danger" };

export const PakistanMapInteractive: React.FC = () => {
  const [sel, setSel] = useState<ProvinceStatistic>(PAKISTAN_REGIONS_DATA[0]);

  return (
    <div className="grid lg:grid-cols-12 border-2 border-ink bg-card">
      <div className="lg:col-span-7 p-4 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-ink grid-bg">
        <svg viewBox="0 0 400 440" className="w-full max-w-lg mx-auto h-auto" role="group" aria-label="Map of Pakistan provinces">
          {SHAPES.map((s) => {
            const on = sel.id === s.id;
            return (
              <g
                key={s.id}
                tabIndex={0}
                role="button"
                aria-label={s.label}
                aria-pressed={on}
                className="cursor-pointer outline-none"
                onClick={() => setSel(PAKISTAN_REGIONS_DATA.find((p) => p.id === s.id) ?? sel)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(PAKISTAN_REGIONS_DATA.find((p) => p.id === s.id) ?? sel)}
              >
                <path d={s.d} strokeWidth="3" strokeLinejoin="round" className={`transition-colors ${on ? "fill-accent stroke-ink" : "fill-card stroke-ink hover:fill-ink/10"}`} />
                <text x={s.lx} y={s.ly} className="fill-ink pointer-events-none" style={{ font: "600 11px var(--font-mono), monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 border-2 border-ink">
          {PAKISTAN_REGIONS_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => setSel(p)}
              className={`h-11 label !text-[10px] border-r-2 last:border-r-0 border-ink ${sel.id === p.id ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
            >
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 p-5 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label text-muted">{sel.capital}</p>
            <h3 className="mt-2 font-display font-extrabold text-4xl leading-none">{sel.name}</h3>
          </div>
          <span className={`label !text-[10px] px-2 py-1.5 border-2 border-ink text-[#0b1a12] ${riskBg[sel.riskLevel] ?? "bg-warn"}`}>{sel.riskLevel} risk</span>
        </div>

        <dl className="grid grid-cols-3 border-2 border-ink divide-x-2 divide-ink text-center">
          {[
            ["Scans", sel.totalDiagnoses.toLocaleString()],
            ["Healthy", `${sel.healthyPercentage}%`],
            ["Output", `${sel.cropProductionShare}%`],
          ].map(([k, v]) => (
            <div key={k} className="py-3">
              <dt className="label !text-[10px] text-muted">{k}</dt>
              <dd className="mt-1.5 font-mono text-lg font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="label text-muted mb-2">Main crops</p>
          <div className="flex flex-wrap gap-1.5">
            {sel.majorCrops.map((c) => (
              <span key={c} className="label !text-[10px] border-2 border-ink px-2 py-1.5 bg-paper">{c}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="label text-muted mb-3">Most common diseases</p>
          <ul className="space-y-3.5">
            {sel.topDiseases.map((d) => (
              <li key={d.name}>
                <div className="flex justify-between gap-3 text-sm font-medium">
                  <span className="truncate">{d.name}</span>
                  <span className="font-mono">{d.percentage}%</span>
                </div>
                <div className="mt-1.5 h-3 border-2 border-ink">
                  <div className="h-full bg-ink" style={{ width: `${Math.min(100, d.percentage * 2.5)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
