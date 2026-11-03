import { GlobalRegionStatistic } from "../types";

export const GLOBAL_REGIONS_DATA: GlobalRegionStatistic[] = [
  {
    id: "asia",
    region: "Asia",
    totalDiagnosesSample: 148500,
    primaryCropThreats: ["Rice Blast", "Bacterial Blight", "Cotton CLCuV", "Wheat Stripe Rust"],
    prevalentDiseases: [
      { disease: "Rice Brown Spot & Blast", crop: "Rice", rate: 34.2 },
      { disease: "Cotton Leaf Curl Virus", crop: "Cotton", rate: 26.5 },
      { disease: "Late Blight", crop: "Potato & Tomato", rate: 21.8 },
      { disease: "Wheat Stripe Rust", crop: "Wheat", rate: 17.5 },
    ],
    climateImpactIndex: 82,
    adoptionScore: 91,
  },
  {
    id: "europe",
    region: "Europe",
    totalDiagnosesSample: 96400,
    primaryCropThreats: ["Septoria Leaf Blotch", "Powdery Mildew", "Apple Scab", "Vine Downy Mildew"],
    prevalentDiseases: [
      { disease: "Septoria Tritici Blotch", crop: "Wheat", rate: 38.6 },
      { disease: "Apple Scab", crop: "Apple", rate: 24.3 },
      { disease: "Grapevine Downy Mildew", crop: "Grape", rate: 22.1 },
      { disease: "Barley Scald", crop: "Barley", rate: 15.0 },
    ],
    climateImpactIndex: 64,
    adoptionScore: 88,
  },
  {
    id: "africa",
    region: "Africa",
    totalDiagnosesSample: 82300,
    primaryCropThreats: ["Cassava Mosaic Disease", "Maize Lethal Necrosis", "Wheat Stem Rust (Ug99)"],
    prevalentDiseases: [
      { disease: "Cassava Mosaic Virus", crop: "Cassava", rate: 41.5 },
      { disease: "Maize Streak Virus", crop: "Maize", rate: 29.4 },
      { disease: "Coffee Rust (Hemileia)", crop: "Coffee", rate: 18.2 },
      { disease: "Banana Xanthomonas Wilt", crop: "Banana", rate: 10.9 },
    ],
    climateImpactIndex: 89,
    adoptionScore: 76,
  },
  {
    id: "north-america",
    region: "North America",
    totalDiagnosesSample: 112000,
    primaryCropThreats: ["Corn Tar Spot", "Soybean Sudden Death", "Citrus Greening", "Fire Blight"],
    prevalentDiseases: [
      { disease: "Corn Tar Spot", crop: "Corn", rate: 31.8 },
      { disease: "Soybean Cyst & Sudden Death", crop: "Soybean", rate: 28.4 },
      { disease: "Citrus Huanglongbing", crop: "Citrus", rate: 22.7 },
      { disease: "Apple Fire Blight", crop: "Apple", rate: 17.1 },
    ],
    climateImpactIndex: 58,
    adoptionScore: 94,
  },
  {
    id: "south-america",
    region: "South America",
    totalDiagnosesSample: 74200,
    primaryCropThreats: ["Soybean Asian Rust", "Coffee Leaf Rust", "Citrus Canker"],
    prevalentDiseases: [
      { disease: "Soybean Asian Rust", crop: "Soybean", rate: 44.2 },
      { disease: "Coffee Rust", crop: "Coffee", rate: 27.6 },
      { disease: "Sugarcane Smut", crop: "Sugarcane", rate: 16.5 },
      { disease: "Citrus Canker", crop: "Citrus", rate: 11.7 },
    ],
    climateImpactIndex: 77,
    adoptionScore: 83,
  },
  {
    id: "oceania",
    region: "Oceania",
    totalDiagnosesSample: 31800,
    primaryCropThreats: ["Wheat Stripe Rust", "Canola Blackleg", "Grape Powdery Mildew"],
    prevalentDiseases: [
      { disease: "Wheat Stripe Rust", crop: "Wheat", rate: 36.4 },
      { disease: "Canola Blackleg", crop: "Canola", rate: 32.1 },
      { disease: "Grape Powdery Mildew", crop: "Grape", rate: 19.5 },
      { disease: "Barley Net Blotch", crop: "Barley", rate: 12.0 },
    ],
    climateImpactIndex: 69,
    adoptionScore: 89,
  },
];

