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
 
  cotton_bacterial_blight: {
    ur: "بیکٹیریل بلائٹ کے لیے لیبل کے مطابق کاپر آکسی کلورائیڈ استعمال کریں، اور متاثرہ پتے ہٹا دیں۔",
    roman: "Bacterial blight ke liye label ke mutabiq copper oxychloride istemal karein, aur mutasira patte hata dein.",
  },
  cotton_powdery_mildew: {
    ur: "پاؤڈری ملڈیو کے لیے لیبل کے مطابق سلفر یا ہیکساکونازول استعمال کریں، اور ہوا کی گزر بہتر کریں۔",
    roman: "Powdery mildew ke liye label ke mutabiq sulphur ya hexaconazole istemal karein, aur hawa ki guzar behtar karein.",
  },
  cotton_target_spot: {
    ur: "ٹارگٹ اسپاٹ کے لیے لیبل کے مطابق ایزوکسٹروبن پلس ڈائفینوکونازول یا مینکوزیب استعمال کریں۔",
    roman: "Target spot ke liye label ke mutabiq azoxystrobin plus difenoconazole ya mancozeb istemal karein.",
  },
  wheat_black_rust: {
    ur: "بلیک رسٹ کے لیے لیبل کے مطابق پروپیکونازول یا ٹیبوکونازول فنجیسائیڈ استعمال کریں۔",
    roman: "Black rust ke liye label ke mutabiq propiconazole ya tebuconazole fungicide istemal karein.",
  },
  wheat_blast: {
    ur: "بلاسٹ کی صحیح وجہ معلوم کیے بغیر کوئی مخصوص دوا نہ لگائیں۔ مقامی زرعی افسر سے تصدیق کریں۔",
    roman: "Blast ki sahi wajah maloom kiye baghair koi makhsoos dawa na lagayein. Maqami zarae afsar se tasdeeq karein.",
  },
  wheat_common_root_rot: {
    ur: "روٹ روٹ کے لیے کاشت سے پہلے بیج پر لیبل کے مطابق ٹیبوکونازول یا کاربوکسن پلس تھیرام لگائیں۔ پتوں پر اسپرے سے فائدہ نہیں ہوگا۔",
    roman: "Root rot ke liye kasht se pehle beej par label ke mutabiq tebuconazole ya carboxin plus thiram lagayein. Patton par spray se faida nahi hoga.",
  },
  wheat_fusarium_head_blight: {
    ur: "فیوزیریم ہیڈ بلائٹ کے لیے پھول آنے کے وقت لیبل کے مطابق پروتھیوکونازول پلس ٹیبوکونازول اسپرے کریں۔",
    roman: "Fusarium head blight ke liye phool aane ke waqt label ke mutabiq prothioconazole plus tebuconazole spray karein.",
  },
  wheat_leaf_blight: {
    ur: "لیف بلائٹ کے لیے لیبل کے مطابق پروپیکونازول یا مینکوزیب استعمال کریں، اور صاف بیج لگائیں۔",
    roman: "Leaf blight ke liye label ke mutabiq propiconazole ya mancozeb istemal karein, aur saaf beej lagayein.",
  },
  wheat_mildew: {
    ur: "ملڈیو کے لیے لیبل کے مطابق پروپیکونازول یا سلفر استعمال کریں۔",
    roman: "Mildew ke liye label ke mutabiq propiconazole ya sulphur istemal karein.",
  },
  wheat_mite: {
    ur: "مائٹ کے لیے لیبل کے مطابق ایبامیکٹن یا نیم کا تیل استعمال کریں، پتوں کے نیچے اسپرے کریں۔",
    roman: "Mite ke liye label ke mutabiq abamectin ya neem ka tail istemal karein, patton ke neeche spray karein.",
  },
  wheat_septoria: {
    ur: "سیپٹوریا کی صحیح وجہ معلوم کیے بغیر کوئی مخصوص دوا نہ لگائیں۔ مقامی زرعی افسر سے تصدیق کریں۔",
    roman: "Septoria ki sahi wajah maloom kiye baghair koi makhsoos dawa na lagayein. Maqami zarae afsar se tasdeeq karein.",
  },
  wheat_smut: {
    ur: "سمٹ کے لیے کاشت سے پہلے بیج پر لیبل کے مطابق کاربوکسن یا ٹیبوکونازول لگائیں۔ پتوں پر اسپرے سے فائدہ نہیں ہوگا۔",
    roman: "Smut ke liye kasht se pehle beej par label ke mutabiq carboxin ya tebuconazole lagayein. Patton par spray se faida nahi hoga.",
  },
  wheat_stem_fly: {
    ur: "سٹیم فلائی کا صحیح کیڑا معلوم کیے بغیر کوئی مخصوص دوا نہ لگائیں۔ مقامی زرعی افسر سے تصدیق کریں۔",
    roman: "Stem fly ka sahi keera maloom kiye baghair koi makhsoos dawa na lagayein. Maqami zarae afsar se tasdeeq karein.",
  },
  wheat_tan_spot: {
    ur: "ٹین اسپاٹ کے لیے لیبل کے مطابق پروپیکونازول یا ایزوکسٹروبن پلس ڈائفینوکونازول استعمال کریں، اور سب سے اوپر والے پتے کو بچائیں۔",
    roman: "Tan spot ke liye label ke mutabiq propiconazole ya azoxystrobin plus difenoconazole istemal karein, aur sab se oopar wale patte ko bachayein.",
  },
};

// Short spoken summary for a disease family, used only when an
// uncertain scan's top two guesses fall in the same family. The
// family name stays in English (disease names always do); the rest
// is in the selected language. No chemical is ever named for a
// family — the exact disease is still uncertain.
const FAMILY_SUMMARIES: Record<string, { en: string; ur: string; roman: string }> = {
  wheat_leaf_spot: {
    en: "The leaf most likely has a wheat leaf spot disease — tan spot, leaf blight or septoria. Remove affected leaves, keep leaves dry when watering, and confirm the exact disease with a local agriculture officer before spraying.",
    ur: "پتے پر غالباً گندم کی پتوں کے دھبوں والی بیماری ہے — ٹین اسپاٹ، لیف بلائٹ یا سیپٹوریا۔ متاثرہ پتے ہٹا دیں، پانی دیتے وقت پتے گیلے نہ کریں، اور اسپرے سے پہلے مقامی زرعی افسر سے صحیح بیماری کی تصدیق کریں۔",
    roman: "Patte par ghaliban gandum ki patton ke dhabbon wali bimari hai — tan spot, leaf blight ya septoria. Mutasira patte hata dein, pani dete waqt patte geele na karein, aur spray se pehle maqami zarae afsar se sahi bimari ki tasdeeq karein.",
  },
  wheat_rust: {
    en: "The leaf most likely has wheat rust — brown rust, yellow rust or black rust. Remove heavily infected leaves, improve airflow, and confirm the exact rust with a local agriculture officer before spraying.",
    ur: "پتے پر غالباً گندم کا رسٹ ہے — براؤن رسٹ، یلو رسٹ یا بلیک رسٹ۔ شدید متاثرہ پتے ہٹا دیں، ہوا کی گزر بہتر کریں، اور اسپرے سے پہلے مقامی زرعی افسر سے صحیح رسٹ کی تصدیق کریں۔",
    roman: "Patte par ghaliban gandum ka rust hai — brown rust, yellow rust ya black rust. Shadeed mutasira patte hata dein, hawa ki guzar behtar karein, aur spray se pehle maqami zarae afsar se sahi rust ki tasdeeq karein.",
  },
  cotton_spot: {
    en: "The leaf most likely has a cotton leaf spot disease — bacterial blight, target spot or powdery mildew. Remove affected leaves, keep leaves dry when watering, and confirm the exact disease with a local agriculture officer before spraying, because these need different treatment.",
    ur: "پتے پر غالباً کپاس کے پتوں کے دھبوں والی بیماری ہے — بیکٹیریل بلائٹ، ٹارگٹ اسپاٹ یا پاؤڈری ملڈیو۔ متاثرہ پتے ہٹا دیں، پانی دیتے وقت پتے گیلے نہ کریں، اور اسپرے سے پہلے مقامی زرعی افسر سے صحیح بیماری کی تصدیق کریں، کیونکہ ان کا علاج الگ ہے۔",
    roman: "Patte par ghaliban kapas ke patton ke dhabbon wali bimari hai — bacterial blight, target spot ya powdery mildew. Mutasira patte hata dein, pani dete waqt patte geele na karein, aur spray se pehle maqami zarae afsar se sahi bimari ki tasdeeq karein, kyunke in ka ilaaj alag hai.",
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
  familyId?: string | null;
}): string {
  const { lang, crop, disease, confidence, uncertain, className } = args;
  if (lang === "en") {
    if (uncertain) {
      const fam = args.familyId ? FAMILY_SUMMARIES[args.familyId] : undefined;
      if (fam) return fam.en;
      return "The model is not sure enough about this photo, so no crop or disease is named as a confident answer. Take a closer, well-lit photo of a single leaf.";
    }
    return `${crop}, ${disease}, ${confidence} percent sure. ${args.organic ?? ""} ${args.chemical ?? ""}`.trim();
  }
  if (uncertain) {
    const fam = args.familyId ? FAMILY_SUMMARIES[args.familyId] : undefined;
    if (fam) return fam[lang];
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
