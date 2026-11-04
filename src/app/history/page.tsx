"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { historyService } from "../../services/api/historyService";
import { DiagnosisHistoryItem } from "../../types";
import { formatDate } from "../../lib/utils";
import { useApp } from "../../context/AppContext";
import { ScanLine, Search, Trash2, ArrowUpRight } from "lucide-react";

const FILTERS = [
  { key: "all", labelKey: "filter_all" },
  { key: "diseased", labelKey: "filter_disease" },
  { key: "healthy", labelKey: "filter_healthy" },
  { key: "uncertain", labelKey: "filter_unsure" },
] as const;

const dot = { healthy: "bg-ok", diseased: "bg-danger", uncertain: "bg-warn" } as const;
const word = { healthy: "Healthy", diseased: "Disease", uncertain: "Unsure" } as const;

export default function HistoryPage() {
  const { t } = useApp();
  const [history, setHistory] = useState<DiagnosisHistoryItem[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  // Uncertain scans must not show in My scans at all — not even as
  // a "Not sure" entry. Remove any previously saved uncertain entries
  // from this device, then show only confident diagnoses.
  useEffect(() => {
    const all = historyService.getHistory();
    const uncertain = all.filter((h) => h.status === "uncertain");
    uncertain.forEach((h) => historyService.deleteDiagnosis(h.id));
    setHistory(all.filter((h) => h.status !== "uncertain"));
  }, []);

  const remove = (id: string) => {
    historyService.deleteDiagnosis(id);
    setHistory((h) => h.filter((x) => x.id !== id));
  };
  const clearAll = () => {
    if (confirm("Delete all your saved scans?")) {
      historyService.clearHistory();
      setHistory([]);
    }
  };

  // An uncertain entry is not a diagnosis: never show its stored
  // top-guess crop/disease as if it were one, even for entries saved
  // before this fix. It is shown only as "Not sure / No diagnosis".
  const displayCrop = (h: DiagnosisHistoryItem) => (h.status === "uncertain" ? "Not sure" : h.crop);
  const displayDisease = (h: DiagnosisHistoryItem) =>
    h.status === "uncertain" ? "No diagnosis — retake a clearer photo" : h.disease;

  const q = query.trim().toLowerCase();
  const items = history.filter(
    (h) =>
      (filter === "all" || h.status === filter) &&
      (!q || displayCrop(h).toLowerCase().includes(q) || displayDisease(h).toLowerCase().includes(q) || (h.location ?? "").toLowerCase().includes(q))
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-14 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="label text-muted">{history.length} {t("saved_device")}</p>
          <h1 className="mt-2 font-display font-extrabold text-5xl md:text-6xl leading-[0.9]">{t("my_scans")}</h1>
        </div>
        {history.length > 0 && (
          <button onClick={clearAll} className="label flex items-center gap-1.5 text-danger hover:underline underline-offset-4 pb-1">
            <Trash2 className="w-4 h-4" /> {t("clear_all")}
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_scans")}
          aria-label="Search scans"
          className="w-full h-14 pl-12 pr-4 bg-card border-2 border-ink text-base placeholder:text-muted focus:shadow-hard-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-4 border-2 border-ink" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`h-12 label !text-[11px] border-r-2 last:border-r-0 border-ink transition-colors ${filter === f.key ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
          >
            {t(f.labelKey)}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-dashed border-ink py-16 px-6 text-center space-y-5">
          <p className="font-display font-extrabold text-3xl">{history.length === 0 ? t("no_scans") : t("no_match")}</p>
          <Link href="/diagnose" className="btn btn-accent"><ScanLine className="w-5 h-5" /> {t("nav_scan_leaf")}</Link>
        </div>
      ) : (
        <ul className="border-2 border-ink bg-card divide-y-2 divide-ink">
          {items.map((h) => (
            <li key={h.id} className="flex items-stretch group">
              <Link href={`/results?id=${h.id}`} className="flex-1 min-w-0 flex items-center gap-4 p-3 group-hover:bg-accent group-hover:text-[#0b1a12] transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.thumbnail} alt="" className="w-16 h-16 object-cover border-2 border-ink bg-paper shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-xl leading-tight truncate">{displayCrop(h)}</p>
                  <p className="text-sm opacity-70 truncate">{displayDisease(h)}</p>
                  <p className="label !text-[10px] opacity-60 mt-1.5">{formatDate(h.date)}{h.location ? ` · ${h.location}` : ""}</p>
                </div>
                <span className="label flex items-center gap-2 shrink-0"><span className={`w-2.5 h-2.5 rounded-full ${dot[h.status]}`} />{word[h.status]}</span>
                <ArrowUpRight className="w-5 h-5 shrink-0 hidden sm:block" />
              </Link>
              <button onClick={() => remove(h.id)} aria-label={`Delete scan: ${displayCrop(h)}`} className="w-14 border-l-2 border-ink flex items-center justify-center text-muted hover:bg-danger hover:text-white transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
