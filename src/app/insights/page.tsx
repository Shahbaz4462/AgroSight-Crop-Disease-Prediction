"use client";

import React from "react";
import { PakistanMapInteractive } from "../../components/charts/PakistanMapInteractive";
import { GlobalInsightsVisualizer } from "../../components/charts/GlobalInsightsVisualizer";
import { DiseaseDistributionChart } from "../../components/charts/DiseaseDistributionChart";
import { CropYieldDistributionChart } from "../../components/charts/CropYieldDistributionChart";
import { PageHeader, SampleDataNote } from "../../components/layout/PageHeader";

export default function InsightsPage() {
  return (
    <div className="w-full">
      <PageHeader label="Disease map" title="What's spreading." sub="Tap a province to see which crops are affected and which diseases are most common there.">
        <SampleDataNote />
      </PageHeader>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 space-y-12">
        <section className="fade-up">
          <PakistanMapInteractive />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <DiseaseDistributionChart />
          <CropYieldDistributionChart />
        </section>

        <section className="space-y-5">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-none">Around the world.</h2>
          <GlobalInsightsVisualizer />
        </section>
      </div>
    </div>
  );
}
