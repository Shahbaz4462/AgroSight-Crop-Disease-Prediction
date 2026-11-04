"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import Link from "next/link";
import { ArrowUpRight, ScanLine } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";

const POINTS = [
  { n: "01", tKey: "about_p1_t", dKey: "about_p1_d" },
  { n: "02", tKey: "about_p2_t", dKey: "about_p2_d" },
  { n: "03", tKey: "about_p3_t", dKey: "about_p3_d" },
  { n: "04", tKey: "about_p4_t", dKey: "about_p4_d" },
];

export default function AboutPage() {
  const { t } = useApp();
  return (
    <div className="w-full">
      <PageHeader label={t("about_label")} title={t("about_title")} sub={t("about_sub")} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 space-y-12">
        <div className="bg-warn text-[#0b1a12] border-2 border-ink p-5 md:p-6 shadow-hard">
          <p className="label">{t("about_note_label")}</p>
          <p className="mt-2 text-lg md:text-xl font-medium leading-snug">
            {t("about_note")}
          </p>
        </div>

        <ul className="grid md:grid-cols-2 border-2 border-ink bg-card divide-y-2 md:divide-y-0 divide-ink">
          {POINTS.map((p, i) => (
            <li key={p.n} className={`p-6 md:p-8 ${i % 2 === 0 ? "md:border-r-2" : ""} ${i > 1 ? "md:border-t-2" : ""} border-ink`}>
              <span className="font-mono text-5xl font-medium tracking-tighter">{p.n}</span>
              <h2 className="mt-4 font-display font-extrabold text-3xl leading-none">{t(p.tKey)}</h2>
              <p className="mt-3 text-muted leading-relaxed">{t(p.dKey)}</p>
            </li>
          ))}
        </ul>

        <div className="bg-forest text-[#eaf0e6] border-2 border-ink p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.9] max-w-xl">{t("about_try")}</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/diagnose" className="btn btn-accent !shadow-[4px_4px_0_0_#eaf0e6] !border-[#eaf0e6]"><ScanLine className="w-5 h-5" /> {t("nav_scan_leaf")}</Link>
            <Link href="/architecture" className="btn btn-paper !shadow-[4px_4px_0_0_#eaf0e6] !border-[#eaf0e6]">{t("about_how")} <ArrowUpRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
