// Rule-based crop advice from weather. Conservative on purpose:
// every rule is a range, not an exact degree, so a 1°C difference
// from another weather source cannot flip the advice. Advice is
// guidance only — the page always ends with the note to confirm
// spraying decisions with a local agriculture officer.
//
// Thresholds (all documented here, in one place):
//   RAIN_HIGH 60%  — precipitation probability worth planning around
//   HUMID_HIGH 80% — with warm air, fungal/rust conditions
//   WARM 20°C      — warm enough for fungal spread with humidity
//   HEAT 38°C      — midday heat that stresses plants and sprays
//   WIND_HIGH 20 km/h — spray drift becomes a problem
//   FROST 2°C      — night minimum low enough to threaten young plants

export type WeatherCrop = "wheat" | "cotton" | "rice";

export const WEATHER_CROPS: WeatherCrop[] = ["wheat", "cotton", "rice"];

export interface WeatherSummary {
  // Current conditions.
  currentTemp: number;
  currentHumidity: number; // percent
  currentWind: number; // km/h
  currentPrecip: number; // mm
  // Daily forecast, 3 days: index 0 = today.
  dates: string[];
  tempMax: number[];
  tempMin: number[];
  precipProb: (number | null)[]; // percent, may be null for a day
  precipSum: number[]; // mm per day
}

export interface AdviceItem {
  kind: "do" | "dont";
  // i18n key for the text (translated in src/lib/i18n.ts).
  key: string;
}

const RAIN_HIGH = 60;
const HUMID_HIGH = 80;
const WARM = 20;
const HEAT = 38;
const WIND_HIGH = 20;
const FROST = 2;

const CROP_TIP_KEY: Record<WeatherCrop, string> = {
  // One always-on, crop-specific watch-out. These are general,
  // well-known agronomy facts, not a diagnosis of any field.
  wheat: "adv_crop_wheat",
  cotton: "adv_crop_cotton",
  rice: "adv_crop_rice",
};

/** Build the Do / Don't list for this weather and crop. */
export function buildAdvice(w: WeatherSummary, crop: WeatherCrop): AdviceItem[] {
  const items: AdviceItem[] = [];
  const prob = (i: number) => w.precipProb[i] ?? 0;

  // Rain expected in the next 24–48 h: spraying is wasted.
  if (prob(0) >= RAIN_HIGH || prob(1) >= RAIN_HIGH) {
    items.push({ kind: "dont", key: "adv_rain_dont" });
    items.push({ kind: "do", key: "adv_rain_do" });
  }

  // Humid and warm: fungal and rust conditions.
  if (w.currentHumidity >= HUMID_HIGH && w.currentTemp >= WARM) {
    items.push({ kind: "do", key: "adv_fungal_do" });
    items.push({ kind: "dont", key: "adv_fungal_dont" });
  }

  // Extreme heat: irrigate early, never spray at midday.
  if (w.tempMax[0] !== undefined && w.tempMax[0] >= HEAT) {
    items.push({ kind: "do", key: "adv_heat_do" });
    items.push({ kind: "dont", key: "adv_heat_dont" });
  }

  // Strong wind: spray drifts off the crop.
  if (w.currentWind > WIND_HIGH) {
    items.push({ kind: "dont", key: "adv_wind_dont" });
    items.push({ kind: "do", key: "adv_wind_do" });
  }

  // Frost risk tonight or tomorrow night: protect young plants.
  if ((w.tempMin[0] !== undefined && w.tempMin[0] <= FROST) || (w.tempMin[1] !== undefined && w.tempMin[1] <= FROST)) {
    items.push({ kind: "do", key: "adv_frost_do" });
    items.push({ kind: "dont", key: "adv_frost_dont" });
  }

  // Nothing fired: conditions look fair for normal field work.
  if (items.length === 0) {
    items.push({ kind: "do", key: "adv_fair_do" });
  }

  // The crop-specific watch-out always shows, after the weather rules.
  items.push({ kind: "do", key: CROP_TIP_KEY[crop] });

  return items;
}

/** Short word for a WMO weather code (i18n key). */
export function weatherCodeKey(code: number): string {
  if (code === 0 || code === 1) return "weather_clear";
  if (code === 2 || code === 3) return "weather_cloudy";
  if (code === 45 || code === 48) return "weather_fog";
  if (code >= 51 && code <= 67) return "weather_rain";
  if (code >= 71 && code <= 77) return "weather_snow";
  if (code >= 80 && code <= 82) return "weather_rain";
  if (code >= 85 && code <= 86) return "weather_snow";
  if (code >= 95) return "weather_storm";
  return "weather_cloudy";
}
