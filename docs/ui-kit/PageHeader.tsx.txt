import React from "react";

export const PageHeader: React.FC<{ label: string; title: string; sub?: string; children?: React.ReactNode }> = ({ label, title, sub, children }) => (
  <header className="border-b-2 border-ink">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="fade-up">
        <p className="label text-muted">{label}</p>
        <h1 className="mt-3 font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[0.9]">{title}</h1>
        {sub && <p className="mt-4 max-w-xl text-lg text-muted">{sub}</p>}
      </div>
      {children}
    </div>
  </header>
);

export const SampleDataNote: React.FC<{ text?: string }> = ({ text = "Sample data for demonstration. Not live field numbers." }) => (
  <div className="flex items-start gap-3 border-2 border-dashed border-ink p-3 text-sm max-w-sm">
    <span className="label !text-[10px] bg-ink text-paper px-1.5 py-1 shrink-0">Sample</span>
    <span>{text}</span>
  </div>
);
