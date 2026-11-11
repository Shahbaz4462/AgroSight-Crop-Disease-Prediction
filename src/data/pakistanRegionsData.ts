// Disease-map data for the six provinces of Pakistan.
//
// EVERY number here is real and sourced — institution + document +
// date/year. There is no "totalDiagnoses" and no healthy/diseased split:
// AgroSight scans run client-side in the browser and no scan data is ever
// collected, so no institution (and no AgroSight record) can supply those
// figures. They were invented numbers and have been removed, not replaced.
// Disease lists are ranked by documented importance (no percentages — no
// source publishes province-level disease-share percentages).
// Cropped-area shares: Pakistan Bureau of Statistics, 7th Agriculture
// Census 2024, Table 4.3 (national total 82,771,463 acres). GB and AJK are
// not covered by the census or by MNFSR publications, so they carry no
// cropped-area figure. Verified Nov 2026.

import { ProvinceStatistic } from "../types";

export const PAKISTAN_REGIONS_DATA: ProvinceStatistic[] = [
  {
    id: "punjab",
    name: "Punjab",
    urduName: "پنجاب",
    capital: "Lahore",
    urduCapital: "لاہور",
    majorCrops: ["Wheat", "Cotton", "Rice", "Sugarcane", "Potato", "Citrus (Kinnow)", "Maize"],
    topDiseases: [
      {
        name: "Wheat stripe (yellow) rust",
        source: "CIMMYT — Nationwide assessment of wheat diseases and pests in Pakistan, expert elicitation 2018–2022",
      },
      {
        name: "Wheat leaf (brown) rust",
        source: "CIMMYT — Nationwide assessment of wheat diseases and pests in Pakistan, expert elicitation 2018–2022",
      },
      {
        name: "Cotton leaf curl virus (CLCuV)",
        source: "Central Cotton Research Institute Multan, Plant Pathology Section; Dawn, 11 Feb 2002",
      },
      {
        name: "Rice bacterial leaf blight",
        source: "CDRI/PARC survey 2019–20 (Shahzad Asad) — Gujranwala 55%, Hafizabad 36%, Sialkot 29%",
      },
      {
        name: "Potato early blight",
        source: "Journal of Animal & Plant Sciences, 2026 — GIS study, 40 sites, Multan/Khanewal/Sahiwal/Okara",
      },
    ],
    keyFacts: [
      { labelKey: "fact_cropped_share", value: "60.1%" },
      { labelKey: "fact_wheat_share", value: "77%" },
      { labelKey: "fact_cropped_area", value: "49.7M acres" },
    ],
    riskLevel: "High",
    currentAlert: {
      text: "Cotton pink bollworm — 2nd pest alert",
      textUr: "کپاس کا گلابی سنڈی — دوسرا کیڑوں کا انتباہ",
      textRoman: "Kapas ka gulabi sundi — dusra keeron ka intebah",
      source: "Punjab Agriculture Dept, Pest Warning & Quality Control of Pesticides, letter No. 3927-83, 18 Aug 2026",
    },
    sources:
      "Pakistan Bureau of Statistics, 7th Agriculture Census 2024, Table 4.3; USDA Foreign Agricultural Service, IPAD Wheat Explorer, 2023 Rabi (updated 16 Jan 2026); CIMMYT nationwide wheat disease assessment, expert elicitation 2018–2022; Central Cotton Research Institute Multan; CDRI/PARC survey 2019–20; Journal of Animal & Plant Sciences, 2026; Punjab Agriculture Dept, Pest Warning alerts 2025–26",
    lastUpdated: "Nov 2026",
  },
  {
    id: "sindh",
    name: "Sindh",
    urduName: "سندھ",
    capital: "Karachi",
    urduCapital: "کراچی",
    majorCrops: ["Cotton", "Rice", "Sugarcane", "Wheat", "Mango", "Banana"],
    topDiseases: [
      {
        name: "Banana Panama wilt (Fusarium TR4)",
        source: "Dawn, 10 Nov 2025; PARC molecular identification (Thatta, Tando Allahyar, Mirpurkhas, Hyderabad, Sanghar)",
      },
      {
        name: "Rice bacterial leaf blight",
        source: "CDRI/PARC survey 2019–20 (Shahzad Asad)",
      },
      {
        name: "Rice blast / brown spot",
        source: "Dawn, 29 Oct 2001; IRRI Rice Knowledge Bank",
      },
      {
        name: "Wheat leaf rust",
        source: "CIMMYT — Nationwide assessment of wheat diseases and pests in Pakistan, expert elicitation 2018–2022",
      },
      {
        name: "Mango malformation & sudden death",
        source: "Dawn, 22 June 2026; CDRI (Shahzad Asad)",
      },
    ],
    keyFacts: [
      { labelKey: "fact_cropped_share", value: "15.8%" },
      { labelKey: "fact_rice_share", value: "35–40%" },
      { labelKey: "fact_cropped_area", value: "13.1M acres" },
    ],
    riskLevel: "High",
    currentAlert: {
      text: "Banana Panama wilt (TR4) outbreak — Tando Allahyar",
      textUr: "کیلے کی پاناما مرجھاؤ (TR4) کی وبا — ٹنڈو الہ یار",
      textRoman: "Kelay ki Panama murjhao (TR4) ki waba — Tando Allahyar",
      source: "Dawn, 10 Nov 2025; PARC confirmed",
    },
    sources:
      "Pakistan Bureau of Statistics, 7th Agriculture Census 2024, Table 4.3; Dawn, 22 June 2026 (Sindh budget speech); Dawn, 10 Nov 2025; PARC; CDRI/PARC survey 2019–20; CIMMYT assessment 2018–2022; IRRI Rice Knowledge Bank",
    lastUpdated: "Nov 2026",
  },
  {
    id: "kpk",
    name: "Khyber Pakhtunkhwa (KPK)",
    urduName: "خیبر پختونخوا",
    capital: "Peshawar",
    urduCapital: "پشاور",
    majorCrops: ["Maize", "Wheat", "Tobacco", "Sugarcane", "Peach", "Apple"],
    topDiseases: [
      {
        name: "Wheat stripe (yellow) rust",
        source: "Khyber Pakhtunkhwa Agriculture Dept wheat disease chart, reported PakEra, 20 Oct 2026; CIMMYT assessment 2018–2022",
      },
      {
        name: "Wheat leaf (brown) rust & stem (black) rust",
        source: "Khyber Pakhtunkhwa Agriculture Dept wheat disease chart, reported PakEra, 20 Oct 2026; CIMMYT assessment 2018–2022",
      },
      {
        name: "Maize southern leaf blight & Alternaria leaf blight",
        source: "Acta Scientific Agriculture 5(8), Aug 2021 — Havelian, Abbottabad survey",
      },
      {
        name: "Wheat Fusarium head blight",
        source: "CIMMYT — Nationwide assessment of wheat diseases and pests in Pakistan, expert elicitation 2018–2022",
      },
      {
        name: "Wheat Karnal bunt",
        source: "CIMMYT — Nationwide assessment of wheat diseases and pests in Pakistan, expert elicitation 2018–2022",
      },
    ],
    keyFacts: [
      { labelKey: "fact_cropped_share", value: "12.7%" },
      { labelKey: "fact_cropped_area", value: "10.5M acres" },
      { labelKey: "fact_maize_yield", value: "1.92 t/ha" },
    ],
    riskLevel: "Medium",
    currentAlert: {
      text: "Wheat rust awareness field visits — Swabi",
      textUr: "گندم کی زنگ سے آگاہی کے لیے کھیتوں کے دورے — صوابی",
      textRoman: "Gandum ki zang se agahi ke liye kheiton ke doray — Swabi",
      source: "Agriculture Department Khyber Pakhtunkhwa, 9 & 25 Mar 2026",
    },
    sources:
      "Pakistan Bureau of Statistics, 7th Agriculture Census 2024, Table 4.3; PARC via Hussain et al. 2023, Future Outlook of Maize Sector in Pakistan; Khyber Pakhtunkhwa Agriculture Dept chart, Oct 2026; CIMMYT assessment 2018–2022; Acta Scientific Agriculture, Aug 2021",
    lastUpdated: "Nov 2026",
  },
  {
    id: "balochistan",
    name: "Balochistan",
    urduName: "بلوچستان",
    capital: "Quetta",
    urduCapital: "کوئٹہ",
    majorCrops: ["Apple", "Grape", "Pomegranate", "Dates", "Almond", "Wheat"],
    topDiseases: [
      {
        name: "Apple fire blight",
        source: "Balochistan Agriculture College Quetta survey, published 30 Apr 2025 — incidence 12.33–18.75%",
      },
      {
        name: "Apple scab",
        source: "AGES Austria, Apple scab profile, updated 11 Apr 2023; Pakistan J. Agricultural Research 35(3), Sept 2022 (Balochistan 34% of national apples)",
      },
      {
        name: "Wheat rusts (stripe/leaf/stem)",
        source: "Bux et al., 2012, cited in Preprints.org review, 2026",
      },
      {
        name: "Grape powdery & downy mildew",
        source: "Punjab Agricultural University, Ludhiana, plant pathology syllabus; Pakistan J. Agricultural Research 35(3), Sept 2022 (Balochistan 90% of national grapes)",
      },
    ],
    keyFacts: [
      { labelKey: "fact_cropped_share", value: "11.3%" },
      { labelKey: "fact_grape_share", value: "90%" },
      { labelKey: "fact_cropped_area", value: "9.4M acres" },
    ],
    riskLevel: "Medium",
    sources:
      "Pakistan Bureau of Statistics, 7th Agriculture Census 2024, Table 4.3; Pakistan Journal of Agricultural Research 35(3), Sept 2022; Balochistan Agriculture College Quetta survey, 30 Apr 2025; AGES Austria, 2023; Bux et al., 2012",
    lastUpdated: "Nov 2026",
  },
  {
    id: "gilgit-baltistan",
    name: "Gilgit-Baltistan (GB)",
    urduName: "گلگت بلتستان",
    capital: "Gilgit",
    urduCapital: "گلگت",
    majorCrops: ["Cherry", "Apricot", "Walnut", "Apple", "Potato", "Wheat", "Maize"],
    topDiseases: [
      {
        name: "Apricot shot-hole disease",
        source: "Azhar et al., 2023; Muhammad et al., 2022 — prevalence over 70% in GB apricot valleys",
      },
      {
        name: "Cherry shot-hole disease",
        source: "Prevalence and Characteristics of Cherry Shot-Hole Disease in Gilgit-Baltistan (ResearchGate)",
      },
      {
        name: "Potato black scurf",
        source: "Hussain et al., Phytopathogenomics and Disease Control 4(2): 187–193, 2025 (Karakoram International University, Gilgit)",
      },
      {
        name: "Potato early blight",
        source: "Karakoram International University, Gilgit — early blight prevalence study, nine valleys",
      },
      {
        name: "Potato late blight",
        source: "GB disease inventory (ResearchGate, cherry shot-hole paper)",
      },
    ],
    keyFacts: [
      { labelKey: "fact_potato_area", value: "8,526 ha" },
      { labelKey: "fact_potato_output", value: "134,031 t" },
      { labelKey: "fact_fruit_output_2014", value: "149,769 t" },
    ],
    riskLevel: "Medium",
    sources:
      "Hussain et al., Phytopathogenomics and Disease Control 4(2), 2025 (Karakoram International University, Gilgit); Azhar et al., 2023; Khan 2016, cited in IJRISS, Apr 2020 (2014 fruit data); GB disease inventory (ResearchGate). GB is not covered by the PBS Agriculture Census or MNFSR statistics, so no cropped-area share is shown.",
    lastUpdated: "Nov 2026",
  },
  {
    id: "ajk",
    name: "Azad Jammu & Kashmir (AJK)",
    urduName: "آزاد جموں و کشمیر",
    capital: "Muzaffarabad",
    urduCapital: "مظفرآباد",
    majorCrops: ["Maize", "Wheat", "Walnut", "Apple", "Barley", "Millet", "Vegetables"],
    topDiseases: [
      {
        name: "Wheat Fusarium head blight",
        source: "Hussain et al., Journal of Plant & Environment 06(01): 27–40, 2024 (Mirpur University of Science & Technology, AJK)",
      },
      {
        name: "Wheat Alternaria leaf blight / spot blotch",
        source: "Hussain et al., Journal of Plant & Environment 06(01): 27–40, 2024 (Mirpur University of Science & Technology, AJK)",
      },
      {
        name: "Wheat stem rust & loose smut",
        source: "Hussain et al., Journal of Plant & Environment 06(01): 27–40, 2024 (Mirpur University of Science & Technology, AJK)",
      },
    ],
    keyFacts: [
      { labelKey: "fact_fhb_infection", value: "57.1%" },
      { labelKey: "fact_fhb_severity", value: "up to 80%" },
    ],
    riskLevel: "Medium",
    sources:
      "Hussain et al., Journal of Plant & Environment 06(01): 27–40, 2024 (Mirpur University of Science & Technology, AJK) — single-district study, Bhimber; limited evidence. AJK is not covered by the PBS Agriculture Census or MNFSR statistics, so no cropped-area share is shown.",
    lastUpdated: "Nov 2026",
  },
];
