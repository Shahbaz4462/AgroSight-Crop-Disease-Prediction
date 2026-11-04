"""AgroSight v1 inference backend (FastAPI).

Serves the delivered MobileNetV2 model for wheat, cotton and rice only
(9 classes). This service is separate from the Next.js frontend on Vercel,
because Vercel frontend code cannot run a TensorFlow .keras model.

Setup:
  1. Place the delivered model file here:
       backend/model/leaf_disease_subset_model.keras   (21 MB, NOT in git)
  2. pip install -r requirements.txt
  3. uvicorn app:app --host 0.0.0.0 --port 8000

Frontend:
  Set NEXT_PUBLIC_API_BASE_URL in Vercel to this service's public URL,
  e.g. https://your-backend.onrender.com  (no trailing slash).

Prediction rules must match training exactly:
  RGB, tf.image.resize to 224x224 (bilinear, as in training), MobileNetV2 preprocess_input.
  Note: the resize method matters for borderline images — PIL's default
  resize gave a different result from the training pipeline on one test
  image, so this backend uses tf.image.resize to match training.
  Confidence below 60% -> status "uncertain", no confident diagnosis.
"""

import json
import os
from datetime import datetime, timezone

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "leaf_disease_subset_model.keras")
CLASSES_PATH = os.path.join(MODEL_DIR, "class_names.json")
SOLUTIONS_PATH = os.path.join(MODEL_DIR, "solutions.json")

# Display names for the 9 v1 model classes, in class_names.json order.
DISPLAY = {
    "cotton_aphids": ("Cotton", "Aphids"),
    "cotton_army_worm": ("Cotton", "Army Worm"),
    "diseased_rice": ("Rice", "Diseased"),
    "healthy_cotton": ("Cotton", "Healthy"),
    "healthy_rice": ("Rice", "Healthy"),
    "healthy_wheat": ("Wheat", "Healthy"),
    "wheat_aphid": ("Wheat", "Aphid"),
    "wheat_brown_rust": ("Wheat", "Brown Rust"),
    "wheat_yellow_rust": ("Wheat", "Yellow Rust"),
}

app = FastAPI(title="AgroSight v1 inference")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

_model = None
_class_names = None
_solutions = None


def load_backend():
    global _model, _class_names, _solutions
    if _model is not None:
        return
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(
            "Model file not found at backend/model/leaf_disease_subset_model.keras. "
            "Copy the delivered v1 model file there; it is intentionally not committed to git."
        )
    _model = tf.keras.models.load_model(MODEL_PATH)
    with open(CLASSES_PATH) as f:
        _class_names = json.load(f)
    with open(SOLUTIONS_PATH) as f:
        _solutions = json.load(f)


@app.on_event("startup")
def startup():
    load_backend()


@app.get("/health")
def health():
    load_backend()
    return {"status": "ok", "classes": _class_names}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    load_backend()
    try:
        raw = await file.read()
        decoded = tf.image.decode_image(raw, channels=3, expand_animations=False)
        resized = tf.image.resize(decoded, [224, 224])
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read image: {exc}")

    x = tf.keras.applications.mobilenet_v2.preprocess_input(
        tf.expand_dims(tf.cast(resized, tf.float32), axis=0)
    )
    probs = _model.predict(x, verbose=0)[0]
    idx = int(np.argmax(probs))
    label = _class_names[idx]
    confidence = float(probs[idx]) * 100.0  # frontend expects 0-100
    crop, disease = DISPLAY.get(label, (label, label))
    sol = _solutions.get(label, {}) if isinstance(_solutions, dict) else {}

    if confidence < 60.0:
        status = "uncertain"
        message = (
            "Photo is not clear enough for a reliable answer. "
            "Take a closer, well-lit photo of a single leaf."
        )
    elif disease == "Healthy":
        status = "healthy"
        message = None
    else:
        status = "diseased"
        message = None

    return {
        "crop": crop,
        "disease": disease,
        "confidence": round(confidence, 2),
        "status": status,
        "low_confidence": confidence < 60.0,
        "message": message,
        # Frontend result tabs expect these array fields.
        "organic_solution": [sol.get("immediate_steps", "")] if sol.get("immediate_steps") else [],
        "chemical_solution": [sol.get("treatment", "")] if sol.get("treatment") else [],
        "prevention": [p for p in (sol.get("prevention", ""), sol.get("note", "")) if p],
        "predicted_class": label,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
