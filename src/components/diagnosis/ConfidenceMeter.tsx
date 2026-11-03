"use client";

import React from "react";
import { formatConfidence } from "../../lib/utils";

interface ConfidenceMeterProps {
  confidence: number;
  size?: number;
  strokeWidth?: number;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  size = 140,
  strokeWidth = 10,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, confidence));
  const offset = circumference - (clamped / 100) * circumference;

  let colorClass = "text-emerald-500 stroke-emerald-500";
  let ratingText = "High Confidence";
  let bgBadge = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";

  if (clamped < 60) {
    colorClass = "text-rose-500 stroke-rose-500";
    ratingText = "Low Confidence (<60%)";
    bgBadge = "bg-rose-500/10 text-rose-500 border-rose-500/20";
  } else if (clamped < 80) {
    colorClass = "text-amber-500 stroke-amber-500";
    ratingText = "Moderate Confidence";
    bgBadge = "bg-amber-500/10 text-amber-500 border-amber-500/20";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
            {formatConfidence(clamped)}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 dark:text-zinc-400">
            AI SCORE
          </span>
        </div>
      </div>

      <div className={`mt-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${bgBadge}`}>
        {ratingText}
      </div>
    </div>
  );
};

