import { CropInfo } from "../types";

// v1 scope: only the crops covered by the delivered model
// (wheat, cotton, rice — 9 classes). Other crops are update 2.0.
// Common diseases below are exactly the v1 model classes for each crop.

export const CROPS_DATA: CropInfo[] = [
  {
    id: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    category: "Cereal",
    iconName: "Wheat",
    description: "Primary staple crop cultivated extensively across Punjab and Sindh flood plains.",
    commonDiseases: ["Diseased", "Healthy"],
    growthCycleDays: 120,
    optimalTemperature: "22°C - 32°C",
    waterRequirement: "High",
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    category: "Cereal",
    iconName: "Wheat",
    description: "Core food security cereal crop in Pakistan; grown in Rabi season across irrigated and rainfed zones.",
    commonDiseases: ["Brown Rust", "Yellow Rust", "Aphid", "Healthy"],
    growthCycleDays: 140,
    optimalTemperature: "15°C - 24°C",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cotton",
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    category: "Cash Crop",
    iconName: "Flower",
    description: "Major cash crop known as 'white gold', central to textile industrial exports.",
    commonDiseases: ["Aphids", "Army Worm", "Healthy"],
    growthCycleDays: 160,
    optimalTemperature: "26°C - 35°C",
    waterRequirement: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=800&q=80",
  },
];
