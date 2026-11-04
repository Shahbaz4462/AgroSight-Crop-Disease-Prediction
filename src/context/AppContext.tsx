"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AIProvider, predictionService } from "../services/ai/predictionService";
import { PredictionResult } from "../types";

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  expoMode: boolean;
  toggleExpoMode: () => void;
  language: "en" | "ur";
  setLanguage: (lang: "en" | "ur") => void;
  aiProvider: AIProvider;
  setAiProvider: (provider: AIProvider) => void;
  lastDiagnosis: PredictionResult | null;
  setLastDiagnosis: (result: PredictionResult | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [expoMode, setExpoMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [aiProvider, setAiProviderState] = useState<AIProvider>("api");
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

