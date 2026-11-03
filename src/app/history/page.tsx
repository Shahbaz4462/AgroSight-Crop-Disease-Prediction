"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { historyService } from "../../services/api/historyService";
import { DiagnosisHistoryItem } from "../../types";
import { formatDate } from "../../lib/utils";
import {
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Trash2,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<DiagnosisHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleClear = () => {
    if (confirm("Clear local diagnosis history log?")) {
      historyService.clearHistory();
      setHistory([]);
    }
  };

  // Filter items
  const filtered = history.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCrop = selectedCrop === "All" || item.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesCrop && matchesStatus;
  });

  const cropsList = Array.from(new Set(history.map((h) => h.crop)));

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-emerald-500">
              Audit & Records
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-500" />
            <span>Diagnosis History</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Archived computer vision scans, confidence logs, and therapeutic prescriptions
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-medium transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by crop, disease, or field location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Crops</option>
            {cropsList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Health Statuses</option>
            <option value="diseased">Diseased</option>
            <option value="healthy">Healthy</option>
            <option value="uncertain">Uncertain (&lt;60%)</option>
          </select>
        </div>
      </div>

      {/* Records Table / Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            No diagnostic records found matching your filters.
          </p>
          <Link
            href="/live-scan"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
          >
            <span>Scan First Leaf</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/results?id=${item.id}`)}
              className="group p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-emerald-500/20 hover:border-emerald-500/60 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-200 dark:border-zinc-800">
                  <Image src={item.thumbnail} alt={item.crop} fill className="object-cover" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">
                      {item.crop}
                    </span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      {item.disease}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {formatDate(item.date)}
                    </span>
                    {item.location && <span>Loc: {item.location}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
                <div className="text-right">
                  <div
                    className={`text-base font-black font-mono ${
                      item.confidence >= 80
                        ? "text-emerald-500"
                        : item.confidence >= 60
                        ? "text-amber-500"
                        : "text-rose-500"
                    }`}
                  >
                    {item.confidence.toFixed(1)}%
                  </div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400">
                    {item.status}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-600 group-hover:text-white transition text-zinc-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

