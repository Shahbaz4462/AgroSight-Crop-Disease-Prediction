// Global disease-map data for the six world regions.
//
// EVERY figure here is real and sourced — institution + document +
// date/year. The old file's numbers were invented: there is no
// "totalDiagnosesSample" (no institution publishes regional diagnosis
// counts), no disease-share percentages, no climate-impact index and no
// adoption score. All of those have been removed, not replaced. Disease
// lists are ranked by documented importance (no rates). Each region
// carries one real published headline figure instead of an invented
// count. Verified Nov 2026.

import { GlobalRegionStatistic } from "../types";

export const GLOBAL_REGIONS_DATA: GlobalRegionStatistic[] = [
  {
    id: "asia",
    region: "Asia",
    headlineStat: {
      value: "60M",
      label: "people who could be fed by the rice lost to rice blast each year",
      source: "IRRI — Rice Today, 2026 (IRRI/Bangladesh Rice Research Institute/UPLB study, The Plant Genome, 2026)",
    },
    primaryCropThreats: ["Rice Blast", "Cotton Leaf Curl Disease", "Wheat Stripe Rust", "Potato Late Blight"],
    prevalentDiseases: [
      {
        disease: "Rice blast",
        crop: "Rice",
        source: "CABI Plantwise Knowledge Bank — Paddy Blast factsheet, 2015",
      },
      {
        disease: "Rice brown spot",
        crop: "Rice",
        source: "IRRI Rice Knowledge Bank — Brown spot factsheet",
      },
      {
        disease: "Cotton leaf curl disease",
        crop: "Cotton",
        source: "Punjab Agricultural University / ICAC, 2024",
      },
      {
        disease: "Wheat stripe rust",
        crop: "Wheat",
        source: "FAO feature story, 12 May 2025",
      },
    ],
    sources:
      "CABI Plantwise Knowledge Bank, 2015; IRRI Rice Knowledge Bank; Punjab Agricultural University / ICAC, 2024; FAO, 12 May 2025; IRRI Rice Today, 2026",
    lastUpdated: "Nov 2026",
  },
  {
    id: "europe",
    region: "Europe",
    headlineStat: {
      value: "€1bn",
      label: "spent on fungicides for Septoria tritici blotch in Europe each year",
      source: "Frontiers in Plant Science, 2016 (via FAO AGRIS)",
    },
    primaryCropThreats: ["Septoria Tritici Blotch", "Wheat Stripe Rust", "Potato Late Blight", "Grapevine Downy Mildew"],
    prevalentDiseases: [
      {
        disease: "Septoria tritici blotch",
        crop: "Wheat",
        source: "American Phytopathological Society, The Plant Health Instructor, 2011",
      },
      {
        disease: "Apple scab",
        crop: "Apple",
        source: "Austrian Agency for Health and Food Safety (AGES), updated 11 Apr 2023",
      },
      {
        disease: "Grapevine downy mildew",
        crop: "Grapevine",
        source: "Frontiers in Microbiology, 2022 (Koledenkova et al.)",
      },
      {
        disease: "Barley scald",
        crop: "Barley",
        source: "Heliyon, 2023",
      },
    ],
    sources:
      "American Phytopathological Society, 2011; AGES Austria, 2023; Frontiers in Microbiology, 2022; Heliyon, 2023; Frontiers in Plant Science, 2016; GRDC GroundCover, 2025",
    lastUpdated: "Nov 2026",
  },
  {
    id: "africa",
    region: "Africa",
    headlineStat: {
      value: "$1.2–2.3bn",
      label: "lost each year to cassava mosaic disease across sub-Saharan Africa",
      source: "CABI Crop Protection Compendium, cited 19 Apr 2024 (also FAO, 2007)",
    },
    primaryCropThreats: ["Cassava Mosaic Disease", "Cassava Brown Streak Disease", "Maize Streak Virus", "Wheat Stem Rust (Ug99)"],
    prevalentDiseases: [
      {
        disease: "Cassava mosaic disease",
        crop: "Cassava",
        source: "CABI Crop Protection Compendium / FAO, cited 19 Apr 2024",
      },
      {
        disease: "Maize streak virus",
        crop: "Maize",
        source: "Frontiers in Plant Science, 3 June 2025 (Mushayi et al.)",
      },
      {
        disease: "Coffee leaf rust",
        crop: "Coffee",
        source: "FAO — Effects of climate change on plant pests",
      },
      {
        disease: "Banana Xanthomonas wilt",
        crop: "Banana",
        source: "FAO diagnostic survey, Tanzania/Uganda, 2009",
      },
    ],
    sources:
      "CABI Crop Protection Compendium, 2024; FAO, 2007/2009; Frontiers in Plant Science, 2025",
    lastUpdated: "Nov 2026",
  },
  {
    id: "north-america",
    region: "North America",
    headlineStat: {
      value: "1.3bn",
      label: "bushels of US corn lost to disease in 2025 (7.0% of yield)",
      source: "Crop Protection Network — Corn Disease Loss Estimates, 2025",
    },
    primaryCropThreats: ["Corn Tar Spot", "Corn Southern Rust", "Soybean Cyst Nematode", "Citrus Greening"],
    prevalentDiseases: [
      {
        disease: "Corn tar spot",
        crop: "Corn",
        source: "Crop Protection Network, 2025",
      },
      {
        disease: "Soybean cyst nematode & sudden death syndrome",
        crop: "Soybean",
        source: "Crop Protection Network, 2024 (published 14 Mar 2025)",
      },
      {
        disease: "Citrus Huanglongbing (citrus greening)",
        crop: "Citrus",
        source: "USDA Animal and Plant Health Inspection Service, 2022",
      },
      {
        disease: "Apple fire blight",
        crop: "Apple",
        source: "Cornell University IPM, updated 2024",
      },
    ],
    sources:
      "Crop Protection Network, 2025; Crop Protection Network, 2024; USDA Animal and Plant Health Inspection Service, 2022; Cornell University IPM, 2024",
    lastUpdated: "Nov 2026",
  },
  {
    id: "south-america",
    region: "South America",
    headlineStat: {
      value: "$2.2bn",
      label: "lost by Brazil to Asian soybean rust in the 2013–14 season alone",
      source: "Godoy et al., 2016 (via SciELO systematic review, 2025)",
    },
    primaryCropThreats: ["Soybean Asian Rust", "Coffee Leaf Rust", "Sugarcane Smut", "Citrus Canker"],
    prevalentDiseases: [
      {
        disease: "Asian soybean rust",
        crop: "Soybean",
        source: "Godoy et al., 2016 (via SciELO systematic review, 2025)",
      },
      {
        disease: "Coffee leaf rust",
        crop: "Coffee",
        source: "Zambolim, Tropical Plant Pathology, 2016; FAO case studies",
      },
      {
        disease: "Sugarcane smut",
        crop: "Sugarcane",
        source: "Scientific Reports, 2016 (Su et al.)",
      },
      {
        disease: "Citrus canker",
        crop: "Citrus",
        source: "American Phytopathological Society, PhytoFrontiers; MDPI Agronomy, 2023",
      },
    ],
    sources:
      "Godoy et al., 2016; Zambolim, Tropical Plant Pathology, 2016; Scientific Reports, 2016; American Phytopathological Society, PhytoFrontiers; MDPI Agronomy, 2023",
    lastUpdated: "Nov 2026",
  },
  {
    id: "oceania",
    region: "Oceania",
    headlineStat: {
      value: "AU$120M",
      label: "lost by Australian growers to wheat stripe rust each year (+ AU$150M in control)",
      source: "GRDC GroundCover, 2025",
    },
    primaryCropThreats: ["Wheat Stripe Rust", "Canola Blackleg", "Barley Spot-Form Net Blotch", "Grapevine Downy Mildew"],
    prevalentDiseases: [
      {
        disease: "Wheat stripe rust",
        crop: "Wheat",
        source: "GRDC GroundCover, 2025",
      },
      {
        disease: "Canola blackleg",
        crop: "Canola",
        source: "GRDC — Fungicide Resistance Management in Australian Grain Crops, Jan 2026",
      },
      {
        disease: "Grape powdery mildew",
        crop: "Grapevine",
        source: "Australian Wine Research Institute eBulletin, 24 Oct 2025",
      },
      {
        disease: "Barley net blotch",
        crop: "Barley",
        source: "Curtin University / Australian Centre for Necrotrophic Fungal Pathogens",
      },
    ],
    sources:
      "GRDC GroundCover, 2025; GRDC guide, Jan 2026; Australian Wine Research Institute eBulletin, 24 Oct 2025; Curtin University / Australian Centre for Necrotrophic Fungal Pathogens",
    lastUpdated: "Nov 2026",
  },
];
