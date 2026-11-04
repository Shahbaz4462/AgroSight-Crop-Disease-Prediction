"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "../../context/AppContext";
import { SAMPLE_LEAVES } from "../../data/sampleLeaves";
import { historyService } from "../../services/api/historyService";
import { PredictionResult } from "../../services/ai/types";
import { ArrowLeft, ScanLine, Share2, Printer, Check, ShieldAlert, Info } from "lucide-react";

type Tab = "organic" | "chemical" | "prevent";

function confidenceLabel(c: number) {
  if (c >= 85) return "Very sure";
  if (c >= 60) return "Fairly sure";
  return "Not sure";
}

function resolveResult(id: string | null, last: PredictionResult | null): PredictionResult | null {
  if (last && (!id || last.id === id)) return last;
  if (id) {
    const h = historyService.getHistory().find((x) => x.id === id);
    if (h) {
      return {
        id: h.id, crop: h.crop, disease: h.disease, confidence: h.confidence, status: h.status,
        symptoms: h.symptoms, cause: h.cause, organic_solution: h.organicSolution,
        chemical_solution: h.chemicalSolution, prevention: h.prevention, timestamp: h.date, imageUrl: h.thumbnail,
      };
    }
    const s = SAMPLE_LEAVES.find((x) => x.id === id);
    if (s) {
      return {
        id: s.id, crop: s.crop, disease: s.disease, confidence: s.confidence, status: s.status,
        symptoms: s.symptoms, cause: s.cause, organic_solution: s.organicSolution,
        chemical_solution: s.chemicalSolution, prevention: s.prevention, message: s.message,
        imageUrl: s.thumbnail, scientificName: s.scientificName, timestamp: new Date().toISOString(),
      };
    }
  }
  return last;
}

const Step: React.FC<{ n: number; text: string }> = ({ n, text }) => (
  <li className="flex gap-4 items-start">
    <span className="font-mono text-sm w-9 h-9 border-2 border-ink flex items-center justify-center shrink-0 bg-card">{String(n).padStart(2, "0")}</span>
    <span className="leading-relaxed pt-1.5">{text}</span>
  </li>
);

function ResultContent() {
  const params = useSearchParams();
  const { lastDiagnosis, aiProvider } = useApp();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("organic");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setResult(resolveResult(params.get("id"), lastDiagnosis));
    setReady(true);
  }, [params, lastDiagnosis]);

  if (!ready) return <div className="flex-1 p-12 text-center label text-muted">Loading</div>;

  if (!result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
        <h1 className="font-display font-extrabold text-4xl">Nothing here yet.</h1>
        <p className="text-muted max-w-xs">Scan a leaf and your result will show up here.</p>
        <Link href="/diagnose" className="btn btn-accent"><ScanLine className="w-5 h-5" /> Scan a leaf</Link>
      </div>
    );
  }

  const uncertain = result.status === "uncertain" || result.confidence < 60;
  const healthy = !uncertain && (result.status === "healthy" || result.disease.toLowerCase().includes("healthy"));
  const diseased = !uncertain && !healthy;

  const verdict = uncertain
    ? { word: "Not sure.", bg: "bg-warn", fg: "text-[#0b1a12]", sub: "The photo wasn't clear enough for a reliable answer." }
    : healthy
    ? { word: "Healthy.", bg: "bg-ok", fg: "text-[#0b1a12]", sub: `No signs of disease on this ${result.crop} leaf.` }
    : { word: "Disease found.", bg: "bg-danger", fg: "text-white", sub: `${result.crop} · ${result.disease}` };

  const tabs: { key: Tab; label: string; items?: string[] }[] = [
    { key: "organic", label: "Natural", items: result.organic_solution },
    { key: "chemical", label: "Spray", items: result.chemical_solution },
    { key: "prevent", label: "Prevent", items: result.prevention },
  ];
  const items = tabs.find((t) => t.key === tab)?.items ?? [];

  const share = async () => {
    // Never share an uncertain top guess as a diagnosis.
    const text = uncertain
      ? "AgroSight: result was not sure — please retake a clearer photo of a single leaf."
      : `AgroSight: ${result.crop} · ${result.disease} (${Math.round(result.confidence)}% sure).`;
    try {
      if (navigator.share) await navigator.share({ title: "AgroSight result", text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      /* cancelled */
    }
  };

  const pct = Math.round(result.confidence);

  return (
    <div className="w-full">
      {/* Verdict banner */}
      <section className={`${verdict.bg} ${verdict.fg} border-b-2 border-ink`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-14">
          <Link href="/diagnose" className="label inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 mb-6 print:hidden">
            <ArrowLeft className="w-4 h-4" /> New scan
          </Link>
          <p className="label opacity-80">Result · {result.timestamp ? new Date(result.timestamp).toLocaleDateString() : "Today"}</p>
          <h1 className="mt-3 font-display font-extrabold text-[3.2rem] sm:text-7xl md:text-8xl leading-[0.88]">{verdict.word}</h1>
          <p className="mt-4 text-xl md:text-2xl font-medium">{verdict.sub}</p>
          {result.scientificName && diseased && <p className="mt-1 font-mono text-sm italic opacity-80">{result.scientificName}</p>}
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 fade-up">
          <div className="relative panel shadow-hard overflow-hidden aspect-[4/3] lg:aspect-square bg-ink">
            {result.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={result.imageUrl} alt={uncertain ? "Your photo" : `${result.crop} leaf you scanned`} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <span className="absolute top-2 left-2 bg-ink text-paper label !text-[10px] px-2 py-1">Your photo</span>
          </div>

          <div className="panel p-5">
            <div className="flex items-end justify-between">
              <span className="label">{confidenceLabel(result.confidence)}</span>
              <span className="font-mono text-4xl font-medium leading-none">{pct}%</span>
            </div>
            <div className="mt-4 grid grid-cols-20 gap-[3px]" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="How sure the check is">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className={`h-5 border-2 border-ink ${i < Math.round(pct / 5) ? "bg-ink" : ""}`} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 print:hidden">
            <button onClick={share} className="btn btn-ink !min-h-[3rem] !text-base">{copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />} {copied ? "Copied" : "Share"}</button>
            <button onClick={() => window.print()} className="btn btn-paper !min-h-[3rem] !text-base"><Printer className="w-4 h-4" /> Print</button>
          </div>
        </aside>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-10 fade-up d1">
          {aiProvider === "mock" && (
            <div className="flex items-start gap-3 border-2 border-dashed border-ink p-4 text-sm">
              <Info className="w-5 h-5 shrink-0" />
              <span><strong>Demo mode.</strong> The disease model isn&apos;t connected yet, so this is an example result and not a real diagnosis of your photo.</span>
            </div>
          )}

          {uncertain && (
            <section>
              <h2 className="font-display font-extrabold text-3xl mb-5">Try again like this</h2>
              <ol className="space-y-4">
                {["Take it in daylight, without shadow", "Fill the frame with a single leaf", "Hold steady so it isn't blurry", "Still failing? Show the plant to a local agriculture officer"].map((t, i) => <Step key={i} n={i + 1} text={t} />)}
              </ol>
              {result.message && <p className="mt-4 text-sm text-muted">{result.message}</p>}
              <Link href="/diagnose" className="btn btn-accent mt-6"><ScanLine className="w-5 h-5" /> Scan again</Link>
            </section>
          )}

          {healthy && (
            <section>
              <h2 className="font-display font-extrabold text-3xl mb-5">Keep it that way</h2>
              <ol className="space-y-4">
                {(result.prevention?.length ? result.prevention : ["Check your crop every week", "Avoid standing water around plants"]).map((p, i) => <Step key={i} n={i + 1} text={p} />)}
              </ol>
            </section>
          )}

          {diseased && (
            <>
              {result.cause && (
                <section>
                  <p className="label text-muted mb-2">Cause</p>
                  <p className="text-xl md:text-2xl leading-snug font-medium">{result.cause}</p>
                </section>
              )}

              {!!result.symptoms?.length && (
                <section>
                  <h2 className="font-display font-extrabold text-3xl mb-5">What to look for</h2>
                  <ul className="border-2 border-ink bg-card divide-y-2 divide-ink/15">
                    {result.symptoms.map((s, i) => (
                      <li key={i} className="flex gap-4 p-4">
                        <span className="w-2.5 h-2.5 mt-2 bg-danger shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="font-display font-extrabold text-3xl mb-5">What to do</h2>
                <div role="tablist" className="grid grid-cols-3 border-2 border-ink mb-6">
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={tab === key}
                      onClick={() => setTab(key)}
                      className={`h-14 label !text-xs border-r-2 last:border-r-0 border-ink transition-colors ${tab === key ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <ol className="space-y-4">
                  {items.length ? items.map((t, i) => <Step key={`${tab}-${i}`} n={i + 1} text={t} />) : <li className="text-muted">No advice for this section.</li>}
                </ol>
                {tab === "chemical" && (
                  <div className="mt-6 flex gap-3 border-2 border-ink bg-warn text-[#0b1a12] p-4 text-sm font-medium">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>Wear gloves and a mask when spraying. Follow the label dose, and keep sprays away from children, animals and water sources.</span>
                  </div>
                )}
              </section>
            </>
          )}

          <p className="text-xs text-muted border-t-2 border-ink pt-4">Guidance only. For a serious outbreak, confirm with a local agriculture officer.</p>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex-1 p-12 text-center label text-muted">Loading</div>}>
      <ResultContent />
    </Suspense>
  );
}
