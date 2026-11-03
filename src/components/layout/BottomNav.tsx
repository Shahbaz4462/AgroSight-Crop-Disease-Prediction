"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BookOpen, Menu, ScanLine } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/history", label: "Scans", icon: Clock },
  { href: "/diagnose", label: "Scan", icon: ScanLine, primary: true },
  { href: "/crops", label: "Crops", icon: BookOpen },
  { href: "/about", label: "More", icon: Menu },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const active = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  return (
    <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-paper border-t-2 border-ink safe-bottom print:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, primary }) => {
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
                <span className="label !text-[10px]">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
