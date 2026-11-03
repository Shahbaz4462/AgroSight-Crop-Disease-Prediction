"use client";

import React from "react";
import { ScanFlow } from "../../components/diagnosis/ScanFlow";

export default function DiagnosePage() {
  return (
    <div className="flex-1 w-full px-4 sm:px-8 py-8 md:py-14">
      <div className="max-w-xl mx-auto mb-6">
        <p className="label text-muted">Field scan</p>
        <h1 className="mt-2 font-display font-extrabold text-5xl md:text-6xl leading-[0.9]">Scan a leaf.</h1>
        <p className="mt-3 text-muted">Hold a leaf in front of the camera. It scans on its own.</p>
      </div>
      <ScanFlow />
    </div>
  );
}
