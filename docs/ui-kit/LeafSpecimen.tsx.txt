import React from "react";

/** Crisp vector "specimen under inspection" graphic used on the home hero. */
export const LeafSpecimen: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative panel shadow-hard-lg overflow-hidden grid-bg ${className ?? ""}`}>
    {/* top bar */}
    <div className="absolute top-0 inset-x-0 flex items-center justify-between px-3 h-8 bg-ink text-paper z-10">
      <span className="label !text-[10px]">Specimen 0427</span>
      <span className="label !text-[10px] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent blink" /> Analysing
      </span>
    </div>

    <svg viewBox="0 0 420 340" className="w-full h-auto block pt-8" role="img" aria-label="Wheat leaf with three rust lesions highlighted">
      {/* leaf */}
      <path d="M30 190 C 110 40, 300 30, 392 150 C 320 300, 120 320, 30 190 Z" fill="#1d6a45" stroke="#0b1a12" strokeWidth="3" />
      <path d="M30 190 C 140 175, 280 165, 392 150" fill="none" stroke="#c8f135" strokeWidth="3" className="draw-in" />
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <path d={`M${110 + i * 55} ${178 - i * 4} L${150 + i * 50} ${95 + i * 8}`} stroke="#c8f135" strokeOpacity=".55" strokeWidth="1.5" fill="none" />
          <path d={`M${110 + i * 55} ${178 - i * 4} L${150 + i * 50} ${262 - i * 8}`} stroke="#c8f135" strokeOpacity=".55" strokeWidth="1.5" fill="none" />
        </React.Fragment>
      ))}
      {/* lesions */}
      {[
        [170, 130, 11],
        [250, 215, 14],
        [300, 140, 9],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#d9531e" stroke="#0b1a12" strokeWidth="2" />
          <circle cx={x} cy={y} r={r + 9} fill="none" stroke="#c8f135" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      ))}
      {/* callouts */}
      <path d="M170 119 L170 62 L 215 62" fill="none" stroke="#0b1a12" strokeWidth="2" />
      <path d="M250 229 L250 290 L 290 290" fill="none" stroke="#0b1a12" strokeWidth="2" />
      {/* crop marks */}
      {[
        "M14 40 v-0 h0 M14 52 V40 H26",
        "M406 40 H394 M406 40 V52",
        "M14 326 V314 M14 326 H26",
        "M406 326 H394 M406 326 V314",
      ].map((d, i) => (
        <path key={i} d={d} stroke="#0b1a12" strokeWidth="3" fill="none" />
      ))}
    </svg>

    <div className="absolute left-[calc(215/420*100%)] top-[calc(62/340*100%+1.5rem)] -translate-y-1/2 bg-accent text-[#0b1a12] border-2 border-ink px-2 py-1 label !text-[10px] whitespace-nowrap z-10">
      Leaf rust · 94%
    </div>
    <div className="absolute left-[calc(290/420*100%)] top-[calc(290/340*100%+1.5rem)] -translate-y-1/2 bg-paper text-ink border-2 border-ink px-2 py-1 label !text-[10px] whitespace-nowrap z-10">
      Spreading · act now
    </div>
  </div>
);
