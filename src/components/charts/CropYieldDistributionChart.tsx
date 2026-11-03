"use client";

import React from "react";

const DATA = [
  { crop: "Wheat", healthy: 78 },
  { crop: "Potato", healthy: 70 },
  { crop: "Citrus", healthy: 72 },
  { crop: "Rice", healthy: 68 },
  { crop: "Apple", healthy: 65 },
  { crop: "Tomato", healthy: 64 },
  { crop: "Cotton", healthy: 58 },
].sort((a, b) => b.healthy - a.healthy);

export const CropYieldDistributionChart: React.FC = () => (
  <div className="border-2 border-ink bg-card p-5 sm:p-8 h-full">
    <p className="label text-muted">Share of leaves found healthy</p>
    <h3 className="mt-2 font-display font-extrabold text-3xl leading-none">Health by crop</h3>

    <ul className="mt-6 space-y-4">
      {DATA.map((d) => (
        <li key={d.crop} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3">
          <span className="font-bold text-sm">{d.crop}</span>
          <div className="h-6 border-2 border-ink flex" role="img" aria-label={`${d.crop}: ${d.healthy}% healthy`}>
            <div className="h-full bg-accent border-r-2 border-ink" style={{ width: `${d.healthy}%` }} />
            <div className="h-full flex-1 bg-danger/80" />
          </div>
          <span className="font-mono text-sm text-right">{d.healthy}%</span>
        </li>
      ))}
    </ul>
    <p className="mt-5 flex items-center gap-4 label !text-[10px] text-muted">
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-accent border-2 border-ink" /> Healthy</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-danger/80 border-2 border-ink" /> Diseased</span>
    </p>
  </div>
);
