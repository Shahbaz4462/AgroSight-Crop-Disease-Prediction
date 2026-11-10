// Renders a printable AgroSight result card to a PNG blob using only
// the Canvas 2D API — no new dependency. Used by the WhatsApp share
// button on the results page: the image goes to WhatsApp as an
// attachment instead of plain text.
//
// An uncertain result is rendered as "Not sure" only: the card never
// names a disease and never lists chemicals for it.

export type ResultCardKind = "disease" | "healthy" | "uncertain";

export interface ResultCardChemical {
  name: string;
  type: string;
}

export interface ResultCardData {
  verdict: string;
  verdictSub: string;
  verdictKind: ResultCardKind;
  crop: string;
  disease: string | null;
  scientificName?: string | null;
  confidence: number;
  photoUrl?: string | null;
  stepsHeading: string;
  steps: string[];
  chemicals: ResultCardChemical[];
  disclaimer: string;
  date: string;
}

const W = 1080;
const PAD = 64;
const CW = W - PAD * 2;

const INK = "#0B1A12";
const PAPER = "#EEECE4";
const CARD = "#F9F8F3";
const ACCENT = "#C8F135";
const DANGER = "#E5391F";
const WARN = "#F0A400";
const OK = "#1F8A4C";
const MUTED = "#5C6B62";

const FONT_LABEL = "700 26px Arial, Helvetica, sans-serif";
const FONT_VERDICT = "800 84px Arial, Helvetica, sans-serif";
const FONT_DATE = "400 26px Arial, Helvetica, sans-serif";
const FONT_SUB = "600 34px Arial, Helvetica, sans-serif";
const FONT_BODY = "400 30px Arial, Helvetica, sans-serif";
const FONT_BODY_BOLD = "700 30px Arial, Helvetica, sans-serif";
const FONT_HEADING = "800 40px Arial, Helvetica, sans-serif";
const FONT_SMALL = "400 24px Arial, Helvetica, sans-serif";

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function loadPhoto(url: string, timeoutMs = 6000): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const timer = window.setTimeout(() => resolve(null), timeoutMs);
    img.onload = () => {
      window.clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number): void {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

interface StepLayout {
  num: string;
  lines: string[];
}

interface CardLayout {
  totalHeight: number;
  headerH: number;
  subLines: string[];
  sciLines: string[];
  photoH: number;
  stepItems: StepLayout[];
  chemLines: { name: string; type: string }[];
  discLines: string[];
}

function layoutCard(ctx: CanvasRenderingContext2D, data: ResultCardData, photo: HTMLImageElement | null): CardLayout {
  const headerH = 280;

  ctx.font = FONT_SUB;
  const subLines = wrapText(ctx, data.verdictSub, CW);

  ctx.font = FONT_BODY;
  const sciLines = data.scientificName ? wrapText(ctx, data.scientificName, CW) : [];

  const photoH = photo ? 500 : 0;

  ctx.font = FONT_BODY;
  const stepItems: StepLayout[] = data.steps.slice(0, 4).map((step, i) => ({
    num: String(i + 1).padStart(2, "0"),
    lines: wrapText(ctx, step, CW - 64),
  }));

  const chemLines = data.chemicals.slice(0, 3);

  ctx.font = FONT_SMALL;
  const discLines = wrapText(ctx, data.disclaimer, CW);

  // Height accounting (must match drawCard below).
  let h = headerH;
  h += 40; // top gap
  h += subLines.length * 42;
  h += 22; // gap
  h += 40; // confidence line
  h += 14; // gap
  h += 18; // confidence bar
  if (sciLines.length > 0) {
    h += 16;
    h += sciLines.length * 34;
  }
  h += 28; // gap before photo / steps
  if (photo) h += photoH + 36;
  h += 52; // steps heading
  h += 10;
  for (const item of stepItems) h += item.lines.length * 38 + 16;
  if (chemLines.length > 0) {
    h += 24;
    h += 52; // chemicals heading
    h += 8;
    h += chemLines.length * 40;
  }
  h += 32; // gap before divider
  h += 2; // divider
  h += 22; // gap after divider
  h += discLines.length * 30;
  h += 56; // bottom pad

  return { totalHeight: h, headerH, subLines, sciLines, photoH, stepItems, chemLines, discLines };
}

function drawCard(ctx: CanvasRenderingContext2D, data: ResultCardData, photo: HTMLImageElement | null, layout: CardLayout): void {
  const band = data.verdictKind === "disease" ? DANGER : data.verdictKind === "healthy" ? OK : WARN;
  const headerFg = data.verdictKind === "uncertain" ? INK : CARD;

  // Page background.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, layout.totalHeight);

  // Header band.
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, W, layout.headerH);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(PAD, layout.headerH - 10, 120, 10);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = headerFg;
  ctx.font = FONT_LABEL;
  try {
    ctx.letterSpacing = "4px";
  } catch {
    /* letterSpacing not supported — ignore */
  }
  ctx.fillText("AGROSIGHT", PAD, 96);
  try {
    ctx.letterSpacing = "0px";
  } catch {
    /* ignore */
  }
  ctx.font = FONT_VERDICT;
  ctx.fillText(data.verdict, PAD, 196);
  ctx.font = FONT_DATE;
  ctx.globalAlpha = 0.85;
  ctx.fillText(data.date, PAD, 240);
  ctx.globalAlpha = 1;

  let y = layout.headerH + 40;

  // Sub line: crop · disease, or the "Not sure" guidance.
  ctx.fillStyle = INK;
  ctx.font = FONT_SUB;
  for (const line of layout.subLines) {
    y += 42;
    ctx.fillText(line, PAD, y);
  }
  y += 22;

  // Confidence line + bar.
  ctx.font = FONT_BODY_BOLD;
  ctx.fillText(`Confidence: ${data.confidence}%`, PAD, y + 30);
  y += 40;
  y += 14;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(PAD, y, CW, 18);
  ctx.fillStyle = band;
  ctx.fillRect(PAD + 2, y + 2, Math.max(0, (CW - 4) * (data.confidence / 100)), 14);
  y += 18;

  // Scientific name (diseased only).
  if (layout.sciLines.length > 0) {
    y += 16;
    ctx.fillStyle = MUTED;
    ctx.font = "italic 400 30px Arial, Helvetica, sans-serif";
    for (const line of layout.sciLines) {
      y += 34;
      ctx.fillText(line, PAD, y);
    }
  }

  y += 28;

  // Scanned photo, cover-fit.
  if (photo) {
    drawCover(ctx, photo, PAD, y, CW, layout.photoH);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4;
    ctx.strokeRect(PAD, y, CW, layout.photoH);
    y += layout.photoH + 36;
  }

  // Steps.
  ctx.fillStyle = INK;
  ctx.font = FONT_HEADING;
  y += 52;
  ctx.fillText(data.stepsHeading, PAD, y);
  y += 10;
  ctx.font = FONT_BODY;
  for (const item of layout.stepItems) {
    const boxY = y + 4;
    ctx.fillStyle = INK;
    ctx.fillRect(PAD, boxY, 44, 44);
    ctx.fillStyle = CARD;
    ctx.font = FONT_BODY_BOLD;
    ctx.fillText(item.num, PAD + 8, boxY + 31);
    ctx.fillStyle = INK;
    ctx.font = FONT_BODY;
    let lineY = y;
    for (const line of item.lines) {
      lineY += 38;
      ctx.fillText(line, PAD + 64, lineY);
    }
    y = lineY + 16;
  }

  // Chemicals (diseased only — never for uncertain).
  if (layout.chemLines.length > 0) {
    y += 24;
    ctx.fillStyle = INK;
    ctx.font = FONT_HEADING;
    y += 52;
    ctx.fillText("Chemicals", PAD, y);
    y += 8;
    for (const chem of layout.chemLines) {
      ctx.font = FONT_BODY_BOLD;
      const nameW = ctx.measureText(chem.name).width;
      y += 40;
      ctx.fillStyle = INK;
      ctx.fillText(chem.name, PAD, y);
      ctx.font = FONT_BODY;
      ctx.fillStyle = MUTED;
      ctx.fillText(` · ${chem.type}`, PAD + nameW, y);
    }
  }

  // Disclaimer.
  y += 32;
  ctx.fillStyle = INK;
  ctx.fillRect(PAD, y, CW, 2);
  y += 22;
  ctx.fillStyle = MUTED;
  ctx.font = FONT_SMALL;
  for (const line of layout.discLines) {
    y += 30;
    ctx.fillText(line, PAD, y);
  }
  y += 56;
}

export async function renderResultCardImage(data: ResultCardData): Promise<Blob> {
  const photo = data.photoUrl ? await loadPhoto(data.photoUrl) : null;

  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) throw new Error("Canvas 2D is not available");
  const layout = layoutCard(measure, data, photo);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = layout.totalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is not available");
  drawCard(ctx, data, photo, layout);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (blob) return blob;
  // Very old browsers without toBlob: go through a data URL.
  const dataUrl = canvas.toDataURL("image/png");
  const res = await fetch(dataUrl);
  return res.blob();
}
