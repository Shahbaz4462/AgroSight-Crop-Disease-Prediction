"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import Link from "next/link";

export const Footer: React.FC = () => {
  const { t } = useApp();
  return (
  <footer className="hidden md:block bg-ink text-paper print:hidden">
    <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8">
      <div className="col-span-6">
        <p className="font-display font-extrabold text-3xl tracking-tight">AgroSight</p>
        <p className="mt-3 max-w-sm text-sm opacity-70">
          {t("footer_note")}
        </p>
      </div>
      <nav className="col-span-6 flex justify-end gap-10 label items-start" aria-label="Footer">
        <Link href="/crops" className="hover:text-accent">{t("footer_crops")}</Link>
        <Link href="/insights" className="hover:text-accent">{t("footer_map")}</Link>
        <Link href="/architecture" className="hover:text-accent">{t("footer_how")}</Link>
        <Link href="/admin" className="hover:text-accent">{t("footer_expert")}</Link>
        <Link href="/about" className="hover:text-accent">{t("footer_about")}</Link>
      </nav>
    </div>
  </footer>
  );
};
