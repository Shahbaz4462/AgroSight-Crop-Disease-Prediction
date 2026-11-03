"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DATA = [
  { crop: "Rice", healthy: 68, diseased: 32 },
  { crop: "Wheat", healthy: 78, diseased: 22 },
  { crop: "Cotton", healthy: 58, diseased: 42 },
  { crop: "Tomato", healthy: 64, diseased: 36 },
  { crop: "Potato", healthy: 70, diseased: 30 },
  { crop: "Apple", healthy: 65, diseased: 35 },
  { crop: "Citrus", healthy: 72, diseased: 28 },
];

export const CropYieldDistributionChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-zinc-900/60 rounded-3xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
          Crop Foliar Health Ratio
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Healthy vs diseased foliar specimen percentages across major supported crops
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
            <XAxis dataKey="crop" tick={{ fontSize: 11, fill: "#888" }} />
            <YAxis tick={{ fontSize: 11, fill: "#888" }} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#081a13",
                borderColor: "#10b981",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Bar dataKey="healthy" name="Healthy Leaf %" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="diseased" name="Pathology Detected %" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

