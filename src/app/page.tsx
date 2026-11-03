"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ScanLine } from "lucide-react";
import { historyService } from "../services/api/historyService";
import { DiagnosisHistoryItem } from "../types";
import { formatDate } from "../lib/utils";
import { LeafSpecimen } from "../components/layout/LeafSpecimen";

const CROPS = ["Wheat", "Cotton", "Rice", "Maize", "Tomato", "Potato", "Apple", "Grape", "Citrus", "Peach", "Cherry", "Strawberry"];

const STEPS = [
  { n: "01", title: "Photograph", text: "One leaf, in daylight. Fill the frame." },
  { n: "02", title: "We check", text: "Compared against known crop diseases in seconds." },
  { n: "03", title: "You act", text: "Plain steps: what it is, what to spray, how to stop it spreading." },
];

const dot = { healthy: "bg-ok", diseased: "bg-danger", uncertain: "bg-warn" } as const;
const word = { healthy: "Healthy", diseased: "Disease", uncertain: "Unsure" } as const;

export default function HomePage() {
  const [recent, setRecent] = useState<DiagnosisHistoryItem[]>([]);
  useEffect(() => setRecent(historyService.getHistory().slice(0, 3)), []);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-10 md:pt-16 md:pb-20 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="label text-muted fade-up">Field diagnostics · Wheat · Cotton · Rice</p>
            <h1 className="mt-4 font-display font-extrabold leading-[0.88] text-[3.4rem] sm:text-7xl lg:text-[6.5rem] fade-up d1">
              Is your
              <br />
              crop{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.2em] bg-accent" aria-hidden="true" />
                <span className="relative text-[#0b1a12]">sick?</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg md:text-xl leading-snug text-muted fade-up d2">
              Take a photo of a leaf. Know what&apos;s wrong and what to do about it, before it spreads to the whole field.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 fade-up d3">
              <Link href="/diagnose" className="btn btn-accent w-full sm:w-auto min-h-[4rem] text-xl px-8">
                <ScanLine className="w-6 h-6" strokeWidth={2.5} /> Scan a leaf
              </Link>
              <Link href="/crops" className="btn btn-paper w-full sm:w-auto min-h-[4rem]">
                Crop guide <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 fade-up d2 lg:rotate-[1.5deg]">
            <LeafSpecimen />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-ink text-paper overflow-hidden border-b-2 border-ink" aria-hidden="true">
        <div className="flex w-max animate-marquee py-3">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {CROPS.map((c) => (
                <span key={c + k} className="label !text-xs px-6 flex items-center gap-6">
                  {c} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* RECENT */}
      {recent.length > 0 && (
        <section className="border-b-2 border-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl">Your latest scans</h2>
              <Link href="/history" className="label flex items-center gap-1 hover:text-muted">
                All scans <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <ul className="border-2 border-ink bg-card divide-y-2 divide-ink">
              {recent.map((h) => (
                <li key={h.id}>
                  <Link href={`/results?id=${h.id}`} className="flex items-center gap-4 p-3 hover:bg-accent hover:text-[#0b1a12] transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={h.thumbnail} alt="" className="w-14 h-14 object-cover border-2 border-ink bg-paper" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-lg leading-tight truncate">{h.crop}</p>
                      <p className="text-sm opacity-70 truncate">{h.disease}</p>
                    </div>
                    <span className="label hidden sm:block opacity-70">{formatDate(h.date)}</span>
                    <span className="label flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${dot[h.status]}`} />
                      {word[h.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* STEPS */}
      <section className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95] max-w-2xl">Three steps. About ten seconds.</h2>
          <ol className="mt-10 grid md:grid-cols-3 border-2 border-ink bg-card divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink">
            {STEPS.map((s) => (
              <li key={s.n} className="p-6 md:p-8 hover:bg-accent hover:text-[#0b1a12] transition-colors">
                <span className="font-mono text-6xl md:text-7xl font-medium tracking-tighter">{s.n}</span>
                <h3 className="mt-6 font-display font-bold text-2xl">{s.title}</h3>
                <p className="mt-2 opacity-70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MAP CTA */}
      <section className="bg-forest text-[#eaf0e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="label text-accent">Disease map</p>
            <h2 className="mt-3 font-display font-extrabold text-4xl md:text-5xl leading-[0.95] max-w-xl">See what&apos;s spreading near you.</h2>
          </div>
          <Link href="/insights" className="btn btn-accent !shadow-[4px_4px_0_0_#eaf0e6] !border-[#eaf0e6]">
            Open the map <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
