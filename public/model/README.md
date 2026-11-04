# Vercel-only model files

The browser model lives here, served by Vercel itself as static files:

- `model.json` — TensorFlow.js model topology (owner adds this file)
- `group1-shard*.bin` — TensorFlow.js weights, split into ~4 MB shards
  (owner adds these files)
- `class_names.json` — already in this folder, exact output order
- `solutions.json` — already in this folder, solutions for the 9 v1 classes
- `evaluation.json` — already in this folder, test results

## Why model.json and the shards are not in this pull request

They are binary files, and the GitHub tool used for this branch cannot
push binary files. The owner adds them with a normal git push, for example:

```bash
# From the converted model folder (see below):
cp model.json group1-shard*.bin public/model/
git add public/model/
git commit -m "Add TFJS v1 model files"
git push origin feat/v1-wheat-cotton-rice
```

Or upload the same files through the GitHub web interface into
`public/model/` on this branch. Each shard is about 4 MB, under GitHub's
web upload limit.

Until those files are present, scans fail with an error instead of a
fake result — by design. Do not merge this branch for live use until
the model files are in place and a real scan has been tested on Vercel.

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
