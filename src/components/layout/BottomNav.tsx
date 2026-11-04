"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { Home, Clock, BookOpen, Menu, ScanLine } from "lucide-react";

const tabs = [
  { href: "/", key: "bottom_home", icon: Home },
  { href: "/history", key: "bottom_scans", icon: Clock },
  { href: "/diagnose", key: "bottom_scan", icon: ScanLine, primary: true },
  { href: "/crops", key: "bottom_crops", icon: BookOpen },
  { href: "/about", key: "bottom_more", icon: Menu },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useApp();
  const active = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  return (
    <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-paper border-t-2 border-ink safe-bottom print:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, key, icon: Icon, primary }) => {
          const on = active(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={on ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 h-[4.25rem] ${
                  primary ? "bg-accent text-[#0b1a12] border-x-2 border-ink" : on ? "text-ink" : "text-muted"
                }`}
              >
                {on && !primary && <span className="absolute top-0 inset-x-3 h-1 bg-ink" />}
                <Icon className="w-6 h-6" strokeWidth={primary || on ? 2.5 : 1.75} />
                <span className="label !text-[10px]">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
