"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, FlipHorizontal2, ImagePlus, Loader2, VideoOff, Zap, ZapOff } from "lucide-react";
import { useApp } from "../../context/AppContext";

/**
 * Live leaf scanner.
 * Opens the camera immediately (phone or laptop), watches the frame ~5x/second and
 * auto-captures once a leaf fills the frame, the image is bright enough, sharp and steady.
 * The shutter button is always available as a manual override.
 */

// Quality gates. Tune these on real devices if capture feels too eager or too strict.
const GRID = 96; // analysis resolution
const MIN_LEAF_RATIO = 0.4; // share of the centre area that looks like plant material
const MIN_SHARPNESS = 28; // Laplacian variance on the downscaled frame
const MIN_LIGHT = 55;
const MAX_LIGHT = 225;
const MAX_MOTION = 9; // mean luminance change between analysed frames
const HOLD_MS = 1200; // how long everything must be good before auto capture

type Status = "starting" | "live" | "denied" | "nocamera" | "insecure" | "error";
type Hint = { key: string; ok: boolean };

interface Props {
  onCapture: (file: File) => void;
  onGallery: () => void;
}

export const LiveCamera: React.FC<Props> = ({ onCapture, onGallery }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workRef = useRef<HTMLCanvasElement | null>(null);
  const prevLum = useRef<Float32Array | null>(null);
  const okSince = useRef<number | null>(null);
  const firedRef = useRef(false);
  const autoRef = useRef(true);

  const [status, setStatus] = useState<Status>("starting");
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [canFlip, setCanFlip] = useState(false);
  const [auto, setAuto] = useState(true);
  const { t } = useApp();
  const [hint, setHint] = useState<Hint>({ key: "cam_starting", ok: false });
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);

  autoRef.current = auto;

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  /* ---- start / restart the camera ---- */
  useEffect(() => {
    let cancelled = false;
    setStatus("starting");
    setHint({ key: "cam_starting", ok: false });

    (async () => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setStatus("insecure");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        stop();
        streamRef.current = stream;
        const v = videoRef.current;
        if (v) {
          v.srcObject = stream;
          await v.play().catch(() => undefined);
        }
        const cams = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput");
        setCanFlip(cams.length > 1);
        firedRef.current = false;
        okSince.current = null;
        prevLum.current = null;
        setStatus("live");
      } catch (e) {
        if (cancelled) return;
        const name = (e as DOMException)?.name;
        if (name === "NotAllowedError" || name === "SecurityError") setStatus("denied");
        else if (name === "NotFoundError" || name === "OverconstrainedError") setStatus("nocamera");
        else setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      stop();
    };
  }, [facing, stop]);

  /* ---- grab the current frame as a File ---- */
  const capture = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.videoWidth || firedRef.current) return;
    firedRef.current = true;
    // Capture only the centre square the farmer framed (the same
    // 80% region the quality loop analyses and the corner brackets
    // show). The full frame makes the leaf small in the analysed
    // photo, which is a big source of "not sure" on live scans;
    // the framed square is what the farmer meant to scan.
    const side = Math.min(v.videoWidth, v.videoHeight) * 0.8;
    const sx = (v.videoWidth - side) / 2;
    const sy = (v.videoHeight - side) / 2;
    const c = document.createElement("canvas");
    c.width = side;
    c.height = side;
    c.getContext("2d")?.drawImage(v, sx, sy, side, side, 0, 0, side, side);
    setFlash(true);
    c.toBlob(
      (blob) => {
        if (!blob) {
          firedRef.current = false;
          return;
        }
        stop();
        onCapture(new File([blob], `leaf-${Date.now()}.jpg`, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  }, [onCapture, stop]);

  /* ---- analysis loop ---- */
  useEffect(() => {
    if (status !== "live") return;
    if (!workRef.current) {
      workRef.current = document.createElement("canvas");
      workRef.current.width = GRID;
      workRef.current.height = GRID;
    }
    const ctx = workRef.current.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const id = window.setInterval(() => {
      const v = videoRef.current;
      if (!v || v.readyState < 2 || !v.videoWidth || firedRef.current) return;

      // centre square crop
      const side = Math.min(v.videoWidth, v.videoHeight) * 0.8;
      const sx = (v.videoWidth - side) / 2;
      const sy = (v.videoHeight - side) / 2;
      ctx.drawImage(v, sx, sy, side, side, 0, 0, GRID, GRID);
      const { data } = ctx.getImageData(0, 0, GRID, GRID);

      const n = GRID * GRID;
      const lum = new Float32Array(n);
      let sum = 0;
      let plant = 0;
      for (let i = 0, p = 0; i < n; i++, p += 4) {
        const r = data[p], g = data[p + 1], b = data[p + 2];
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        lum[i] = l;
        sum += l;
        if (g > 35 && g >= b * 1.15 && l < 235) plant++;
      }
      const light = sum / n;
      const leafRatio = plant / n;

      // sharpness: variance of a 4-neighbour Laplacian
      let lap = 0, lapSq = 0, cnt = 0;
      for (let y = 1; y < GRID - 1; y++) {
        for (let x = 1; x < GRID - 1; x++) {
          const i = y * GRID + x;
          const d = 4 * lum[i] - lum[i - 1] - lum[i + 1] - lum[i - GRID] - lum[i + GRID];
          lap += d;
          lapSq += d * d;
          cnt++;
        }
      }
      const sharp = lapSq / cnt - (lap / cnt) ** 2;

      // motion vs previous analysed frame
      let motion = 0;
      if (prevLum.current) {
        for (let i = 0; i < n; i += 3) motion += Math.abs(lum[i] - prevLum.current[i]);
        motion /= n / 3;
      }
      prevLum.current = lum;

      let h: Hint;
      if (light < MIN_LIGHT) h = { key: "cam_dark", ok: false };
      else if (light > MAX_LIGHT) h = { key: "cam_bright", ok: false };
      else if (leafRatio < MIN_LEAF_RATIO) h = { key: "cam_leaf", ok: false };
      else if (motion > MAX_MOTION) h = { key: "cam_steady", ok: false };
      else if (sharp < MIN_SHARPNESS) h = { key: "cam_blurry", ok: false };
      else h = { key: autoRef.current ? "cam_hold" : "cam_tap", ok: true };
      setHint((old) => (old.key === h.key ? old : h));

      if (h.ok) {
        if (okSince.current === null) okSince.current = performance.now();
        const p = Math.min(1, (performance.now() - okSince.current) / HOLD_MS);
        setProgress(p);
        if (p >= 1 && autoRef.current) capture();
      } else {
        okSince.current = null;
        setProgress(0);
      }
    }, 200);

    return () => window.clearInterval(id);
  }, [status, capture]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(false), 220);
    return () => window.clearTimeout(t);
  }, [flash]);

  /* ---- no camera available ---- */
  if (status === "denied" || status === "nocamera" || status === "insecure" || status === "error") {
    const msg =
      status === "denied"
        ? t("camera_blocked")
        : status === "nocamera"
        ? t("camera_nocamera")
        : status === "insecure"
        ? t("camera_https")
        : t("camera_error");
    return (
      <div className="panel shadow-hard-lg p-6 sm:p-8 text-center space-y-5">
        <VideoOff className="w-12 h-12 mx-auto" strokeWidth={1.75} />
        <p className="font-display font-extrabold text-2xl leading-tight">{t("camera_unavailable")}</p>
        <p className="text-muted">{msg}</p>
        <button onClick={onGallery} className="btn btn-accent w-full"><ImagePlus className="w-5 h-5" /> {t("use_photo")}</button>
      </div>
    );
  }

  const live = status === "live";
  const ok = hint.ok;

  return (
    <div className="space-y-4">
      <div className="relative panel shadow-hard-lg overflow-hidden bg-ink aspect-[3/4] sm:aspect-[4/3] max-h-[72vh] mx-auto w-full">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover ${facing === "user" ? "-scale-x-100" : ""}`}
        />

        {/* dim outside the target square */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[80%] sm:h-[80%] sm:w-auto shadow-[0_0_0_999px_rgba(11,26,18,0.45)]`}
          >
            {["top-0 left-0 border-t-4 border-l-4", "top-0 right-0 border-t-4 border-r-4", "bottom-0 left-0 border-b-4 border-l-4", "bottom-0 right-0 border-b-4 border-r-4"].map((c) => (
              <span key={c} className={`absolute w-10 h-10 transition-colors duration-200 ${ok ? "border-accent" : "border-white/90"} ${c}`} />
            ))}
            {live && <div className="absolute inset-x-0 h-[3px] bg-accent/90 shadow-[0_0_16px_3px_rgba(200,241,53,0.7)] scan-laser" />}
          </div>
        </div>

        {/* status chip */}
        <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2">
          <span className={`label !text-[11px] px-2.5 py-2 border-2 border-ink max-w-[75%] ${ok ? "bg-accent text-[#0b1a12]" : "bg-paper text-ink"}`} role="status" aria-live="polite">
            {live ? t(hint.key) : <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> {t("cam_starting")}</span>}
          </span>
          <button
            onClick={() => setAuto((a) => !a)}
            aria-pressed={auto}
            aria-label="Toggle auto capture"
            className={`label !text-[10px] px-2.5 py-2 border-2 border-ink flex items-center gap-1.5 ${auto ? "bg-ink text-paper" : "bg-paper text-ink"}`}
          >
            {auto ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />} Auto
          </button>
        </div>

        {/* hold-still progress */}
        <div className="absolute bottom-0 inset-x-0 h-2 bg-ink/60" aria-hidden="true">
          <div className="h-full bg-accent" style={{ width: `${progress * 100}%`, transition: "width 0.2s linear" }} />
        </div>

        {flash && <div className="absolute inset-0 bg-white" />}
      </div>

      {/* controls */}
      <div className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-4 max-w-md mx-auto">
        <button onClick={onGallery} aria-label="Choose a photo from gallery" className="h-14 w-14 border-2 border-ink bg-card flex items-center justify-center hover:bg-accent hover:text-[#0b1a12]">
          <ImagePlus className="w-6 h-6" />
        </button>
        <button onClick={capture} disabled={!live} aria-label="Take photo" className="btn btn-accent !min-h-[4rem] disabled:opacity-50">
          <Camera className="w-6 h-6" strokeWidth={2.5} /> {t("scan_now")}
        </button>
        <button
          onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
          disabled={!canFlip}
          aria-label="Switch camera"
          className="h-14 w-14 border-2 border-ink bg-card flex items-center justify-center hover:bg-accent hover:text-[#0b1a12] disabled:opacity-30 disabled:hover:bg-card"
        >
          <FlipHorizontal2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
