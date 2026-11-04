# AgroSight v1 inference backend

FastAPI service for the delivered MobileNetV2 model. Wheat, cotton and rice
only — 9 classes. See `model/` for the class list and solutions.

## Why a separate service?

The Next.js frontend on Vercel cannot run a TensorFlow `.keras` model.
This Python service loads the model once at startup and serves
`POST /predict`. The frontend sends the photo there and shows the result
in the existing result page, with no layout changes.

## Run locally

```bash
cd backend
pip install -r requirements.txt
# Place the delivered model file here (21 MB, NOT committed to git):
#   backend/model/leaf_disease_subset_model.keras
uvicorn app:app --host 0.0.0.0 --port 8000
```

Test:

```bash
curl http://localhost:8000/health
curl -X POST -F "file=@leaf.jpg" http://localhost:8000/predict
```

## Deploy

Deploy this folder on Render, Railway, or any Python host, then set this
in Vercel for the frontend project:

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-host.example.com
```

No trailing slash. Redeploy the frontend after changing it.

## Why the model file is not in git

The `.keras` file is 21 MB of binary data. The GitHub connector used for
this branch cannot push binary files, so it is intentionally excluded.
Copy the file delivered in chat (`leaf_disease_subset_model.keras`) into
`backend/model/` on the host. The service will refuse to start without it,
rather than returning a fake result.

## Prediction rules (must match training)

- RGB, resize 224×224, MobileNetV2 `preprocess_input`
- Confidence is returned as 0–100, matching the frontend
- Below 60% confidence: status `uncertain`, ask for a clearer photo
- Solutions come from `model/solutions.json`, filtered to the 9 v1 classes
