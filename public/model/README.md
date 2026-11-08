# Vercel-only model files — v3 pipeline (leaf+crop model + per-crop disease models)

The browser models live here, served by Vercel itself as static files.
Every scan runs two models in order, and any step can answer
"not sure" instead of guessing:

- `leafcrop/` — leaf+crop model, 4 classes
  (`leafcrop_class_names.json`): cotton / no_leaf / rice / wheat.
  Runs first; top-1 is no_leaf, or the top-1 crop is below 90%
  confidence, and the scan is "not sure" — no crop is named and
  the disease model never runs. Cache key `leafcrop-v3`.
- `rice/` — rice disease model, 7 classes (`rice_class_names.json`
  + `solutions.json`): healthy_rice, rice_bacterial_blight,
  rice_blast, rice_brown_spot, rice_leaf_scald, rice_sheath_blight,
  rice_tungro. Cache key `rice-v3`.
- `cotton/` — cotton disease model, 6 classes
  (`cotton_class_names.json` + `solutions.json`):
  cotton_alternaria, cotton_bacterial_blight, cotton_curl_virus,
  cotton_fusarium_wilt, cotton_verticillium_wilt, healthy_cotton.
  Cache key `cotton-v3`.
- `wheat/` — wheat disease model, 6 classes
  (`wheat_class_names.json` + `solutions.json`): healthy_wheat,
  wheat_black_rust, wheat_brown_rust, wheat_powdery_mildew,
  wheat_septoria, wheat_yellow_rust. Cache key `wheat-v3`.

Each model folder holds `model.json` + its base64 weight parts
(`group1-shard*.bin.b64` / `.b64.partNN`) — see "Why the weights
are stored as base64" below. Change the cache key in
`src/services/ai/tfjsPredictionService.ts` whenever that model
changes, or returning visitors keep the old model cached.

The folders `leaf/` (old 2-class leaf gate) and `crop/` (old
3-class crop gate) are NO LONGER LOADED — the single 4-class
leafcrop model replaces both. They remain here unreferenced as a
backup reference only. The files at the root of this folder
(`model.json`, `class_names.json`, `solutions.json`,
`evaluation.json`) are the old V2 23-class model. The loader no
longer loads them — they remain here as a backup reference only,
and can be removed once the new pipeline is verified live.

## Measured results (held-out test sets, 2026-11-08)

- Leaf+crop (MobileNetV2): 97.30% on 1,890 images (cotton 98.1%,
  rice 98.0%, no_leaf 97.4%, wheat 96.0%). On the 216-photo field
  acceptance set it detects leaves 209/216 (the old leaf gate
  managed 185/216). At the 90% gate, 0/36 non-leaf photos pass and
  only 9 field photos are confidently wrong (vs 22 at 80%).
  Combined correct crop: 169/216. Healthy wheat and healthy rice
  leaves look near-identical, so some wheat field photos are still
  answered "not sure" rather than risked.
- Cotton: 89.22% on 204 test images (alternaria 88.9%,
  bacterial blight 77.8%, curl virus 100%, fusarium wilt 96.4%,
  verticillium wilt 85.7%, healthy 88.9%).
- Wheat: 83.28% on 574 test images (healthy 89.1%, black rust
  88.9%, brown rust 90.4%, powdery mildew 76.4%, septoria 73.3%,
  yellow rust 74.8%). Weaker than the old 4-class wheat model
  (95.15%) — the 6-class task adds black rust + powdery mildew
  and three confusable rust/spot classes.
- Rice: 86.56% on 305 test images (healthy 94.7%, bacterial
  blight 70.3%, blast 61.1%, brown spot 89.7%, leaf scald 100%
  on 8 test images, sheath blight 90.0%, tungro 97.4%).

All four models were converted with the same graph recipe and
verified in Node (output size, softmax sums to 1.0, and real-photo
probabilities match the Keras model exactly, diff 0.0000). The
disease models are per-crop: a cotton leaf can never be answered
with a wheat disease, because the wheat model is never run for a
cotton leaf. Confident threshold for a disease answer is 75%
(see the loader). Total size ~34 MB (vs ~43 MB for the old
five-model pipeline).

## The old pipeline (replaced, kept as backup reference)

Leaf gate v4: 89.82% on 3,211 images; crop gate (new_crop):
95.76% on 754 test images; rice v2 81.82%, cotton 87.64%,
wheat 95.15% on their test sets. On the 216-photo field
acceptance set the old pipeline gave 84/180 confident-correct
crops end-to-end (v3 at the 90% gate: 107/180). Both are
superseded by the models above and are no longer loaded by the
site. The old V2 23-class model (82.35%, 2026-11-05) and the
field-only crop gate (field3, 2026-11-06) are likewise
superseded.

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
# From each delivered .keras model (see convert_v3_models.py):
python3 -c "import tensorflow as tf; m=tf.keras.models.load_model('model.keras'); tf.saved_model.save(m, 'saved_model')"
tensorflowjs_converter \
  --input_format tf_saved_model \
  --output_format tfjs_graph_model \
  --signature_name serving_default \
  --saved_model_tags serve \
  saved_model final_<tag>_v3_tfjs
```

Then re-check a few test images against the original `.keras` model,
because conversion and browser resize can shift borderline predictions.
The first scan in a browser downloads the leaf+crop model once
(about 8.6 MB) plus the decided crop's disease model, then runs
fully in the browser with no external backend.
