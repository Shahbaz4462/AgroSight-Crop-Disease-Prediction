"use client";

import React, { useState } from "react";
import { GLOBAL_REGIONS_DATA } from "../../data/globalRegionsData";
import { useApp } from "../../context/AppContext";
import { ArrowUpRight } from "lucide-react";

const regionKey: Record<string, string> = {
  Asia: "region_asia",
  Europe: "region_europe",
  Africa: "region_africa",
  "North America": "region_north_america",
  "South America": "region_south_america",
  Oceania: "region_oceania",
};

export const GlobalInsightsVisualizer: React.FC = () => {
  const { t, language } = useApp();
  // Urdu/Roman Urdu display text for data that is English in the data file.
  // Falls back to English when a translation is absent.
  const langText = (en: string, ur?: string, roman?: string) =>
    language === "ur" ? (ur ?? en) : language === "roman" ? (roman ?? en) : en;
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
            {t(regionKey[r.region])}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-12">
        <div className="md:col-span-4 p-5 sm:p-8 border-b-2 md:border-b-0 md:border-r-2 border-ink space-y-6">
          <div>
            <p className="label text-muted">{t("headline_label")}</p>
            <p className="mt-2 font-mono text-4xl font-medium">{active.headlineStat.value}</p>
            <p className="mt-2 text-sm">{langText(active.headlineStat.label, active.headlineStat.labelUr, active.headlineStat.labelRoman)}</p>
            <div className="mt-2 bg-accent/25 px-3 py-2">
              <p className="text-xs text-muted">{active.headlineStat.source}</p>
              {active.headlineStat.sourceUrl && (
                <a href={active.headlineStat.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-paper mt-2 !min-h-[2rem] !px-3 !py-1 !text-xs">
                  {t("view_source")} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="label text-muted mb-2">{t("main_threats")}</p>
            <div className="flex flex-wrap gap-1.5">
              {active.primaryCropThreats.map((t) => (
                <span key={t} className="label !text-[10px] border-2 border-ink bg-paper px-2 py-1.5">{t}</span>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">
            {t("sources_label")}: {active.sources} · {t("updated_label")} {active.lastUpdated}
          </p>
        </div>

        <div className="md:col-span-8 p-5 sm:p-8">
          <p className="label text-muted mb-4">{t("most_common")} {t(regionKey[active.region])}</p>
          <ul className="space-y-5">
            {active.prevalentDiseases.map((d, i) => (
              <li key={d.disease}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display font-bold text-xl leading-tight">{i + 1}. {d.disease}</span>
                  <span className="font-mono text-xl">{d.crop}</span>
                </div>
                <div className="mt-1 bg-accent/25 px-3 py-2">
                  <p className="text-sm text-muted">{d.source}</p>
                  {d.sourceUrl && (
                    <a href={d.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-paper mt-2 !min-h-[2rem] !px-3 !py-1 !text-xs">
                      {t("view_source")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
