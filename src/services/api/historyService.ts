import { DiagnosisHistoryItem } from "../../types";

const STORAGE_KEY = "agrosight_diagnosis_history";

export const historyService = {
  getHistory(): DiagnosisHistoryItem[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  addDiagnosis(item: Omit<DiagnosisHistoryItem, "id" | "date"> & { id?: string; date?: string }): DiagnosisHistoryItem {
    const history = this.getHistory();
    const newItem: DiagnosisHistoryItem = {
      ...item,
      id: item.id || `diag-${Date.now()}`,
      date: item.date || new Date().toISOString(),
    };
    const updated = [newItem, ...history];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn("Failed to write history to localStorage:", err);
      }
    }
    return newItem;
  },

  deleteDiagnosis(id: string): void {
    const history = this.getHistory().filter((item) => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  },

  clearHistory(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
};

