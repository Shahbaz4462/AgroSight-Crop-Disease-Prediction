"use client";

import React, { useState } from "react";
import { GLOBAL_REGIONS_DATA } from "../../data/globalRegionsData";

export const GlobalInsightsVisualizer: React.FC = () => {
  const [active, setActive] = useState(GLOBAL_REGIONS_DATA[0]);

  return (
    <div className="border-2 border-ink bg-card">
      <div role="tablist" className="flex overflow-x-auto no-scrollbar border-b-2 border-ink">
        {GLOBAL_REGIONS_DATA.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={active.id === r.id}
            onClick={() => setActive(r)}
            className={`h-14 px-6 label whitespace-nowrap border-r-2 border-ink shrink-0 ${active.id === r.id ? "bg-ink text-paper" : "hover:bg-accent hover:text-[#0b1a12]"}`}
          >
            {r.region}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-12">
        <div className="md:col-span-4 p-5 sm:p-8 border-b-2 md:border-b-0 md:border-r-2 border-ink space-y-6">
          <div>
            <p className="label text-muted">Scans in sample</p>
            <p className="mt-2 font-mono text-4xl font-medium">{active.totalDiagnosesSample.toLocaleString()}</p>
          </div>
          <div>
            <p className="label text-muted">Climate risk · {active.climateImpactIndex}/100</p>
            <div className="mt-2 h-4 border-2 border-ink">
              <div className="h-full bg-danger" style={{ width: `${active.climateImpactIndex}%` }} />
            </div>
          </div>
          <div>
            <p className="label text-muted mb-2">Main threats</p>
            <div className="flex flex-wrap gap-1.5">
              {active.primaryCropThreats.map((t) => (
                <span key={t} className="label !text-[10px] border-2 border-ink bg-paper px-2 py-1.5">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-8 p-5 sm:p-8">
          <p className="label text-muted mb-4">Most common diseases in {active.region}</p>
          <ul className="space-y-5">
            {active.prevalentDiseases.map((d) => (
              <li key={d.disease}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display font-bold text-xl leading-tight">{d.disease}</span>
                  <span className="font-mono text-xl">{d.rate}%</span>
                </div>
                <p className="text-sm text-muted">{d.crop}</p>
                <div className="mt-2 h-4 border-2 border-ink">
                  <div className="h-full bg-ink" style={{ width: `${Math.min(100, d.rate * 2.2)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
