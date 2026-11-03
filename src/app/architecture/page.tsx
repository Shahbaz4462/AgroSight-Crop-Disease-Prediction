"use client";

import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";

const NODES = [
  { t: "The app", tag: "Your phone", d: "Takes the photo from your camera or gallery and shows the result. Works as a website on any phone." },
  { t: "Inference gateway", tag: "API", d: "Receives the image over a secure request and passes it to the model. Replaces the demo model when the real backend is connected." },
  { t: "Image preparation", tag: "Vision", d: "Finds the leaf, evens out colour and lighting, and resizes the photo to what the model expects." },
  { t: "Disease model", tag: "Deep learning", d: "A neural network looks at lesion shape, colour and vein patterns and scores each known disease." },
  { t: "Treatment library", tag: "Knowledge", d: "Matches the diagnosis to natural, spray and prevention advice for that crop." },
  { t: "Expert review", tag: "Human check", d: "If the model isn't sure (under 60%) the photo is flagged for an agronomist to review and learn from." },
];

export default function ArchitecturePage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="w-full">
      <PageHeader label="How it works" title="Photo in. Answer out." sub="Six steps happen between tapping Scan and seeing your result." />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 grid lg:grid-cols-12 gap-8">
        <ol className="lg:col-span-7 border-2 border-ink bg-card divide-y-2 divide-ink">
          {NODES.map((n, i) => {
            const on = open === i;
            return (
              <li key={n.t}>
                <button onClick={() => setOpen(i)} aria-expanded={on} className={`w-full flex items-center gap-5 p-5 text-left transition-colors ${on ? "bg-accent text-[#0b1a12]" : "hover:bg-ink/5"}`}>
                  <span className="font-mono text-3xl font-medium tracking-tighter w-12">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display font-bold text-2xl leading-none">{n.t}</span>
                  <span className="label !text-[10px] hidden sm:block opacity-70">{n.tag}</span>
                </button>
                {on && <p className="px-5 pb-6 pl-[5.25rem] text-lg leading-snug fade-up lg:hidden">{n.d}</p>}
              </li>
            );
          })}
        </ol>

        <aside className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24 border-2 border-ink bg-ink text-paper p-8 shadow-hard-lg min-h-[18rem] flex flex-col justify-between">
            <span className="label text-accent">Step {String(open + 1).padStart(2, "0")} · {NODES[open].tag}</span>
            <div key={open} className="fade-up">
              <h2 className="font-display font-extrabold text-5xl leading-[0.95]">{NODES[open].t}</h2>
              <p className="mt-4 text-lg opacity-80 leading-snug">{NODES[open].d}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
