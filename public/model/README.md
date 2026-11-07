# Vercel-only model files — 3-step pipeline (leaf gate + crop gate + per-crop disease models)

The browser models live here, served by Vercel itself as static files.
Every scan runs three models in order, and any step can answer
"not sure" instead of guessing:

- `leaf/` — leaf gate, 2 classes (`leaf_class_names.json`):
  leaf / no_leaf. Runs first; below 90% leaf confidence the scan
  is "not sure" and the other models never run. Cache key `leaf-v4`.
- `crop/` — crop gate, 3 classes (`crop_class_names.json`):
  cotton / rice / wheat. Runs second; below 90% the scan is
  "not sure" and the disease model never runs. Cache key `crop-v2`.
- `rice/` — rice disease model, 7 classes (`rice_class_names.json`
  + `solutions.json`): healthy_rice, rice_bacterial_blight,
  rice_blast, rice_brown_spot, rice_leaf_scald, rice_sheath_blight,
  rice_tungro. Cache key `rice-v2`.
- `cotton/` — cotton disease model, 4 classes
  (`cotton_class_names.json` + `solutions.json`):
  cotton_bacterial_blight, cotton_curl_virus, cotton_fusarium_wilt,
  healthy_cotton. Cache key `cotton-v1`.
- `wheat/` — wheat disease model, 4 classes
  (`wheat_class_names.json` + `solutions.json`): healthy_wheat,
  wheat_brown_rust, wheat_septoria, wheat_yellow_rust.
  Cache key `wheat-v1`.

Each model folder holds `model.json` + its base64 weight parts
(`group1-shard*.bin.b64` / `.b64.partNN`) — see "Why the weights
are stored as base64" below. Change the cache key in
`src/services/ai/tfjsPredictionService.ts` whenever that model
changes, or returning visitors keep the old model cached.

The files at the root of this folder (`model.json`,
`class_names.json`, `solutions.json`, `evaluation.json`) are the old
V2 23-class model. The loader no longer loads them — they remain
here as a backup reference only, and can be removed once the new
pipeline is verified live.

## Measured results (held-out test sets, 2026-11-07)

- Leaf gate v4: 89.82% on 3,211 images (leaf recall 87.0%,
  no_leaf recall 93.1%). On the 216-photo field acceptance set it
  scores 185/216, the same as the previous version — the 90% gate
  is what makes it safe: with the gate, no acceptance photo is
  confidently wrong; the errors all fall below the gate and become
  "not sure". About 30% of real leaf photos also fall below the
  gate and are answered "not sure" rather than risked.
- Crop gate (new_crop): 95.76% on 754 test images; on the 180-photo
  field acceptance set it makes about half as many confident crop
  errors as the previous field-only crop model (11 vs 21). Healthy
  wheat and healthy rice leaves look near-identical, so some wheat
  field photos are still answered "not sure" rather than risked.
- Rice v2: 81.82% on 264 test images (healthy 84.2%, bacterial
  blight 75.7%, blast 72.2%, brown spot 72.4%, leaf scald 62.5%,
  sheath blight 79.3%, tungro 98.7%).
- Cotton: 87.64% on 89 test images (bacterial blight 92.3%,
  curl virus 100%, fusarium wilt 69.6%, healthy 88.9%).
- Wheat: 95.15% on 412 test images (healthy 95.4%, brown rust
  97.4%, septoria 81.8%, yellow rust 94.2%).

All five models were converted with the same graph recipe and
verified in Node (output size, softmax sums to 1.0, and real-photo
probabilities match the Keras model exactly). The disease models
are per-crop: a cotton leaf can never be answered with a wheat
disease, because the wheat model is never run for a cotton leaf.
Confident threshold for a disease answer is 75% (see the loader).

## The old V2 model (replaced, kept as backup reference)

Trained 2026-11-05 (MobileNetV2, 224×224): overall 82.35% on
3,275 images (cotton 87.2%, rice 85.4%, wheat 73.2% — wheat below
the 80% per-crop gate, accepted by the owner for that branch).
The old crop gate (field3, 2026-11-06) was trained only on real
field photos and scored 99.59% on its 1,476-image field test set,
but on the wider 180-photo field acceptance set it made 21
confident crop errors. Both are superseded by the models above
and are no longer loaded by the site.

## 2026-11-05 fix: model and class list must come from the same deployment

The loader fetches `model.json` and the weights from this deployment's
own `/model/` copy FIRST, and only falls back to the jsDelivr CDN
(which mirrors the main branch). An earlier version fetched the CDN
first, so a preview deployment loaded the main branch's 9-class model
while using this branch's 23-class list — every rice photo was then
reported as a cotton disease. The loader now also checks that each
model's output size equals its class list length and fails loudly
instead of mislabelling.

## Why the weights are stored as base64

The original shards (`group1-shard*.bin`) are binary files, and the
GitHub tool used for this repo cannot push binary files. So the weights
are stored here as base64 text instead (`group1-shard*.bin.b64`), which
is plain UTF-8 and can be pushed normally. Large shards are split into
~500 KB parts (`...b64.part00`, `.part01`, ...). The frontend loader in
`src/services/ai/tfjsPredictionService.ts` decodes each part back
to the exact original bytes before handing them to TensorFlow.js, so
predictions are identical to the binary-shard model.

If you ever replace the model with a normal git push, you can put the
binary shards here instead — but then the loader must be changed back
to `tf.loadGraphModel("/model/.../model.json")`, because that loader reads
the `.b64` files, not the binary shards.

Until the model files are present, scans fail with an error instead of
a fake result — by design. Do not merge for live use until the model
files are in place and a real scan has been tested on Vercel.

## How the models were converted

These are TensorFlow.js **graph** models, not layers models. The layers
conversion failed on the Keras 3 topology, while the graph conversion
loads and predicts correctly (verified in Node with plain @tensorflow/tfjs).

```bash
# From each delivered .keras model (see convert_new_models.py):
python3 -c "import tensorflow as tf; m=tf.keras.models.load_model('model.keras'); tf.saved_model.save(m, 'saved_model')"
tensorflowjs_converter \
  --input_format tf_saved_model \
  --output_format tfjs_graph_model \
  --signature_name serving_default \
  --saved_model_tags serve \
  saved_model final_<tag>_tfjs
```

Then re-check a few test images against the original `.keras` model,
because conversion and browser resize can shift borderline predictions.
The first scan in a browser downloads the leaf + crop models once
(about 8.7 MB each) plus the decided crop's disease model, then runs
fully in the browser with no external backend.
