"""Fine-tune a pretrained MobileNetV3-Large on the prepared leaf images (CPU friendly).

Run:  python train.py [--epochs 5]
Outputs (ml/artifacts/): model.pt (state dict), classes.json, metrics.json
"""
import argparse
import json
import time
from pathlib import Path

import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms

ROOT = Path(__file__).parent
DATA = ROOT / "data"
OUT = ROOT / "artifacts"
SIZE = 224
MEAN, STD = [0.485, 0.456, 0.406], [0.229, 0.224, 0.225]


def loaders(batch: int, workers: int):
    train_tf = transforms.Compose([
        transforms.RandomResizedCrop(SIZE, scale=(0.45, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.RandomRotation(25),
        # field photos vary a lot in light and focus; PlantVillage does not, so push hard here
        transforms.ColorJitter(brightness=0.4, contrast=0.4, saturation=0.3, hue=0.04),
        transforms.RandomApply([transforms.GaussianBlur(5, sigma=(0.1, 2.0))], p=0.3),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
        transforms.RandomErasing(p=0.25, scale=(0.02, 0.15)),
    ])
    val_tf = transforms.Compose([
        transforms.Resize(int(SIZE * 1.14)),
        transforms.CenterCrop(SIZE),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ])
    tr = datasets.ImageFolder(DATA / "train", train_tf)
    va = datasets.ImageFolder(DATA / "val", val_tf)
    assert tr.classes == va.classes, "train/val class mismatch"
    return (
        tr, va,
        DataLoader(tr, batch_size=batch, shuffle=True, num_workers=workers, persistent_workers=workers > 0),
        DataLoader(va, batch_size=batch, shuffle=False, num_workers=workers, persistent_workers=workers > 0),
    )


def evaluate(model, loader, n_classes):
    model.eval()
    conf = np.zeros((n_classes, n_classes), dtype=np.int64)
    with torch.no_grad():
        for x, y in loader:
            p = model(x).argmax(1)
            for t, q in zip(y.tolist(), p.tolist()):
                conf[t, q] += 1
    acc = conf.trace() / max(1, conf.sum())
    per_class = conf.diagonal() / np.maximum(1, conf.sum(1))
    return acc, per_class, conf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--epochs", type=int, default=5)
    ap.add_argument("--batch", type=int, default=32)
    ap.add_argument("--workers", type=int, default=4)
    args = ap.parse_args()

    torch.set_num_threads(max(1, torch.get_num_threads()))
    tr, va, tl, vl = loaders(args.batch, args.workers)
    classes = tr.classes
    print(f"{len(classes)} classes, {len(tr)} train, {len(va)} val")

    model = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.IMAGENET1K_V2)
    in_f = model.classifier[-1].in_features
    model.classifier[-1] = nn.Linear(in_f, len(classes))

    # epoch 0: train the head only (fast, stable); then fine-tune everything
    for p in model.features.parameters():
        p.requires_grad = False
    opt = torch.optim.AdamW(filter(lambda p: p.requires_grad, model.parameters()), lr=2e-3, weight_decay=1e-4)
    loss_fn = nn.CrossEntropyLoss(label_smoothing=0.1)

    OUT.mkdir(exist_ok=True)
    best, history = 0.0, []
    for epoch in range(args.epochs):
        if epoch == 1:
            for p in model.features.parameters():
                p.requires_grad = True
            opt = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
        sched = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=len(tl))
        model.train()
        t0, run = time.time(), 0.0
        for i, (x, y) in enumerate(tl):
            opt.zero_grad()
            loss = loss_fn(model(x), y)
            loss.backward()
            opt.step()
            sched.step()
            run += loss.item()
            if i % 20 == 0:
                print(f"  ep{epoch} step {i}/{len(tl)} loss {loss.item():.3f}", flush=True)
        acc, per_class, conf = evaluate(model, vl, len(classes))
        history.append({"epoch": epoch, "train_loss": run / len(tl), "val_acc": float(acc), "secs": time.time() - t0})
        print(f"epoch {epoch}: loss {run/len(tl):.3f}  val acc {acc:.3%}  ({time.time()-t0:.0f}s)", flush=True)
        if acc >= best:
            best = acc
            torch.save(model.state_dict(), OUT / "model.pt")
            (OUT / "classes.json").write_text(json.dumps(classes, indent=1))
            metrics = {
                "val_accuracy": float(acc),
                "per_class_recall": {c: float(r) for c, r in zip(classes, per_class)},
                "history": history,
                "n_train": len(tr),
                "n_val": len(va),
                "note": "Validation = PlantVillage test split + 20% of the cotton set. NOT real field photos of your region.",
            }
            (OUT / "metrics.json").write_text(json.dumps(metrics, indent=1))
    print("best val acc", f"{best:.3%}")


if __name__ == "__main__":
    main()
