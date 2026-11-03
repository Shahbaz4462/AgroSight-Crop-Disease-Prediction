# AgroSight: AI-Based Crop Disease Identification and Treatment Guidance Web System

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI Ready](https://img.shields.io/badge/FastAPI-Ready-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)

An international-level agricultural technology and computer vision platform engineered for university project exhibitions (Expo) and precision agronomy.

---

## 🌟 Key Features

1. **Real-Time Live Optical Scanner (`/live-scan`)**
   - Direct browser camera integration using `navigator.mediaDevices.getUserMedia()`.
   - Real-time targeting reticle with corner brackets, animated scan laser, and active telemetry HUD.
   - 5-stage progress pipeline simulation (0-20% Initializing, 20-45% Foliage Bounds, 45-70% Crop Identification, 70-90% Pathology Classification, 90-100% Prescription).
   - Instant Exhibition Quick-Test leaves bar for demonstrations without physical leaf specimens.
   - Front/rear camera toggle and flash/torch support.

2. **Decoupled AI Architecture Layer (`/services/ai/`)**
   - Clean prediction interface `predictLeaf(image)`.
   - `MockPredictionService` for offline international exhibition presentations.
   - `ModelApiService` prepared for direct integration with future FastAPI + PyTorch backend (`POST /predict`).
   - Runtime provider switch (`NEXT_PUBLIC_AI_PROVIDER="mock" | "api"`).

3. **SRS-Compliant Diagnostic Verdict (`/results`)**
   - Animated SVG confidence gauge with color-coded classification.
   - **Gating Threshold Protection:** When confidence is below 60% or non-crop objects are captured, the system triggers an **Uncertain Detection Warning** instead of inventing false diagnoses.
   - **Healthy Leaf State:** Displays positive vigor and general agronomic care tips without chemical treatments.
   - **Disease Overview:** Biological pathogen classification, causes, and morphological symptoms.
   - **Organic First Guidance:** Sustainable biostimulants and neem extracts.
   - **Chemical Safety Notice:** Explicit mandatory safety warnings to consult certified agronomists and adhere strictly to product labels.
   - Download report JSON, print, and copy sharing link.

4. **Regional & Global Insights (`/insights`)**
   - **Pakistan Agro-Epidemiological Map:** Interactive clickable provinces (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Gilgit-Baltistan, Azad Jammu & Kashmir) with top crops, pathology percentages, and production share.
   - **Global Agricultural Health Visualizer:** Regional patterns across Asia, Europe, Africa, North America, South America, and Oceania.
   - Interactive Recharts donut and bar visualizations.
   - Transparently demarcated sample research benchmarks.

5. **Supported Crop & Disease Library (`/crops`)**
   - 12 major crops: Rice, Wheat, Cotton, Tomato, Potato, Corn, Apple, Grape, Peach, Strawberry, Cherry, and Citrus.
   - Over 38 distinct plant pathologies with detailed cause, symptom, organic, chemical, and preventive specifications.

6. **System Architecture & AI Pipeline Flow (`/architecture`)**
   - Interactive technical blueprint explaining the Client Presentation Layer, FastAPI Gateway, Computer Vision Preprocessing, Deep Neural Backbone, Agronomic Knowledge Base, and Expert Human-in-the-Loop loops.

7. **Admin / Expert Portal (`/admin`)**
   - Queue of low-confidence cases (&lt;60%) flagged for human review.
   - Actions to Confirm, Reject, or Tag for Model Retraining.
   - Model Registry displaying architecture versions (`CropDisease-EfficientNet-v1.4`), accuracy, precision, recall, and latency metrics.
   - Disease Knowledge Base editor.

8. **Audit & Diagnostic History (`/history`)**
   - LocalStorage backed history allowing exhibition visitor scans to persist across page reloads.
   - Filters for crops, dates, and health statuses with search.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Shahbaz4462/AgroSight-Crop-Disease-Prediction.git
cd AgroSight

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🔌 Connecting Future AI Model Backend

When the trained PyTorch / TensorFlow model is ready, connect via FastAPI without changing any UI code:

1. Configure `.env.local`:
```env
NEXT_PUBLIC_AI_PROVIDER="api"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

2. The backend should implement `POST /predict` receiving `file` multipart data and returning:
```json
{
  "crop": "Rice",
  "disease": "Brown Spot",
  "confidence": 94.6,
  "status": "diseased",
  "symptoms": ["Oval brown lesions with yellow halos"],
  "cause": "Bipolaris oryzae fungal pathogen under high humidity",
  "organic_solution": ["Neem seed kernel extract 5%"],
  "chemical_solution": ["Mancozeb 75% WP @ 2.0 g/L"],
  "prevention": ["Balanced NPK application"]
}
```

---

## 📜 Advisory Disclaimer

AgroSight provides AI-assisted diagnostic decision support. Chemical and organic treatments should be applied strictly according to official pesticide label directions, safety guidelines, and advice from certified agronomists or local extension officers.

---

## 🏛️ Project Information

- **Author / Developer:** Muhammad Shahbaz
- **Repository:** [AgroSight-Crop-Disease-Prediction](https://github.com/Shahbaz4462/AgroSight-Crop-Disease-Prediction.git)
- **Year:** © 2026 AgroSight

