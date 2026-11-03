import React from "react";
import Link from "next/link";
import { ArrowUpRight, ScanLine } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";

const POINTS = [
  { n: "01", t: "The problem", d: "Leaf diseases destroy an estimated 20–40% of crops worldwide each year. Many farmers can't reach a plant pathologist in time, and end up spraying the wrong thing or too much of it." },
  { n: "02", t: "Our approach", d: "A photo of a leaf is compared against known crop diseases. If the match is weak, we say so and ask for a better photo instead of guessing." },
  { n: "03", t: "Natural first", d: "Advice starts with low-cost natural options like neem and compost, and only then moves on to targeted sprays, with safety notes." },
  { n: "04", t: "Built to connect", d: "The app is separate from the AI model, so a trained model can be plugged in without redesigning anything." },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      <PageHeader label="About" title="Plant doctor, in your pocket." sub="AgroSight helps farmers spot crop disease early and know what to do next." />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 space-y-12">
        <div className="bg-warn text-[#0b1a12] border-2 border-ink p-5 md:p-6 shadow-hard">
          <p className="label">Please note</p>
          <p className="mt-2 text-lg md:text-xl font-medium leading-snug">
            AgroSight gives guidance, not a guarantee. Always read the product label, follow local rules, and check with your agriculture officer before spraying.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 border-2 border-ink bg-card divide-y-2 md:divide-y-0 divide-ink">
          {POINTS.map((p, i) => (
            <li key={p.n} className={`p-6 md:p-8 ${i % 2 === 0 ? "md:border-r-2" : ""} ${i > 1 ? "md:border-t-2" : ""} border-ink`}>
              <span className="font-mono text-5xl font-medium tracking-tighter">{p.n}</span>
              <h2 className="mt-4 font-display font-extrabold text-3xl leading-none">{p.t}</h2>
              <p className="mt-3 text-muted leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ul>

        <div className="bg-forest text-[#eaf0e6] border-2 border-ink p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.9] max-w-xl">Try it on a leaf.</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/diagnose" className="btn btn-accent !shadow-[4px_4px_0_0_#eaf0e6] !border-[#eaf0e6]"><ScanLine className="w-5 h-5" /> Scan a leaf</Link>
            <Link href="/architecture" className="btn btn-paper !shadow-[4px_4px_0_0_#eaf0e6] !border-[#eaf0e6]">How it works <ArrowUpRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
