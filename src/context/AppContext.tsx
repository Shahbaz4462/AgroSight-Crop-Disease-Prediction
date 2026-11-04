"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AIProvider, predictionService } from "../services/ai/predictionService";
import { PredictionResult } from "../types";
import { Lang, translate } from "../lib/i18n";

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  expoMode: boolean;
  toggleExpoMode: () => void;
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: string) => string;
  aiProvider: AIProvider;
  setAiProvider: (provider: AIProvider) => void;
  lastDiagnosis: PredictionResult | null;
  setLastDiagnosis: (result: PredictionResult | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [expoMode, setExpoMode] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Lang>("en");
  // Language is saved on this device only, like scan history.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrosight-lang");
      if (saved === "ur" || saved === "roman" || saved === "en") setLanguageState(saved);
    } catch {
      // Ignore.
    }
  }, []);
  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("agrosight-lang", lang);
    } catch {
      // Ignore.
    }
  };
  const t = (key: string) => translate(language, key);
  const [aiProvider, setAiProviderState] = useState<AIProvider>("tfjs");
  const [lastDiagnosis, setLastDiagnosis] = useState<PredictionResult | null>(null);

  useEffect(() => {
    // Sync theme class to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleExpoMode = () => {
    setExpoMode((prev) => !prev);
  };

  const setAiProvider = (provider: AIProvider) => {
    setAiProviderState(provider);
    predictionService.setProvider(provider);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        expoMode,
        toggleExpoMode,
        language,
        setLanguage,
        t,
        aiProvider,
        setAiProvider,
        lastDiagnosis,
        setLastDiagnosis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

