"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  Scan,
  Camera,
  Upload,
  BarChart2,
  BookOpen,
  Clock,
  ShieldCheck,
  Cpu,
  Info,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Sparkles,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, language, setLanguage, expoMode, toggleExpoMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/diagnose", label: "Diagnose" },
    {
      href: "/live-scan",
      label: "Live Scan",
      badge: "LIVE",
      isPrimary: true,
    },
    { href: "/insights", label: "Insights" },
    { href: "/crops", label: "Crop Library" },
    { href: "/architecture", label: "AI Architecture" },
    { href: "/history", label: "History" },
    { href: "/admin", label: "Admin Portal" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#071710]/85 border-b border-emerald-900/10 dark:border-emerald-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-forest-dark text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Scan className="w-5 h-5 text-emerald-100" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ai-cyan rounded-full border-2 border-white dark:border-forest-dark"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200 bg-clip-text text-transparent">
                  AgroSight
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AI v1.4
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 -mt-0.5 font-medium tracking-wide">
                Crop Disease Identification & Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    link.isPrimary
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 font-semibold"
                      : active
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-emerald-950/40"
                  }`}
                >
                  {link.isPrimary && <Camera className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  {link.badge && !link.isPrimary && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-ai-emerald/20 text-ai-emerald">
                      {link.badge}
                    </span>
                  )}
                  {link.isPrimary && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mid-sized nav (for laptops/tablets) */}
          <nav className="hidden md:flex xl:hidden items-center gap-1">
            <Link
              href="/diagnose"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                isActive("/diagnose") ? "text-emerald-500 font-bold" : "text-zinc-300"
              }`}
            >
              Diagnose
            </Link>
            <Link
              href="/live-scan"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5" />
              Live Scan
            </Link>
            <Link
              href="/insights"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                isActive("/insights") ? "text-emerald-500 font-bold" : "text-zinc-300"
              }`}
            >
              Insights
            </Link>
            <Link
              href="/crops"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                isActive("/crops") ? "text-emerald-500 font-bold" : "text-zinc-300"
              }`}
            >
              Crops
            </Link>
            <Link
              href="/architecture"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                isActive("/architecture") ? "text-emerald-500 font-bold" : "text-zinc-300"
              }`}
            >
              Architecture
            </Link>
            <Link
              href="/admin"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                isActive("/admin") ? "text-emerald-500 font-bold" : "text-zinc-300"
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Expo Mode Quick Toggle */}
            <button
              onClick={toggleExpoMode}
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition ${
                expoMode
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500"
              }`}
              title="Toggle Expo Presentation Mode"
            >
              <Sparkles className="w-3 h-3 text-ai-emerald" />
              <span>{expoMode ? "Expo Mode ON" : "Expo Mode OFF"}</span>
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "EN" : "اردو"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-900/10 dark:border-emerald-500/20 bg-white/95 dark:bg-[#071710]/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                link.isPrimary
                  ? "bg-emerald-600 text-white font-semibold"
                  : isActive(link.href)
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-emerald-950/40"
              }`}
            >
              <span>{link.label}</span>
              {link.isPrimary && (
                <span className="text-[10px] bg-white text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  CAMERA
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

