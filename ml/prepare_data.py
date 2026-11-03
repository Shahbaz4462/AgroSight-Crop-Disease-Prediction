"""Download and prepare the training data.

Sources (all public on Hugging Face):
  * Project-AgML/cotton_leaf_disease_classification (raw)  - cotton, 5 classes, CC BY-NC 4.0 (NON-COMMERCIAL)
  * BrandonFors/Plant-Diseases-PlantVillage-Dataset        - PlantVillage mirror, CC0

Output: ml/data/{train,val}/<Crop___Disease>/*.jpg  (images resized to max side 256)

Run:  python prepare_data.py            (about 1 GB download)
"""
import io
import random
import re
from pathlib import Path

import pandas as pd
import yaml
from huggingface_hub import hf_hub_download
from PIL import Image

ROOT = Path(__file__).parent
DATA = ROOT / "data"
RNG = random.Random(42)

PV_REPO = "BrandonFors/Plant-Diseases-PlantVillage-Dataset"
COTTON_REPO = "Project-AgML/cotton_leaf_disease_classification"

PV_TRAIN_PER_CLASS = 150
PV_VAL_PER_CLASS = 40
COTTON_VAL_FRACTION = 0.2
MAX_SIDE = 256


def label_names(repo: str, config: str | None = None) -> list[str]:
    readme = Path(hf_hub_download(repo, "README.md", repo_type="dataset")).read_text(encoding="utf-8")
    front = readme.split("---")[1]
    meta = yaml.safe_load(front)
    info = meta["dataset_info"]
    if isinstance(info, list):
        info = next(i for i in info if config is None or i.get("config_name") == config)
    for f in info["features"]:
        if f["name"] == "label":
            names = f["dtype"]["class_label"]["names"]
            return [names[k] if isinstance(names, dict) else names[int(k)] for k in (names if isinstance(names, dict) else range(len(names)))]
    raise RuntimeError("no label feature")


def clean(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9_]+", "_", name).strip("_")


def save(img_bytes: bytes, out: Path):
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img.thumbnail((MAX_SIDE, MAX_SIDE))
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=90)


def prep_cotton():
    names = label_names(COTTON_REPO, "raw")
    path = hf_hub_download(COTTON_REPO, "raw/train-00000-of-00001.parquet", repo_type="dataset")
    df = pd.read_parquet(path)
    print("cotton rows", len(df), names)
    by_class: dict[int, list[int]] = {}
    for i, lab in enumerate(df["label"].tolist()):
        by_class.setdefault(int(lab), []).append(i)
    for lab, idxs in by_class.items():
        RNG.shuffle(idxs)
        n_val = max(1, int(len(idxs) * COTTON_VAL_FRACTION))
        cls = "Cotton___" + clean(names[lab]).replace("_Leaf", "").replace("Healthy", "healthy")
        for k, i in enumerate(idxs):
            split = "val" if k < n_val else "train"
            save(df.iloc[i]["image"]["bytes"], DATA / split / cls / f"cotton_{i}.jpg")


def prep_pv():
    from huggingface_hub import list_repo_files

    names = label_names(PV_REPO)
    files = [f for f in list_repo_files(PV_REPO, repo_type="dataset") if f.endswith(".parquet")]
    train_files = sorted(f for f in files if "/train-" in f)
    test_files = sorted(f for f in files if "/test-" in f)
    print("PV classes", len(names), "train files", train_files, "test files", test_files)

    def take(files_, per_class, split):
        counts: dict[int, int] = {}
        for f in files_:
            df = pd.read_parquet(hf_hub_download(PV_REPO, f, repo_type="dataset"))
            order = list(range(len(df)))
            RNG.shuffle(order)
            for i in order:
                lab = int(df.iloc[i]["label"])
                if counts.get(lab, 0) >= per_class:
                    continue
                counts[lab] = counts.get(lab, 0) + 1
                crop_n, _, dis_n = names[lab].partition("___")
                cls = f"{clean(crop_n)}___{clean(dis_n)}"
                save(df.iloc[i]["image"]["bytes"], DATA / split / cls / f"pv_{split}_{lab}_{counts[lab]}.jpg")
            del df
        print(split, "classes filled", len(counts))

    take(train_files, PV_TRAIN_PER_CLASS, "train")
    take(test_files, PV_VAL_PER_CLASS, "val")


if __name__ == "__main__":
    prep_cotton()
    prep_pv()
    n = sum(1 for _ in DATA.rglob("*.jpg"))
    print("done, images:", n)
