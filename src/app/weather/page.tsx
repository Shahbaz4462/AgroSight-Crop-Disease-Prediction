"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Droplets, LocateFixed, MapPin, RefreshCw, Search, Thermometer, Umbrella, Wind, X } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { useApp } from "../../context/AppContext";
import { buildAdvice, weatherCodeKey, WEATHER_CROPS, type WeatherCrop, type WeatherSummary } from "../../lib/weatherAdvice";

// Weather comes from Open-Meteo: free, no API key, browser fetch
// works (CORS enabled). The forecast is never exact, and a 1°C
// difference from another source does not change the advice,
// because every rule is a range. The source and fetch time are
// always shown under the weather.
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
// Free reverse geocoding, no API key, browser fetch works (CORS
// enabled). Turns GPS coordinates into the nearest named place
// (city / locality), so "Use my location" shows which place the
// weather is actually for instead of just "My location".
const REVERSE_GEOCODE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const SAVED_LOCATION_KEY = "agrosight-weather-location";

const CROP_NAMES: Record<WeatherCrop, string> = {
  // Crop names stay in English in every language, like everywhere
  // else on the site, so a farmer can ask for the same name at a shop.
  wheat: "Wheat",
  cotton: "Cotton",
  rice: "Rice",
};

const DAY_LABEL_KEYS = ["weather_today", "weather_tomorrow", "weather_day_after"];

interface SavedLocation {
  name: string;
  lat: number;
  lon: number;
  // True when the location came from the phone's GPS. GPS places
  // need a reverse-geocode lookup to get a real place name.
  gps?: boolean;
}

interface ForecastResponse {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: (number | null)[];
    precipitation_sum?: number[];
  };
}

interface GeocodingResult {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

function formatDay(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

export default function WeatherPage() {
  const { t } = useApp();
  const [location, setLocation] = useState<SavedLocation | null>(null);
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locStatus, setLocStatus] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [crop, setCrop] = useState<WeatherCrop>("wheat");
  const searchSeq = useRef(0);

  const fetchWeather = useCallback(async (loc: SavedLocation) => {
    setLoading(true);
    setError(null);
    try {
      const url =
        `${FORECAST_URL}?latitude=${loc.lat}&longitude=${loc.lon}` +
        "&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m" +
        "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum" +
        "&forecast_days=3&timezone=auto";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ForecastResponse;
      if (!data.current || !data.daily) throw new Error("Incomplete forecast");
      setWeather({
        currentTemp: data.current.temperature_2m ?? 0,
        currentHumidity: data.current.relative_humidity_2m ?? 0,
        currentWind: data.current.wind_speed_10m ?? 0,
        currentPrecip: data.current.precipitation ?? 0,
        dates: data.daily.time ?? [],
        tempMax: data.daily.temperature_2m_max ?? [],
        tempMin: data.daily.temperature_2m_min ?? [],
        precipProb: data.daily.precipitation_probability_max ?? [],
        precipSum: data.daily.precipitation_sum ?? [],
      });
      setWeatherCode(data.current.weather_code ?? 0);
      setUpdatedAt(new Date());
    } catch {
      // Never a blank page: a failed fetch shows a clear message
      // and a retry button instead.
      setError(t("weather_error"));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const chooseLocation = useCallback((loc: SavedLocation) => {
    setLocation(loc);
    setPlaces([]);
    setQuery("");
    setLocStatus(null);
    try {
      localStorage.setItem(SAVED_LOCATION_KEY, JSON.stringify(loc));
    } catch {
      // Ignore: saving is a convenience, not required.
    }
    void fetchWeather(loc);
  }, [fetchWeather]);

  // Nearest named place for GPS coordinates ("Lahore, Punjab,
  // Pakistan"). Returns null when the lookup fails, so the caller
  // can fall back to the generic name plus coordinates.
  const resolvePlaceName = useCallback(async (lat: number, lon: number): Promise<string | null> => {
    try {
      const res = await fetch(
        `${REVERSE_GEOCODE_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      );
      if (!res.ok) return null;
      const data = (await res.json()) as {
        city?: string;
        locality?: string;
        principalSubdivision?: string;
        countryName?: string;
      };
      const place = data.city || data.locality || "";
      const region = [data.principalSubdivision, data.countryName].filter(Boolean).join(", ");
      const full = [place, region].filter(Boolean).join(", ");
      return full || null;
    } catch {
      return null;
    }
  }, []);

  // Reopen the page with the last location: show its weather at once.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_LOCATION_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedLocation;
      if (typeof saved.lat === "number" && typeof saved.lon === "number" && typeof saved.name === "string") {
        setLocation(saved);
        void fetchWeather(saved);
        // A GPS location saved before place names existed only says
        // "My location": resolve its real nearest place in the
        // background and update the name when it arrives.
        if (saved.gps) {
          void resolvePlaceName(saved.lat, saved.lon).then((name) => {
            if (!name) return;
            setLocation((prev) => {
              if (!prev || prev.lat !== saved.lat || prev.lon !== saved.lon) return prev;
              const next = { ...prev, name };
              try {
                localStorage.setItem(SAVED_LOCATION_KEY, JSON.stringify(next));
              } catch {
                // Ignore.
              }
              return next;
            });
          });
        }
      }
    } catch {
      // Ignore a bad saved value.
    }
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // City search, debounced. Pakistani places first: the API has no
  // country filter, so results are filtered here.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setPlaces([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const seq = ++searchSeq.current;
    const timer = window.setTimeout(() => {
      void fetch(`${GEOCODING_URL}?name=${encodeURIComponent(q)}&count=5&language=en&format=json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((data: { results?: GeocodingResult[] }) => {
          if (seq !== searchSeq.current) return; // a newer search started
          const all = data.results ?? [];
          const pk = all.filter((r) => r.country === "Pakistan");
          setPlaces(pk.length > 0 ? pk : all);
        })
        .catch(() => {
          if (seq === searchSeq.current) setPlaces([]);
        })
        .finally(() => {
          if (seq === searchSeq.current) setSearching(false);
        });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [query]);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocStatus(t("weather_loc_unsupported"));
      return;
    }
    setLocStatus(t("weather_locating"));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        // Find the nearest named place first, so the page says
        // which place the weather is for. Weather loads at once
        // with the generic name if the lookup is slow or fails.
        setLocStatus(t("weather_loc_resolving"));
        chooseLocation({ name: t("weather_my_location"), lat, lon, gps: true });
        void resolvePlaceName(lat, lon).then((name) => {
          setLocStatus(null);
          if (!name) return;
          setLocation((prev) => {
            if (!prev || prev.lat !== lat || prev.lon !== lon) return prev;
            const next = { ...prev, name };
            try {
              localStorage.setItem(SAVED_LOCATION_KEY, JSON.stringify(next));
            } catch {
              // Ignore.
            }
            return next;
          });
        });
      },
      (err) => {
        // Denied, unavailable or timed out: say so plainly and
        // point at city search instead of failing silently.
        setLocStatus(err.code === err.PERMISSION_DENIED ? t("weather_loc_denied") : t("weather_loc_unavailable"));
      },
      { timeout: 10000 },
    );
  };

  const advice = weather ? buildAdvice(weather, crop) : [];
  const doItems = advice.filter((a) => a.kind === "do");
  const dontItems = advice.filter((a) => a.kind === "dont");

  return (
    <div className="w-full">
      <PageHeader label={t("weather_label")} title={t("weather_title")} sub={t("weather_sub")} />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-14 space-y-12">
        {/* Location */}
        <section className="panel p-5 md:p-6 space-y-4 fade-up">
          <p className="label text-muted">{t("weather_location")}</p>
          {location && (
            <>
              <p className="font-display font-extrabold text-2xl flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0" /> {location.name}
              </p>
              {location.gps && (
                <p className="text-sm text-muted">
                  {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </p>
              )}
            </>
          )}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("weather_search_placeholder")}
              aria-label={t("weather_search_placeholder")}
              className="w-full h-14 pl-12 pr-4 bg-card border-2 border-ink placeholder:text-muted outline-none focus:shadow-hard-sm"
            />
          </div>
          {searching && <p className="text-sm text-muted">{t("weather_searching")}</p>}
          {!searching && query.trim().length >= 2 && places.length === 0 && (
            <p className="text-sm text-muted">{t("weather_no_places")}</p>
          )}
          {places.length > 0 && (
            <ul className="border-2 border-ink divide-y-2 divide-ink">
              {places.map((p) => (
                <li key={`${p.latitude}-${p.longitude}-${p.name}`}>
                  <button
                    type="button"
                    onClick={() => chooseLocation({ name: [p.name, p.admin1, p.country].filter(Boolean).join(", "), lat: p.latitude, lon: p.longitude })}
                    className="w-full text-left px-4 py-3 hover:bg-accent hover:text-[#0b1a12] transition-colors"
                  >
                    <span className="font-display font-bold">{p.name}</span>
                    {(p.admin1 || p.country) && <span className="text-muted"> — {[p.admin1, p.country].filter(Boolean).join(", ")}</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div>
            <button type="button" onClick={useMyLocation} className="btn btn-paper">
              <LocateFixed className="w-5 h-5" /> {t("weather_use_location")}
            </button>
          </div>
          {locStatus && <p className="text-sm">{locStatus}</p>}
        </section>

        {/* Weather */}
        {!location && !loading && (
          <p className="border-2 border-dashed border-ink py-16 text-center font-display font-extrabold text-3xl">{t("weather_no_location")}</p>
        )}
        {loading && <p className="text-lg text-muted">{t("weather_loading")}</p>}
        {error && (
          <section className="panel p-5 md:p-6 space-y-4">
            <p>{error}</p>
            {location && (
              <button type="button" onClick={() => void fetchWeather(location)} className="btn btn-paper">
                <RefreshCw className="w-5 h-5" /> {t("weather_retry")}
              </button>
            )}
          </section>
        )}
        {weather && !loading && (
          <section className="space-y-5 fade-up">
            <div className="panel p-5 md:p-6">
              <p className="label text-muted">{t("weather_current")}</p>
              <div className="mt-3 flex items-end gap-3 flex-wrap">
                <span className="font-display font-extrabold text-6xl md:text-7xl leading-none">{Math.round(weather.currentTemp)}°C</span>
                <span className="text-lg text-muted pb-1">{t(weatherCodeKey(weatherCode))}</span>
              </div>
              <dl className="mt-6 grid grid-cols-3 border-2 border-ink divide-x-2 divide-ink text-center">
                <div className="p-4">
                  <dt className="label text-muted flex items-center justify-center gap-1"><Droplets className="w-3.5 h-3.5" /> {t("weather_humidity")}</dt>
                  <dd className="mt-2 font-display font-extrabold text-2xl">{Math.round(weather.currentHumidity)}%</dd>
                </div>
                <div className="p-4">
                  <dt className="label text-muted flex items-center justify-center gap-1"><Wind className="w-3.5 h-3.5" /> {t("weather_wind")}</dt>
                  <dd className="mt-2 font-display font-extrabold text-2xl">{Math.round(weather.currentWind)} <span className="text-base">km/h</span></dd>
                </div>
                <div className="p-4">
                  <dt className="label text-muted flex items-center justify-center gap-1"><Umbrella className="w-3.5 h-3.5" /> {t("weather_rain_chance")}</dt>
                  <dd className="mt-2 font-display font-extrabold text-2xl">{weather.precipProb[0] == null ? "—" : `${weather.precipProb[0]}%`}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted">
                {t("weather_source")}
                {updatedAt ? ` · ${t("weather_updated")} ${updatedAt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}` : ""}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {weather.tempMax.slice(0, 3).map((max, i) => (
                <article key={i} className="panel p-5">
                  <p className="label text-muted">{t(DAY_LABEL_KEYS[i])}</p>
                  <p className="mt-2 text-sm text-muted">{formatDay(weather.dates[i])}</p>
                  <p className="mt-3 font-display font-extrabold text-4xl">{Math.round(max)}° <span className="text-lg text-muted">/ {weather.tempMin[i] !== undefined ? `${Math.round(weather.tempMin[i])}°` : "—"}</span></p>
                  <p className="mt-1 text-sm">
                    <span className="text-muted">{t("weather_rain_chance")}: </span>
                    {weather.precipProb[i] == null ? "—" : `${weather.precipProb[i]}%`}
                    {weather.precipSum[i] !== undefined && weather.precipSum[i] > 0 ? ` · ${weather.precipSum[i]} mm` : ""}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Crop + advice */}
        {weather && !loading && (
          <section className="space-y-5 fade-up">
            <div>
              <p className="label text-muted mb-3">{t("weather_crop")}</p>
              <div role="tablist" className="grid grid-cols-3 border-2 border-ink">
                {WEATHER_CROPS.map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={crop === c}
                    onClick={() => setCrop(c)}
                    className={`h-14 label !text-[10px] sm:!text-[11px] border-r-2 last:border-r-0 border-ink ${crop === c ? "bg-ink text-paper" : "bg-card hover:bg-accent hover:text-[#0b1a12]"}`}
                  >
                    {CROP_NAMES[c]}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel p-5 md:p-6 space-y-6">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl">{t("weather_advice_title")}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="label text-muted mb-3">{t("weather_do")}</p>
                  <ul className="space-y-3">
                    {doItems.map((a) => (
                      <li key={a.key} className="flex items-start gap-3">
                        <span className="w-6 h-6 shrink-0 border-2 border-ink bg-accent flex items-center justify-center">
                          <Check className="w-4 h-4 text-[#0b1a12]" strokeWidth={3} />
                        </span>
                        <span>{t(a.key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label text-muted mb-3">{t("weather_dont")}</p>
                  {dontItems.length > 0 ? (
                    <ul className="space-y-3">
                      {dontItems.map((a) => (
                        <li key={a.key} className="flex items-start gap-3">
                          <span className="w-6 h-6 shrink-0 border-2 border-ink bg-danger flex items-center justify-center">
                            <X className="w-4 h-4 text-white" strokeWidth={3} />
                          </span>
                          <span>{t(a.key)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">—</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted border-t-2 border-ink pt-4 flex items-start gap-2">
                <Thermometer className="w-4 h-4 shrink-0 mt-0.5" />
                {t("weather_advice_note")}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
