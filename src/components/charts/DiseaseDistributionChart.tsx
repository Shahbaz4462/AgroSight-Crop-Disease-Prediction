"use client";

import React from "react";
import { useApp } from "../../context/AppContext";

const DATA = [
  { name: "Fungal", note: "Blights, rusts, spots", value: 48 },
  { name: "Bacterial", note: "Cankers, wilts", value: 24 },
  { name: "Viral", note: "Leaf curls, mosaics", value: 16 },
  { name: "Nutrient / stress", note: "Physiological", value: 12 },
];

export const DiseaseDistributionChart: React.FC = () => {
  const { t } = useApp();
  return (
  <div className="border-2 border-ink bg-card p-5 sm:p-8 h-full">
    <p className="label text-muted">{t("disease_cause_label")}</p>
    <h3 className="mt-2 font-display font-extrabold text-3xl leading-none">{t("disease_types")}</h3>

    <div className="mt-6 flex h-10 border-2 border-ink" role="img" aria-label="Share of disease types">
      {DATA.map((d, i) => (
        <div key={d.name} style={{ width: `${d.value}%` }} className={`${["bg-ink", "bg-accent", "bg-warn", "bg-card"][i]} ${i ? "border-l-2 border-ink" : ""}`} />
      ))}
    </div>

    <ul className="mt-6 divide-y-2 divide-ink/15">
      {DATA.map((d, i) => (
        <li key={d.name} className="flex items-center gap-4 py-3">
          <span className={`w-4 h-4 border-2 border-ink shrink-0 ${["bg-ink", "bg-accent", "bg-warn", "bg-card"][i]}`} />
          <span className="flex-1">
            <span className="block font-bold">{d.name}</span>
            <span className="block text-sm text-muted">{d.note}</span>
          </span>
          <span className="font-mono text-2xl font-medium">{d.value}%</span>
        </li>
      ))}
    </ul>
  </div>
  );
};
