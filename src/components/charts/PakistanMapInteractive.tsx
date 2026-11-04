"use client";

import React, { useMemo, useState } from "react";
import { PAKISTAN_REGIONS_DATA } from "../../data/pakistanRegionsData";
import { PAKISTAN_BOUNDARIES } from "../../data/pakistanBoundaries";
import { ProvinceStatistic } from "../../types";

// Real boundaries, not hand-drawn shapes.
// PAKISTAN_BOUNDARIES is generated from geoBoundaries gbOpen, Pakistan
// ADM1 (simplified), by scripts/generate_pakistan_boundaries.py — see
// src/data/pakistanBoundaries.ts for the source note. Coordinates are
// longitude/latitude, projected here with a simple equirectangular
// projection fitted to Pakistan's bounding box, so the outline, the
// province shapes and their relative sizes are the real ones.
const VIEW_W = 400;
const VIEW_H = 440;

const SHAPE_TO_REGION: Record<string, string> = {
  Balochistan: "balochistan",
  Sindh: "sindh",
  Punjab: "punjab",
  "Khyber Pakhtunkhwa": "kpk",
  "Gilgit-Baltistan": "gilgit-baltistan",
  "Azad Kashmir": "ajk",
  // Islamabad Capital Territory has no regional statistics entry, so it
  // is drawn as part of the real map but is not a selectable province.
};

const LABELS: Record<string, string> = {
  Balochistan: "Balochistan",
  Sindh: "Sindh",
  Punjab: "Punjab",
  "Khyber Pakhtunkhwa": "KPK",
  "Gilgit-Baltistan": "GB",
  "Azad Kashmir": "AJK",
};

type Projected = {
  shapeName: string;
  regionId: string | null;
  d: string;
  lx: number;
  ly: number;
};

function project(features: typeof PAKISTAN_BOUNDARIES.features): Projected[] {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const f of features) {
    for (const poly of f.geometry.coordinates) {
      for (const ring of poly) {
        for (const [lon, lat] of ring) {
          if (lon < minLon) minLon = lon;
          if (lon > maxLon) maxLon = lon;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        }
      }
    }
  }
  const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const kx = Math.cos(midLat);
  const spanLon = (maxLon - minLon) * kx;
  const spanLat = maxLat - minLat;
  const scale = Math.min((VIEW_W - 20) / spanLon, (VIEW_H - 20) / spanLat);
  const offsetX = (VIEW_W - spanLon * scale) / 2;
  const offsetY = (VIEW_H - spanLat * scale) / 2;
  const px = (lon: number, lat: number): [number, number] => [
    offsetX + (lon - minLon) * kx * scale,
    offsetY + (maxLat - lat) * scale,
  ];

  return features.map((f) => {
    let d = "";
    let area = 0;
    let cx = 0;
    let cy = 0;
    for (const poly of f.geometry.coordinates) {
      for (const ring of poly) {
        const pts = ring.map(([lon, lat]) => px(lon, lat));
        d += pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") + " Z ";
        // Signed area centroid of the outer ring only, for the label.
        if (ring === poly[0]) {
          let a = 0;
          let sx = 0;
          let sy = 0;
          for (let i = 0; i < pts.length - 1; i++) {
            const cross = pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
            a += cross;
            sx += (pts[i][0] + pts[i + 1][0]) * cross;
            sy += (pts[i][1] + pts[i + 1][1]) * cross;
          }
          if (a !== 0) {
            area += a / 2;
            cx += (sx / (3 * a)) * (a / 2);
            cy += (sy / (3 * a)) * (a / 2);
          }
        }
      }
    }
    const label = area !== 0 ? [cx / area, cy / area] : [VIEW_W / 2, VIEW_H / 2];
    return {
      shapeName: f.properties.shapeName,
      regionId: SHAPE_TO_REGION[f.properties.shapeName] ?? null,
      d: d.trim(),
      lx: label[0],
      ly: label[1],
    };
  });
}

const riskBg: Record<string, string> = { Low: "bg-ok", Medium: "bg-warn", High: "bg-danger", Alert: "bg-danger" };

export const PakistanMapInteractive: React.FC = () => {
  const [sel, setSel] = useState<ProvinceStatistic>(PAKISTAN_REGIONS_DATA[0]);
  const shapes = useMemo(() => project(PAKISTAN_BOUNDARIES.features), []);

  return (
    <div className="grid lg:grid-cols-12 border-2 border-ink bg-card">
      <div className="lg:col-span-7 p-4 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-ink grid-bg">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full max-w-lg mx-auto h-auto" role="group" aria-label="Map of Pakistan provinces">
          {shapes.map((s) => {
            const region = s.regionId ? PAKISTAN_REGIONS_DATA.find((p) => p.id === s.regionId) : undefined;
            const on = region ? sel.id === region.id : false;
            const label = LABELS[s.shapeName];
            return (
              <g
                key={s.shapeName}
                tabIndex={region ? 0 : undefined}
                role={region ? "button" : undefined}
                aria-label={region ? label : `${s.shapeName} (no regional statistics)`}
                aria-pressed={region ? on : undefined}
                className={region ? "cursor-pointer outline-none" : ""}
                onClick={region ? () => setSel(region) : undefined}
                onKeyDown={region ? (e) => (e.key === "Enter" || e.key === " ") && setSel(region) : undefined}
              >
                <path d={s.d} fillRule="evenodd" strokeWidth="2" strokeLinejoin="round" className={`transition-colors ${on ? "fill-accent stroke-ink" : "fill-card stroke-ink hover:fill-ink/10"}`} />
                {label && (
                  <text x={s.lx} y={s.ly} textAnchor="middle" className="fill-ink pointer-events-none" style={{ font: "600 11px var(--font-mono), monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-center text-xs text-muted">Real provincial boundaries: geoBoundaries gbOpen, Pakistan ADM1 (simplified).</p>
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 border-2 border-ink">
          {PAKISTAN_REGIONS_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => setSel(p)}
              className={`h-11 label !text-[10px] border-r-2 last:border-r-0 border-ink ${sel.id === p.id ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
            >
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 p-5 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label text-muted">{sel.capital}</p>
            <h3 className="mt-2 font-display font-extrabold text-4xl leading-none">{sel.name}</h3>
          </div>
          <span className={`label !text-[10px] px-2 py-1.5 border-2 border-ink text-[#0b1a12] ${riskBg[sel.riskLevel] ?? "bg-warn"}`}>{sel.riskLevel} risk</span>
        </div>

        <dl className="grid grid-cols-3 border-2 border-ink divide-x-2 divide-ink text-center">
          {[
            ["Scans", sel.totalDiagnoses.toLocaleString()],
            ["Healthy", `${sel.healthyPercentage}%`],
            ["Output", `${sel.cropProductionShare}%`],
          ].map(([k, v]) => (
            <div key={k} className="py-3">
              <dt className="label !text-[10px] text-muted">{k}</dt>
              <dd className="mt-1.5 font-mono text-lg font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="label text-muted mb-2">Main crops</p>
          <div className="flex flex-wrap gap-1.5">
            {sel.majorCrops.map((c) => (
              <span key={c} className="label !text-[10px] border-2 border-ink px-2 py-1.5 bg-paper">{c}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="label text-muted mb-3">Most common diseases</p>
          <ul className="space-y-3.5">
            {sel.topDiseases.map((d) => (
              <li key={d.name}>
                <div className="flex justify-between gap-3 text-sm font-medium">
                  <span className="truncate">{d.name}</span>
                  <span className="font-mono">{d.percentage}%</span>
                </div>
                <div className="mt-1.5 h-3 border-2 border-ink">
                  <div className="h-full bg-ink" style={{ width: `${Math.min(100, d.percentage * 2.5)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
