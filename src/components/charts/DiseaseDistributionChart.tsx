"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DATA = [
  { name: "Fungal (Blights, Rusts, Spots)", value: 48, color: "#10b981" },
  { name: "Bacterial (Cankers, Wilts)", value: 24, color: "#06b6d4" },
  { name: "Viral (Leaf Curls, Mosaics)", value: 16, color: "#f59e0b" },
  { name: "Physiological / Nutrient Stress", value: 12, color: "#8b5cf6" },
];

export const DiseaseDistributionChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-zinc-900/60 rounded-3xl p-6 border border-zinc-200 dark:border-emerald-500/20 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
          Pathogen Category Distribution
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Proportion of foliar diagnoses grouped by biological pathogen classification
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#081a13",
                borderColor: "#10b981",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value}%`, "Prevalence"]}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              formatter={(value) => <span className="text-zinc-700 dark:text-zinc-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

