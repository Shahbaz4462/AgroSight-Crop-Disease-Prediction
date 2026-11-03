"use client";

import React, { useState } from "react";
import { MODEL_VERSIONS, MOCK_EXPERT_REVIEWS } from "../../data/modelVersionsData";
import { DISEASES_KNOWLEDGE_BASE } from "../../data/diseasesData";
import { ExpertReviewCase, KnowledgeBaseEntry } from "../../types";
import { PageHeader, SampleDataNote } from "../../components/layout/PageHeader";
import { Trash2, Check, X, Flag } from "lucide-react";

type Tab = "reviews" | "models" | "knowledge";
type Action = "Confirmed" | "Overridden" | "Retrain Flagged";

const TABS: { key: Tab; label: string }[] = [
  { key: "reviews", label: "Review queue" },
  { key: "models", label: "Models" },
  { key: "knowledge", label: "Knowledge base" },
];

const statusBg: Record<string, string> = {
  Active: "bg-accent text-[#0b1a12]",
  Staging: "bg-warn text-[#0b1a12]",
  Testing: "bg-card",
  Deprecated: "bg-card text-muted",
};

export default function AdminPortalPage() {
  const [tab, setTab] = useState<Tab>("reviews");
  const [cases, setCases] = useState<ExpertReviewCase[]>(MOCK_EXPERT_REVIEWS);
  const [kb, setKb] = useState<KnowledgeBaseEntry[]>(DISEASES_KNOWLEDGE_BASE);

  const act = (id: string, status: Action) => setCases((p) => p.map((c) => (c.id === id ? { ...c, status } : c)));
  const pending = cases.filter((c) => c.status === "Needs Review").length;

  return (
    <div className="w-full">
      <PageHeader label="Expert portal" title="Review & curate." sub="For agronomists: check uncertain scans, compare models and maintain the treatment library.">
        <SampleDataNote text="Prototype. Sample cases, no sign-in yet." />
      </PageHeader>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12 space-y-8">
        <div role="tablist" className="grid grid-cols-3 border-2 border-ink">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`h-14 label !text-[10px] sm:!text-[11px] border-r-2 last:border-r-0 border-ink ${tab === t.key ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
            >
              {t.label}
              {t.key === "reviews" && pending > 0 ? ` · ${pending}` : ""}
            </button>
          ))}
        </div>

        {tab === "reviews" && (
          <section className="space-y-4">
            <p className="label text-muted">Scans under 60% confidence or outside known crops</p>
            <ul className="grid md:grid-cols-2 gap-5">
              {cases.map((c) => (
                <li key={c.id} className="border-2 border-ink bg-card flex flex-col">
                  <div className="flex gap-4 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.imageUrl} alt={c.predictedCrop} className="w-24 h-24 object-cover border-2 border-ink bg-paper shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="label !text-[10px] bg-warn text-[#0b1a12] border-2 border-ink px-1.5 py-1 inline-block">{c.flagReason}</span>
                      <p className="mt-2 font-display font-bold text-xl leading-tight">{c.predictedCrop}</p>
                      <p className="text-sm text-muted">{c.predictedDisease} · <span className="font-mono">{c.confidence.toFixed(1)}%</span></p>
                      <p className="label !text-[10px] text-muted mt-2">{c.farmerLocation}</p>
                    </div>
                  </div>
                  <div className="mt-auto border-t-2 border-ink flex items-stretch">
                    <span className="label !text-[10px] px-4 flex items-center flex-1">{c.status}</span>
                    <button onClick={() => act(c.id, "Confirmed")} aria-label="Confirm prediction" className="w-14 border-l-2 border-ink flex items-center justify-center hover:bg-accent hover:text-[#0b1a12]"><Check className="w-5 h-5" /></button>
                    <button onClick={() => act(c.id, "Overridden")} aria-label="Reject prediction" className="w-14 border-l-2 border-ink flex items-center justify-center hover:bg-danger hover:text-white"><X className="w-5 h-5" /></button>
                    <button onClick={() => act(c.id, "Retrain Flagged")} aria-label="Flag for retraining" className="w-14 border-l-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper"><Flag className="w-5 h-5" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "models" && (
          <ul className="grid lg:grid-cols-3 gap-5">
            {MODEL_VERSIONS.map((m) => (
              <li key={m.id} className="border-2 border-ink bg-card flex flex-col">
                <div className="p-5 space-y-3 flex-1">
                  <span className={`label !text-[10px] border-2 border-ink px-2 py-1 inline-block ${statusBg[m.status] ?? "bg-card"}`}>{m.status}</span>
                  <h3 className="font-display font-extrabold text-2xl leading-tight">{m.name}</h3>
                  <p className="text-sm text-muted">{m.architecture}</p>
                  <p className="label !text-[10px] text-muted">v{m.version} · {m.supportedClasses} classes · {m.datasetSize}</p>
                </div>
                <dl className="grid grid-cols-2 border-t-2 border-ink divide-x-2 divide-ink">
                  {[["Accuracy", `${m.accuracy}%`], ["F1", `${m.f1Score}%`]].map(([k, v]) => (
                    <div key={k} className="p-4">
                      <dt className="label !text-[10px] text-muted">{k}</dt>
                      <dd className="mt-1 font-mono text-2xl">{v}</dd>
                    </div>
                  ))}
                </dl>
                <dl className="grid grid-cols-2 border-t-2 border-ink divide-x-2 divide-ink">
                  {[["Precision", `${m.precision}%`], ["Speed", `${m.inferenceTimeMs} ms`]].map(([k, v]) => (
                    <div key={k} className="p-4">
                      <dt className="label !text-[10px] text-muted">{k}</dt>
                      <dd className="mt-1 font-mono text-2xl">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        )}

        {tab === "knowledge" && (
          <section className="space-y-4">
            <p className="label text-muted">{kb.length} entries</p>
            <ul className="border-2 border-ink bg-card divide-y-2 divide-ink">
              {kb.map((e) => (
                <li key={e.id} className="flex items-stretch">
                  <div className="flex-1 min-w-0 p-4">
                    <p className="font-display font-bold text-xl leading-tight truncate">{e.crop} · {e.disease}</p>
                    <p className="text-sm text-muted italic truncate">{e.scientificName}</p>
                    <p className="label !text-[10px] text-muted mt-2">{e.pathogenType} · Verified by {e.verifiedBy}</p>
                  </div>
                  <button onClick={() => setKb((p) => p.filter((k) => k.id !== e.id))} aria-label={`Remove ${e.disease}`} className="w-14 border-l-2 border-ink flex items-center justify-center text-muted hover:bg-danger hover:text-white">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
