"use client";

import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { useApp } from "../../context/AppContext";

const NODES = [
  { tKey: "arch_n1_t", tagKey: "arch_n1_tag", dKey: "arch_n1_d" },
  { tKey: "arch_n2_t", tagKey: "arch_n2_tag", dKey: "arch_n2_d" },
  { tKey: "arch_n3_t", tagKey: "arch_n3_tag", dKey: "arch_n3_d" },
  { tKey: "arch_n4_t", tagKey: "arch_n4_tag", dKey: "arch_n4_d" },
  { tKey: "arch_n5_t", tagKey: "arch_n5_tag", dKey: "arch_n5_d" },
  { tKey: "arch_n6_t", tagKey: "arch_n6_tag", dKey: "arch_n6_d" },
];

export default function ArchitecturePage() {
  const { t } = useApp();
  const [open, setOpen] = useState(0);

  return (
    <div className="w-full">
      <PageHeader label={t("arch_label")} title={t("arch_title")} sub={t("arch_sub")} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 grid lg:grid-cols-12 gap-8">
        <ol className="lg:col-span-7 border-2 border-ink bg-card divide-y-2 divide-ink">
          {NODES.map((n, i) => {
            const on = open === i;
            return (
              <li key={n.tKey}>
                <button onClick={() => setOpen(i)} aria-expanded={on} className={`w-full flex items-center gap-5 p-5 text-left transition-colors ${on ? "bg-accent text-[#0b1a12]" : "hover:bg-ink/5"}`}>
                  <span className="font-mono text-3xl font-medium tracking-tighter w-12">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display font-bold text-2xl leading-none">{t(n.tKey)}</span>
                  <span className="label !text-[10px] hidden sm:block opacity-70">{t(n.tagKey)}</span>
                </button>
                {on && <p className="px-5 pb-6 pl-[5.25rem] text-lg leading-snug fade-up lg:hidden">{t(n.dKey)}</p>}
              </li>
            );
          })}
        </ol>

        <aside className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24 border-2 border-ink bg-ink text-paper p-8 shadow-hard-lg min-h-[18rem] flex flex-col justify-between">
            <span className="label text-accent">Step {String(open + 1).padStart(2, "0")} · {t(NODES[open].tagKey)}</span>
            <div key={open} className="fade-up">
              <h2 className="font-display font-extrabold text-5xl leading-[0.95]">{t(NODES[open].tKey)}</h2>
              <p className="mt-4 text-lg opacity-80 leading-snug">{t(NODES[open].dKey)}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
