// Read text aloud with the browser's own speech synthesis.
// No audio file, no server, no cost.
//
// Why the old version sounded English in Urdu mode: it passed
// English treatment text with lang "ur-PK", and most phones have
// no Urdu voice installed, so the browser silently fell back to
// its default English voice and read English words. Two fixes:
//  1. The text itself is now built in the selected language
//     (see resultSpeech.ts), so Urdu mode speaks Urdu sentences.
//  2. The voice is explicitly picked: a voice whose language
//     starts with "ur" when one exists, after waiting for the
//     browser's voice list. If no Urdu voice exists on the phone,
//     the function still speaks with lang "ur-PK" (some phones
//     then use a close voice), but the caller can tell the user
//     to install an Urdu voice if the result still sounds English.

export type Lang = "en" | "ur" | "roman";

function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  try {
    const voices = window.speechSynthesis.getVoices();
    if (lang === "en") {
      return voices.find((v) => v.lang.toLowerCase().startsWith("en")) ?? null;
    }
    // Urdu script and Roman Urdu both use an Urdu voice when one
    // exists on the device.
    return voices.find((v) => v.lang.toLowerCase().startsWith("ur")) ?? null;
  } catch {
    return null;
  }
}

function hasUrduVoice(): boolean {
  try {
    return window.speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith("ur"));
  } catch {
    return false;
  }
}

export function speak(text: string, lang: Lang, onEnd?: () => void): boolean {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const start = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "en" ? "en-GB" : "ur-PK";
      const voice = pickVoice(lang);
      if (voice) u.voice = voice;
      u.rate = 0.9;
      u.onend = () => onEnd?.();
      u.onerror = () => onEnd?.();
      window.speechSynthesis.speak(u);
    };
    // Voices load asynchronously on most phones. If the list is
    // empty, wait for it once instead of speaking immediately with
    // the wrong voice.
    if (window.speechSynthesis.getVoices().length === 0) {
      const handler = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
        start();
      };
      window.speechSynthesis.addEventListener("voiceschanged", handler);
      // Fallback if the event never fires.
      setTimeout(() => {
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
        if (!window.speechSynthesis.speaking) start();
      }, 800);
    } else {
      start();
    }
    return true;
  } catch {
    return false;
  }
}

export function urduVoiceAvailable(): boolean {
  return hasUrduVoice();
}

export function stopSpeaking(): void {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch {
    // Ignore.
  }
}
