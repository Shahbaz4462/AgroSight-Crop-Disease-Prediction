"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { historyService } from "../../services/api/historyService";
import { DiagnosisHistoryItem } from "../../types";
import { formatDate } from "../../lib/utils";
import { ScanLine, Search, Trash2, ArrowUpRight } from "lucide-react";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "diseased", label: "Disease" },
  { key: "healthy", label: "Healthy" },
  { key: "uncertain", label: "Unsure" },
] as const;

const dot = { healthy: "bg-ok", diseased: "bg-danger", uncertain: "bg-warn" } as const;
const word = { healthy: "Healthy", diseased: "Disease", uncertain: "Unsure" } as const;

export default function HistoryPage() {
  const [history, setHistory] = useState<DiagnosisHistoryItem[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  useEffect(() => setHistory(historyService.getHistory()), []);

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

  const q = query.trim().toLowerCase();
  const items = history.filter(
    (h) =>
      (filter === "all" || h.status === filter) &&
      (!q || h.crop.toLowerCase().includes(q) || h.disease.toLowerCase().includes(q) || (h.location ?? "").toLowerCase().includes(q))
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-14 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="label text-muted">{history.length} saved on this device</p>
          <h1 className="mt-2 font-display font-extrabold text-5xl md:text-6xl leading-[0.9]">My scans.</h1>
        </div>
        {history.length > 0 && (
          <button onClick={clearAll} className="label flex items-center gap-1.5 text-danger hover:underline underline-offset-4 pb-1">
            <Trash2 className="w-4 h-4" /> Clear all
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search crop or disease"
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
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-dashed border-ink py-16 px-6 text-center space-y-5">
          <p className="font-display font-extrabold text-3xl">{history.length === 0 ? "No scans yet." : "No match."}</p>
          <Link href="/diagnose" className="btn btn-accent"><ScanLine className="w-5 h-5" /> Scan a leaf</Link>
        </div>
      ) : (
        <ul className="border-2 border-ink bg-card divide-y-2 divide-ink">
          {items.map((h) => (
            <li key={h.id} className="flex items-stretch group">
              <Link href={`/results?id=${h.id}`} className="flex-1 min-w-0 flex items-center gap-4 p-3 group-hover:bg-accent group-hover:text-[#0b1a12] transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.thumbnail} alt="" className="w-16 h-16 object-cover border-2 border-ink bg-paper shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-xl leading-tight truncate">{h.crop}</p>
                  <p className="text-sm opacity-70 truncate">{h.disease}</p>
                  <p className="label !text-[10px] opacity-60 mt-1.5">{formatDate(h.date)}{h.location ? ` · ${h.location}` : ""}</p>
                </div>
                <span className="label flex items-center gap-2 shrink-0"><span className={`w-2.5 h-2.5 rounded-full ${dot[h.status]}`} />{word[h.status]}</span>
                <ArrowUpRight className="w-5 h-5 shrink-0 hidden sm:block" />
              </Link>
              <button onClick={() => remove(h.id)} aria-label={`Delete scan of ${h.crop}`} className="w-14 border-l-2 border-ink flex items-center justify-center text-muted hover:bg-danger hover:text-white transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
