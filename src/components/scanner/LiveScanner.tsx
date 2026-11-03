"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { predictionService } from "../../services/ai/predictionService";
import { PredictionResult, ScanningStage } from "../../services/ai/types";
import { ScannerOverlay } from "./ScannerOverlay";
import { SampleLeafSelector } from "./SampleLeafSelector";
import { SampleLeaf } from "../../data/sampleLeaves";
import { historyService } from "../../services/api/historyService";
import { useApp } from "../../context/AppContext";
import {
  Camera,
  RefreshCw,
  Zap,
  ZapOff,
  SwitchCamera,
  AlertCircle,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type CameraState =
  | "permission"
  | "loading"
  | "ready"
  | "scanning"
  | "success"
  | "uncertain"
  | "error"
  | "unsupported";

interface LiveScannerProps {
  onDiagnosisComplete?: (result: PredictionResult) => void;
  standalone?: boolean;
}

export const LiveScanner: React.FC<LiveScannerProps> = ({
  onDiagnosisComplete,
  standalone = true,
}) => {
  const router = useRouter();
  const { setLastDiagnosis } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [cameraState, setCameraState] = useState<CameraState>("permission");
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [scanningStage, setScanningStage] = useState<ScanningStage | null>(null);
  const [activeResult, setActiveResult] = useState<PredictionResult | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(null);
  const [simulatedFeedUrl, setSimulatedFeedUrl] = useState<string | null>(null);

  // Initialize camera stream
  const startCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraState("unsupported");
      return;
    }

    setCameraState("loading");
    setErrorMessage("");

    try {
      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      // Check torch capability
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities?.() as { torch?: boolean }) || {};
        setTorchSupported(!!capabilities.torch);
      }

      setCameraState("ready");
    } catch (err: unknown) {
      console.warn("Camera access failed or denied:", err);
      const error = err as Error;
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setErrorMessage("Camera access permission was denied. Please allow camera permissions in your browser bar.");
        setCameraState("permission");
      } else {
        setErrorMessage(error.message || "Unable to interface with optical video hardware.");
        setCameraState("error");
      }
    }
  }, [facingMode]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Flip front/back camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  // Toggle flash torch
  const toggleTorch = async () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      const newStatus = !torchOn;
      // @ts-expect-error Torch is an advanced constraint
      await videoTrack.applyConstraints({ advanced: [{ torch: newStatus }] });
      setTorchOn(newStatus);
    } catch (err) {
      console.warn("Torch toggle failed:", err);
    }
  };

  // Capture frame from video or fallback image
  const captureFrame = (): string => {
    if (simulatedFeedUrl) return simulatedFeedUrl;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.92);
      }
    }
    return "";
  };

  // Trigger analysis pipeline
  const handleAnalyzeLeaf = async (customSampleId?: string) => {
    setCameraState("scanning");
    const capturedImage = captureFrame();

    try {
      const targetInput = customSampleId || capturedImage || (selectedSample?.id ?? "sample-rice-brown-spot");
      const result = await predictionService.predictLeafWithProgress(
        targetInput,
        (stage: ScanningStage) => setScanningStage(stage)
      );

      // Save to history automatically
      historyService.addDiagnosis({
        crop: result.crop,
        disease: result.disease,
        confidence: result.confidence,
        status: result.status,
        thumbnail: result.imageUrl || capturedImage || "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80",
        notes: "Live optical scan capture.",
        symptoms: result.symptoms,
        cause: result.cause,
        organicSolution: result.organic_solution,
        chemicalSolution: result.chemical_solution,
        prevention: result.prevention,
      });

      setActiveResult(result);
      setLastDiagnosis(result);

      if (result.confidence < 60 || result.status === "uncertain") {
        setCameraState("uncertain");
      } else {
        setCameraState("success");
      }

      if (onDiagnosisComplete) {
        onDiagnosisComplete(result);
      }
    } catch (err) {
      console.error("Scan analysis failed:", err);
      setCameraState("error");
      setErrorMessage("Analysis interrupted or tensor pipeline failed.");
    }
  };

  // Quick specimen selection from expo quick-test bar
  const handleSelectSample = (sample: SampleLeaf) => {
    setSelectedSample(sample);
    setSimulatedFeedUrl(sample.thumbnail);
    setCameraState("ready");
    // Start automated simulation scan
    handleAnalyzeLeaf(sample.id);
  };

  const handleReset = () => {
    setSelectedSample(null);
    setSimulatedFeedUrl(null);
    setActiveResult(null);
    setScanningStage(null);
    setCameraState("ready");
  };

  const navigateToFullReport = () => {
    if (activeResult) {
      router.push(`/results?id=${activeResult.id || "latest"}`);
    } else {
      router.push("/results");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Viewport Container */}
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
        {/* Real Live Video Feed */}
        {!simulatedFeedUrl && (
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              cameraState === "ready" || cameraState === "scanning" ? "opacity-100" : "opacity-30"
            }`}
          />
        )}

        {/* Simulated Leaf Image Feed (When preset chosen or testing without camera) */}
        {simulatedFeedUrl && (
          <div className="relative w-full h-full">
            <Image
              src={simulatedFeedUrl}
              alt="Simulated leaf specimen"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[11px] font-mono px-3 py-1 rounded-full shadow-lg">
              EXHIBITION SPECIMEN FEED
            </div>
          </div>
        )}

        {/* HUD Scanner Overlay with animated laser beam & stage progress */}
        <ScannerOverlay
          isScanning={cameraState === "scanning"}
          scanningStage={scanningStage}
          cameraReady={cameraState === "ready"}
        />

        {/* CAMERA STATE: Permission Request */}
        {cameraState === "permission" && !simulatedFeedUrl && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Camera Access Required</h3>
            <p className="text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
              AgroSight utilizes client-side high-resolution optical capture to analyze foliar venation,
              lesion morphology, and pathogen indicators in real time.
            </p>
            {errorMessage && (
              <p className="text-xs text-rose-400 bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-800/40 mb-4">
                {errorMessage}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={startCamera}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Allow & Open Camera</span>
              </button>
              <button
                onClick={() => handleSelectSample(selectedSample || { id: "sample-rice-brown-spot" } as SampleLeaf)}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-300 font-medium text-sm border border-emerald-500/30 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-ai-cyan" />
                <span>Use Exhibition Preset Feed</span>
              </button>
            </div>
          </div>
        )}

        {/* CAMERA STATE: Loading */}
        {cameraState === "loading" && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
            <h4 className="text-lg font-semibold text-white">Initializing Optical Vision Pipeline...</h4>
            <p className="text-xs text-zinc-400 font-mono mt-1">Negotiating camera stream permissions & hardware buffer</p>
          </div>
        )}

        {/* CAMERA STATE: Unsupported */}
        {cameraState === "unsupported" && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <AlertCircle className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Browser Camera Unsupported</h3>
            <p className="text-sm text-zinc-300 max-w-md mb-6">
              Your browser or current device does not provide standard MediaDevices video capabilities.
              You can still test the complete pipeline using the preset exhibition leaves or image uploader.
            </p>
            <button
              onClick={() => handleSelectSample(selectedSample || { id: "sample-rice-brown-spot" } as SampleLeaf)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm"
            >
              Test with Sample Leaf
            </button>
          </div>
        )}

        {/* CAMERA STATE: Error */}
        {cameraState === "error" && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <AlertCircle className="w-12 h-12 text-rose-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Camera Hardware Unavailable</h3>
            <p className="text-xs text-zinc-300 max-w-md mb-6">
              {errorMessage || "The optical sensor is currently occupied by another program or could not be accessed."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
              >
                Retry Camera
              </button>
              <button
                onClick={() => handleSelectSample(selectedSample || { id: "sample-rice-brown-spot" } as SampleLeaf)}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 text-emerald-400 text-xs font-semibold border border-zinc-700"
              >
                Use Exhibition Preset
              </button>
            </div>
          </div>
        )}

        {/* REAL-TIME DIAGNOSIS POPUP OVERLAY ON SCAN COMPLETION */}
        {(cameraState === "success" || cameraState === "uncertain") && activeResult && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-lg flex flex-col items-center justify-center p-4 sm:p-6 z-30 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-full max-w-lg bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-left">
              {/* Header Status */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  {activeResult.status === "healthy" ? (
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle className="w-6 h-6" />
                    </span>
                  ) : activeResult.status === "uncertain" ? (
                    <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <HelpCircle className="w-6 h-6" />
                    </span>
                  ) : (
                    <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <AlertCircle className="w-6 h-6" />
                    </span>
                  )}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      AI Diagnostic Verdict
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {activeResult.crop}: {activeResult.disease}
                    </h3>
                  </div>
                </div>

                {/* Confidence Badge */}
                <div className="text-right">
                  <div
                    className={`text-xl sm:text-2xl font-black font-mono ${
                      activeResult.confidence >= 80
                        ? "text-emerald-400"
                        : activeResult.confidence >= 60
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {activeResult.confidence.toFixed(1)}%
                  </div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400">
                    {activeResult.confidence >= 60 ? "High Confidence" : "Low Confidence (<60%)"}
                  </span>
                </div>
              </div>

              {/* UNCERTAIN / LOW CONFIDENCE WARNING (SRS MANDATORY) */}
              {activeResult.status === "uncertain" || activeResult.confidence < 60 ? (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 mb-4 text-xs text-amber-200">
                  <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Uncertain Detection Warning
                  </p>
                  <p className="leading-relaxed">
                    {activeResult.message ||
                      "Confidence is below the 60.0% validation threshold. AgroSight intentionally does NOT present a definitive diagnosis to safeguard crop health. Please capture a clearer, well-lit photograph of a single leaf or request expert agronomist review."}
                  </p>
                </div>
              ) : (
                /* Primary Symptoms Summary */
                <div className="space-y-3 mb-5">
                  <div className="text-xs text-zinc-300">
                    <span className="text-zinc-500 block mb-1 uppercase font-mono text-[10px]">
                      Primary Symptoms Detected
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300">
                      {activeResult.symptoms?.slice(0, 2).map((s, idx) => (
                        <li key={idx} className="truncate">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeResult.organic_solution && activeResult.organic_solution.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs">
                      <span className="text-emerald-400 font-semibold block mb-0.5">
                        Organic First Action:
                      </span>
                      <p className="text-zinc-300 line-clamp-2">{activeResult.organic_solution[0]}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Another Leaf</span>
                </button>

                <button
                  onClick={navigateToFullReport}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
                >
                  <span>View Full Treatment Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls Toolbar */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 px-2">
        {/* Left Side: Hardware toggles */}
        <div className="flex items-center gap-2">
          {cameraState === "ready" && (
            <>
              <button
                onClick={toggleFacingMode}
                className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition flex items-center gap-1.5"
                title="Switch Camera (Front/Back)"
              >
                <SwitchCamera className="w-4 h-4 text-emerald-500" />
                <span className="hidden sm:inline">Flip Camera</span>
              </button>

              {torchSupported && (
                <button
                  onClick={toggleTorch}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${
                    torchOn
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                  title="Toggle Torch/Flash"
                >
                  {torchOn ? <Zap className="w-4 h-4 text-amber-400" /> : <ZapOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{torchOn ? "Torch ON" : "Torch"}</span>
                </button>
              )}
            </>
          )}

          {simulatedFeedUrl && (
            <button
              onClick={() => {
                setSimulatedFeedUrl(null);
                setSelectedSample(null);
                startCamera();
              }}
              className="px-3 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 transition"
            >
              Switch back to Live Webcam
            </button>
          )}
        </div>

        {/* Center: Primary Instant Scan Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAnalyzeLeaf()}
            disabled={cameraState === "scanning"}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 disabled:opacity-50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>{cameraState === "scanning" ? "Analyzing Foliar Features..." : "Scan & Analyze Leaf"}</span>
          </button>
        </div>

        {/* Right Side: Upload Alternative link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/diagnose")}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 text-xs font-medium transition flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Upload Photo Instead</span>
          </button>
        </div>
      </div>

      {/* Exhibition Sample Leaves Quick Bar */}
      <div className="w-full max-w-4xl">
        <SampleLeafSelector
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSample?.id}
        />
      </div>
    </div>
  );
};

