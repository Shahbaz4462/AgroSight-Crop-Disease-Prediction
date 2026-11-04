"use client";

import React from "react";
import { PakistanMapInteractive } from "../../components/charts/PakistanMapInteractive";
import { GlobalInsightsVisualizer } from "../../components/charts/GlobalInsightsVisualizer";
import { DiseaseDistributionChart } from "../../components/charts/DiseaseDistributionChart";
import { CropYieldDistributionChart } from "../../components/charts/CropYieldDistributionChart";
import { PageHeader } from "../../components/layout/PageHeader";
import { useApp } from "../../context/AppContext";

export default function InsightsPage() {
  const { t } = useApp();
  return (
    <div className="w-full">
      <PageHeader label={t("map_label")} title={t("map_title")} sub={t("map_sub")} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 space-y-12">
        <section className="fade-up">
          <PakistanMapInteractive />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <DiseaseDistributionChart />
          <CropYieldDistributionChart />
        </section>

        <section className="space-y-5">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-none">{t("map_world")}</h2>
          <GlobalInsightsVisualizer />
        </section>
      </div>
    </div>
  );
}
