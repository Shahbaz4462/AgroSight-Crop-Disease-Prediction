// Photo quality check, run in the browser before a scan.
// This is a warning, not a block: it measures brightness, sharpness
// and resolution from the image itself. It cannot tell whether the
// photo is a leaf or not — a green colour check was measured and
// rejected, because real diseased leaves are often yellow or brown
// and would be wrongly rejected. A poor-quality photo is still
// allowed to scan, but the user is warned first, because blurry or
// dark photos are the most common cause of a wrong confident answer.

export interface QualityWarning {
  // A code, not text, so the UI can translate it ("dark", "bright",
  // "blurry", "small"). The text lives in the language dictionary.
  code: "dark" | "bright" | "blurry" | "small";
}

export async function assessImageQuality(dataUrl: string): Promise<QualityWarning[]> {
  const warnings: QualityWarning[] = [];
  try {
    const img = await loadImage(dataUrl);
    const size = 200;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return warnings;
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;

    let brightness = 0;
    const gray: number[] = new Array(size * size);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const g = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      gray[j] = g;
      brightness += g;
    }
    brightness /= gray.length;
    if (brightness < 45) warnings.push({ code: "dark" });
    else if (brightness > 235) warnings.push({ code: "bright" });

    // Sharpness: variance of a simple Laplacian (edge strength).
    // Sharp photos have strong edges; blurry photos have almost none.
    let lapSum = 0;
    let lapSq = 0;
    let count = 0;
    for (let y = 1; y < size - 1; y++) {
      for (let x = 1; x < size - 1; x++) {
        const lap =
          4 * gray[y * size + x] -
          gray[(y - 1) * size + x] -
          gray[(y + 1) * size + x] -
          gray[y * size + x - 1] -
          gray[y * size + x + 1];
        lapSum += lap;
        lapSq += lap * lap;
        count++;
      }
    }
    const mean = lapSum / count;
    const variance = lapSq / count - mean * mean;
    if (variance < 120) {
      warnings.push({ code: "blurry" });
    }
    if (img.naturalWidth < 400 || img.naturalHeight < 400) {
      warnings.push({ code: "small" });
    }
  } catch {
    // Quality failure must never block a scan.
  }
  return warnings;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = src;
  });
}
