# AgroSight model (v1)

A first, honest, CPU-trained leaf classifier plus the API the app talks to.

## What it can and can't do

- 43 classes: PlantVillage crops (apple, cherry, corn, grape, citrus, peach, pepper, potato, strawberry, tomato, squash, ...) and **cotton** (Alternaria, Bacterial Blight, Fusarium Wilt, Verticillium Wilt, healthy).
- **Wheat is NOT supported.** No public wheat dataset with named disease classes was found. The 4,156-image field dataset `Project-AgML/wheat_disease_detection` has numeric class IDs only (0-6), and its card does not say which disease each number is. Do not guess. Get the class list from the dataset authors (Ma et al., Zenodo 10.5281/zenodo.15621359) or have an agronomist label a sample, then add it.
- PlantVillage photos are lab-style (single leaf, plain background). Accuracy on real field photos will be **much lower** than the validation number reported in `artifacts/metrics.json`. Treat v1 as a working pipeline, not a trustworthy diagnosis.
- The cotton set is **CC BY-NC 4.0 (non-commercial)**. Do not ship a commercial product on it without checking licence terms or replacing it.
- There is no "not a leaf" class yet. The server refuses to name a disease when confidence is under 60% or the top two classes are within 15 points, but a photo of a random object can still be mislabelled.

## Run

```
cd ml
python -m venv .venv
.venv\Scripts\python -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python prepare_data.py        # ~1 GB download, builds ml/data
.venv\Scripts\python train.py --epochs 5    # CPU: roughly 20-40 min
.venv\Scripts\python -m uvicorn serve:app --port 8000
```

Then in the app root `.env.local`:

```
NEXT_PUBLIC_AI_PROVIDER=api
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Restart `npm run dev`.

## Improving it (in order of impact)

1. Add real field photos from your region, labelled by an agronomist (wheat especially).
2. Add a "not a leaf" / "unclear" class with photos of hands, soil, sky, fruit.
3. Evaluate only on photos the model has never seen, taken on cheap phones in the field.
4. Re-tune `CONFIDENCE_GATE` and `MIN_MARGIN` in `serve.py` from those results.
