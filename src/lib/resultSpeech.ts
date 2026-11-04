// Spoken result text, in the language the user actually selected.
// The old voice code spoke English text even in Urdu mode, because
// it read the English treatment paragraphs from solutions.json.
// Now the spoken text is built from translated sentences: the crop
// and disease names stay in English (so they can be asked for at a
// shop), everything else is in the selected language.
//
// The spoken treatment is a short, translated summary per class, not
// a word-for-word translation of the English treatment paragraphs.
// Full treatment steps are on the result page in text.

import type { Lang } from "./i18n";

const SUMMARIES: Record<string, { ur: string; roman: string }> = {
  cotton_aphids: {
    ur: "کیڑوں کے لیے نیم کا تیل یا لیبل کے مطابق ایسیٹامیپرڈ استعمال کریں، اور پتوں کے نیچے چیک کریں۔",
    roman: "Keeron ke liye neem ka tail ya label ke mutabiq acetamiprid use karein, aur patton ke neeche check karein.",
  },
  cotton_army_worm: {
    ur: "سندی کے لیے لیبل کے مطابق کلورینٹرینیلپرول یا ایمامیکٹن بینزویٹ استعمال کریں، شام کو اسپرے کریں۔",
    roman: "Sundi ke liye label ke mutabiq chlorantraniliprole ya emamectin benzoate use karein, shaam ko spray karein.",
  },
  wheat_brown_rust: {
    ur: "براؤن رسٹ کے لیے لیبل کے مطابق پروپیکونازول یا ٹیبوکونازول فنجیسائیڈ استعمال کریں۔",
    roman: "Brown rust ke liye label ke mutabiq propiconazole ya tebuconazole fungicide use karein.",
  },
  wheat_yellow_rust: {
    ur: "یلو رسٹ کے لیے لیبل کے مطابق پروپیکونازول یا ٹیبوکونازول فنجیسائیڈ استعمال کریں۔",
    roman: "Yellow rust ke liye label ke mutabiq propiconazole ya tebuconazole fungicide use karein.",
  },
  wheat_aphid: {
    ur: "افڈ کے لیے نیم کا تیل یا لیبل کے مطابق ایسیٹامیپرڈ استعمال کریں۔",
    roman: "Aphid ke liye neem ka tail ya label ke mutabiq acetamiprid use karein.",
  },
  diseased_rice: {
    ur: "چاول کی بیماری کی صحیح وجہ معلوم کیے بغیر کوئی مخصوص دوا نہ لگائیں۔ مقامی زرعی افسر سے تصدیق کریں۔",
    roman: "Chawal ki bimari ki sahi wajah maloom kiye baghair koi makhsoos dawa na lagayein. Maqami zarae afsar se tasdeeq karein.",
  },
  healthy_cotton: {
    ur: "فصل صحت مند ہے۔ کوئی اسپرے کی ضرورت نہیں۔ ہر ہفتے پتوں کی جانچ جاری رکھیں۔",
    roman: "Fasal sehatmand hai. Koi spray ki zaroorat nahi. Har hafte patton ki jaanch jaari rakhein.",
  },
  healthy_rice: {
    ur: "فصل صحت مند ہے۔ کوئی اسپرے کی ضرورت نہیں۔ ہر ہفتے پتوں کی جانچ جاری رکھیں۔",
    roman: "Fasal sehatmand hai. Koi spray ki zaroorat nahi. Har hafte patton ki jaanch jaari rakhein.",
  },
  healthy_wheat: {
    ur: "فصل صحت مند ہے۔ کوئی اسپرے کی ضرورت نہیں۔ ہر ہفتے پتوں کی جانچ جاری رکھیں۔",
    roman: "Fasal sehatmand hai. Koi spray ki zaroorat nahi. Har hafte patton ki jaanch jaari rakhein.",
  },
};

export function spokenResult(args: {
  lang: Lang;
  crop: string;
  disease: string;
  confidence: number;
  uncertain: boolean;
  className: string | null;
  organic?: string;
  chemical?: string;
}): string {
  const { lang, crop, disease, confidence, uncertain, className } = args;
  if (lang === "en") {
    if (uncertain) return "The model is not sure enough about this photo, so no crop or disease is named as a confident answer. Take a closer, well-lit photo of a single leaf.";
    return `${crop}, ${disease}, ${confidence} percent sure. ${args.organic ?? ""} ${args.chemical ?? ""}`.trim();
  }
  if (uncertain) {
    return lang === "ur"
      ? "ماڈل کو اس تصویر کے بارے میں یقین نہیں ہے، اس لیے کوئی فصل یا بیماری اعتماد سے نہیں بتائی جا رہی۔ ایک پتے کی قریبی، صاف تصویر دوبارہ لیں۔"
      : "Model ko is photo ke baare mein yaqeen nahi hai, is liye koi fasal ya bimari aitmaad se nahi batayi ja rahi. Aik patte ki qareebi, saaf photo dobara lein.";
  }
  const summary = className ? SUMMARIES[className] : undefined;
  const treatment = summary ? summary[lang] : "";
  if (lang === "ur") {
    return `آپ کی فصل ${crop} ہے، بیماری ${disease} ہے، ${confidence} فیصد یقین ہے۔ ${treatment}`;
  }
  return `Aap ki fasal ${crop} hai, bimari ${disease} hai, ${confidence} percent yaqeen hai. ${treatment}`;
}
