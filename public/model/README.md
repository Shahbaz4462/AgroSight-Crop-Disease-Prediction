# Vercel-only model files — V2 (23 classes)

The browser model lives here, served by Vercel itself as static files:

- `model.json` — TensorFlow.js model topology
- `group1-shard*.bin` — TensorFlow.js weights, split into ~4 MB shards
- `class_names.json` — exact output order (23 classes)
- `solutions.json` — solutions for the 23 v2 classes
- `evaluation.json` — test results (overall 82.35%, cotton 87.2%, rice 85.4%, wheat 73.2%)

## V2 model

Trained 2026-11-05 (MobileNetV2, 224×224): 4 head epochs + 2 fine-tune
epochs, then 2 continue-training rounds for wheat (class weights, then
full unfreeze). Final test on 3,275 images: overall 82.35%. Wheat is
73.2% — below the 80% per-crop gate, accepted by the owner for this
branch; do not present wheat as 80%+ anywhere.

## Why the weights are stored as base64

The original shards (`group1-shard*.bin`) are binary files, and the
GitHub tool used for this repo cannot push binary files. So the weights
are stored here as base64 text instead (`group1-shard*.bin.b64`), which
is plain UTF-8 and can be pushed normally. The frontend loader in
`src/services/ai/tfjsPredictionService.ts` decodes each `.b64` file back
to the exact original bytes before handing them to TensorFlow.js, so
predictions are identical to the binary-shard model.

If you ever replace the model with a normal git push, you can put the
binary shards here instead — but then the loader must be changed back
to `tf.loadGraphModel("/model/model.json")`, because that loader reads
the `.b64` files, not the binary shards.

Until the model files are present, scans fail with an error instead of
a fake result — by design. Do not merge for live use until the model
files are in place and a real scan has been tested on Vercel.

## How the model was converted

This is a TensorFlow.js **graph** model, not a layers model. The layers
conversion failed on the Keras 3 topology, while the graph conversion
loads and predicts correctly (verified in Node with plain @tensorflow/tfjs:
cotton army worm 98.97%, diseased rice 84.11%, healthy wheat 99.27%,
healthy cotton 99.89%, wheat yellow rust 47.75% on a known borderline image).

```bash
# From the delivered .keras model:
python3 -c "import tensorflow as tf; m=tf.keras.models.load_model('leaf_disease_subset_model.keras'); tf.saved_model.save(m, 'saved_model_v1')"
tensorflowjs_converter \
  --input_format tf_saved_model \
  --output_format tfjs_graph_model \
  --signature_name serving_default \
  saved_model_v1 public/model/
```

Then re-check a few test images against the original `.keras` model,
because conversion and browser resize can shift borderline predictions.
The first scan in a browser downloads the model once (about 8.7 MB),
then runs fully in the browser with no external backend.
