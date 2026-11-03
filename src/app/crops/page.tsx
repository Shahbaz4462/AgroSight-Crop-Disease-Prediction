"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CROPS_DATA } from "../../data/cropsData";
import { DISEASES_KNOWLEDGE_BASE } from "../../data/diseasesData";
import { CropInfo, KnowledgeBaseEntry } from "../../types";
import { PageHeader } from "../../components/layout/PageHeader";
import { Search, X, ScanLine, Droplets, Thermometer, CalendarDays, ArrowUpRight } from "lucide-react";

const CATEGORIES = ["All", "Cereal", "Cash Crop", "Fruit", "Vegetable"];

function findGuide(disease: string): KnowledgeBaseEntry | undefined {
  const q = disease.toLowerCase();
  return DISEASES_KNOWLEDGE_BASE.find((d) => d.disease.toLowerCase().includes(q) || q.includes(d.disease.toLowerCase()));
}

export default function CropsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [crop, setCrop] = useState<CropInfo | null>(null);
  const [guide, setGuide] = useState<{ name: string; entry?: KnowledgeBaseEntry } | null>(null);

  const q = query.trim().toLowerCase();
  const crops = CROPS_DATA.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      (!q || c.name.toLowerCase().includes(q) || c.scientificName.toLowerCase().includes(q) || c.commonDiseases.some((d) => d.toLowerCase().includes(q)))
  );

  useEffect(() => {
    document.body.style.overflow = guide ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGuide(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [guide]);

  return (
    <div className="w-full">
      <PageHeader label="Crop guide" title="Know your crop." sub="Common diseases, growing conditions and treatment for each crop we can check." />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12 space-y-6">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crop or disease"
              aria-label="Search crops"
              className="w-full h-14 pl-12 pr-4 bg-card border-2 border-ink placeholder:text-muted outline-none focus:shadow-hard-sm"
            />
          </div>
          <div role="tablist" className="md:col-span-7 grid grid-cols-5 border-2 border-ink">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`h-14 label !text-[10px] sm:!text-[11px] border-r-2 last:border-r-0 border-ink ${category === c ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
              >
                {c === "Cash Crop" ? "Cash" : c}
              </button>
            ))}
          </div>
        </div>

        {crops.length === 0 ? (
          <p className="border-2 border-dashed border-ink py-16 text-center font-display font-extrabold text-3xl">No crop found.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crops.map((c, i) => {
              const open = crop?.id === c.id;
              return (
                <li key={c.id} className={`border-2 border-ink bg-card flex flex-col ${open ? "shadow-hard-lg" : "hover:shadow-hard"} transition-shadow ${open ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                  <button onClick={() => setCrop(open ? null : c)} aria-expanded={open} className={`text-left p-5 sm:p-6 flex items-start gap-5 ${open ? "bg-accent text-[#0b1a12]" : ""}`}>
                    <span className="font-mono text-5xl font-medium leading-none tracking-tighter opacity-90">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 min-w-0">
                      <span className="label !text-[10px] block opacity-70">{c.category}</span>
                      <span className="block font-display font-extrabold text-3xl leading-none mt-1.5">{c.name}</span>
                      <span className="block italic text-sm opacity-70 mt-1">{c.scientificName}</span>
                    </span>
                    <span className="label text-xl leading-none mt-1">{open ? "−" : "+"}</span>
                  </button>

                  {open && (
                    <div className="p-5 sm:p-6 border-t-2 border-ink grid md:grid-cols-2 gap-8 fade-up">
                      <div className="space-y-6">
                        <p className="text-lg leading-snug">{c.description}</p>
                        <dl className="grid grid-cols-3 border-2 border-ink divide-x-2 divide-ink text-center">
                          {[
                            [CalendarDays, "Cycle", `${c.growthCycleDays} days`],
                            [Thermometer, "Temp", c.optimalTemperature],
                            [Droplets, "Water", c.waterRequirement],
                          ].map(([Icon, k, v]) => {
                            const I = Icon as React.ElementType;
                            return (
                              <div key={k as string} className="py-3 px-1">
                                <I className="w-5 h-5 mx-auto" />
                                <dt className="label !text-[10px] text-muted mt-2">{k as string}</dt>
                                <dd className="mt-1 font-mono text-sm">{v as string}</dd>
                              </div>
                            );
                          })}
                        </dl>
                        <Link href="/diagnose" className="btn btn-accent w-full sm:w-auto"><ScanLine className="w-5 h-5" /> Scan a {c.name.toLowerCase()} leaf</Link>
                      </div>
                      <div>
                        <p className="label text-muted mb-3">Common diseases</p>
                        <ul className="border-2 border-ink divide-y-2 divide-ink">
                          {c.commonDiseases.map((d) => (
                            <li key={d}>
                              <button onClick={() => setGuide({ name: d, entry: findGuide(d) })} className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold hover:bg-accent hover:text-[#0b1a12] transition-colors">
                                {d} <ArrowUpRight className="w-5 h-5 shrink-0" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Disease guide drawer */}
      {guide && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label={`${guide.name} guide`}>
          <button className="absolute inset-0 bg-ink/60" onClick={() => setGuide(null)} aria-label="Close guide" />
          <aside className="relative w-full sm:max-w-xl h-full bg-paper border-l-2 border-ink overflow-y-auto fade-up">
            <div className="sticky top-0 bg-paper border-b-2 border-ink px-5 py-4 flex items-center justify-between z-10">
              <span className="label">{guide.entry ? `${guide.entry.crop} · ${guide.entry.pathogenType}` : "Disease guide"}</span>
              <button onClick={() => setGuide(null)} aria-label="Close" className="w-10 h-10 border-2 border-ink flex items-center justify-center hover:bg-danger hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 sm:p-8 space-y-8">
              <div>
                <h2 className="font-display font-extrabold text-4xl leading-none">{guide.entry?.disease ?? guide.name}</h2>
                {guide.entry && <p className="mt-2 italic text-muted">{guide.entry.scientificName}</p>}
              </div>
              {guide.entry ? (
                <>
                  <Block title="Cause"><p className="leading-relaxed">{guide.entry.cause}</p></Block>
                  <Block title="What to look for" list={guide.entry.symptoms} />
                  <Block title="Natural treatment" list={guide.entry.organicSolution} />
                  <Block title="Spray treatment" list={guide.entry.chemicalSolution} />
                  <Block title="Prevention" list={guide.entry.prevention} />
                </>
              ) : (
                <p className="border-2 border-dashed border-ink p-5">We don&apos;t have a detailed guide for this disease yet. Scan an affected leaf, or ask your local agriculture officer.</p>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

const Block: React.FC<{ title: string; list?: string[]; children?: React.ReactNode }> = ({ title, list, children }) => (
  <section>
    <h3 className="label text-muted mb-3">{title}</h3>
    {children}
    {list && (
      <ol className="space-y-3">
        {list.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-xs w-7 h-7 border-2 border-ink flex items-center justify-center shrink-0 bg-card">{String(i + 1).padStart(2, "0")}</span>
            <span className="leading-relaxed pt-0.5">{t}</span>
          </li>
        ))}
      </ol>
    )}
  </section>
);
