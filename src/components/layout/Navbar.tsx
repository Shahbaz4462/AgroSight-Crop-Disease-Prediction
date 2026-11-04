"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Leaf, Sun, Moon, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/diagnose", key: "nav_scan" },
  { href: "/history", key: "nav_scans" },
  { href: "/crops", key: "nav_crops" },
  { href: "/insights", key: "nav_map" },
  { href: "/about", key: "nav_about" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, language, setLanguage, t } = useApp();
  const isActive = (p: string) => pathname.startsWith(p);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b-2 border-ink print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 md:h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 bg-accent border-2 border-ink flex items-center justify-center group-hover:-rotate-6 transition-transform">
            <Leaf className="w-4 h-4 text-[#0b1a12]" strokeWidth={2.5} />
          </span>
          <span className="font-display font-extrabold text-xl tracking-tight">AgroSight</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`label py-2 border-b-2 transition-colors ${
                isActive(l.href) ? "border-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="lang-select">Language</label>
          <select
            id="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ur" | "roman")}
            className="h-10 px-2 border-2 border-ink bg-paper label !text-[11px] outline-none"
          >
            <option value="en">English</option>
            <option value="ur">اردو</option>
            <option value="roman">Roman Urdu</option>
          </select>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-10 h-10 border-2 border-ink flex items-center justify-center hover:bg-accent hover:text-[#0b1a12] transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/diagnose" className="hidden md:inline-flex items-center gap-1.5 h-10 px-4 bg-ink text-paper label hover:bg-accent hover:text-[#0b1a12] transition-colors">
            {t("nav_scan_leaf")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
