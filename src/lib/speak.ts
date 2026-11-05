// Read text aloud with the browser's own speech synthesis.
// No audio file, no server, no cost.
//
// Why the old version was unclear and slow on the first tap:
//  1. It picked the FIRST voice of the right language. On many
//     phones that is a low-quality voice, and for Roman Urdu it
//     picked an Urdu-script voice to read Latin letters, which
//     sounds garbled. Now voices are ranked (Google first, then
//     Microsoft/Samsung, then any; for Urdu, an exact ur-PK voice
//     first), and Roman Urdu uses an English voice because its
//     text is written in Latin letters.
//     Worse, an Urdu-script result was once spoken by the
//     phone's default (English) voice when no Urdu voice was
//     actually usable — that is what sounds like an Englishman
//     speaking Urdu. Now the choice of language is made from the
//     voice that can really be picked (resolveSpeakLang), not
//     from whether the voice list merely mentions Urdu: no
//     usable Urdu voice means Roman Urdu is spoken instead, and
//     Urdu script is never read by an English voice.
//  2. Urdu was read at the same speed as English. Urdu TTS is
//     much clearer slower, so Urdu now reads at 0.8, Roman Urdu
//     at 0.9, English at 0.95.
//  3. The whole result was one long utterance, which phones rush
//     or cut off. The text is now split into sentences and queued
//     one by one, with a short pause between them.
//  4. The first tap was slow because the browser loads its voice
//     list lazily; the first Listen had to wait for it (up to
//     800 ms). Now preloadVoices() is called when the app opens
//     (AppProvider mount), so the list is already ready when the
//     user taps Listen. The Diagnose and Results pages call it
//     too, as a backup for direct links.

export type Lang = "en" | "ur" | "roman";

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): SpeechSynthesisVoice[] {
  try {
    return window.speechSynthesis.getVoices();
  } catch {
    return [];
  }
}

/** Load the browser's voice list early (call on page mount). */
export function preloadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return Promise.resolve([]);
  }
  if (voicesReady) return voicesReady;
  voicesReady = new Promise((resolve) => {
    const done = () => {
      cachedVoices = loadVoices();
      resolve(cachedVoices);
    };
    cachedVoices = loadVoices();
    if (cachedVoices.length > 0) {
      done();
      return;
    }
    const handler = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      done();
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    // Never hang: resolve with whatever we have after 1.5 s.
    setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      if (cachedVoices.length === 0) cachedVoices = loadVoices();
      resolve(cachedVoices);
    }, 1500);
  });
  return voicesReady;
}

function voiceScore(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  if (name.includes("google")) return 3;
  if (name.includes("microsoft") || name.includes("samsung") || name.includes("natural")) return 2;
  return 1;
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  try {
    const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
    if (voices.length === 0) return null;
    const best = (list: SpeechSynthesisVoice[]) =>
      list.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0] ?? null;
    if (lang === "ur") {
      // Urdu script: needs a real Urdu voice. Prefer an exact
      // ur-PK voice (the Pakistani accent), then Google Urdu.
      // A voice merely listed as Urdu but without usable data
      // must never be picked over this check — pickVoice
      // returning null is what triggers the Roman Urdu fallback.
      const ur = voices.filter((v) => v.lang.toLowerCase().startsWith("ur"));
      // Best voice first, exact ur-PK second: a natural Google
      // voice matters more than the region, but between equal
      // voices the Pakistani accent wins over ur-IN.
      const ranked = ur.slice().sort((a, b) => {
        const exact = (v: SpeechSynthesisVoice) => (v.lang.toLowerCase() === "ur-pk" ? 1 : 0);
        return voiceScore(b) - voiceScore(a) || exact(b) - exact(a);
      });
      return ranked[0] ?? null;
    }
    // English and Roman Urdu are both written in Latin letters, so
    // both use an English voice. An Urdu voice reading Roman Urdu
    // text sounds garbled; an English voice reads it clearly.
    const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
    return best(en);
  } catch {
    return null;
  }
}

function hasUrduVoice(): boolean {
  // Same check as the voice that would actually be used: a list
  // entry alone is not enough, pickVoice must find one.
  return pickVoice("ur") !== null;
}

/** Decide which language to actually speak in. Urdu script is
 *  only spoken when a real Urdu voice can be picked; otherwise
 *  Roman Urdu is spoken (with an English voice) so an English
 *  voice never reads Urdu script. Call after preloadVoices(). */
export function resolveSpeakLang(lang: Lang): Lang {
  if (lang === "ur" && !hasUrduVoice()) return "roman";
  return lang;
}

function rateFor(lang: Lang): number {
  // Slower is clearer, especially for Urdu. Roman Urdu is Urdu
  // words read by an English voice, so it reads slower too.
  if (lang === "ur") return 0.8;
  if (lang === "roman") return 0.85;
  return 0.95;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!؟۔])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function speak(text: string, lang: Lang, onEnd?: () => void): boolean {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const start = () => {
      const voice = pickVoice(lang);
      const rate = rateFor(lang);
      const sentences = splitSentences(text);
      if (sentences.length === 0) {
        onEnd?.();
        return;
      }
      let i = 0;
      const speakNext = () => {
        if (i >= sentences.length) {
          onEnd?.();
          return;
        }
        const u = new SpeechSynthesisUtterance(sentences[i]);
        u.lang = lang === "ur" ? "ur-PK" : "en-GB";
        if (voice) u.voice = voice;
        u.rate = rate;
        u.pitch = 1;
        u.volume = 1;
        u.onend = () => {
          i += 1;
          // Short pause between sentences so words don't run together.
          setTimeout(speakNext, 180);
        };
        u.onerror = () => {
          i += 1;
          speakNext();
        };
        window.speechSynthesis.speak(u);
      };
      speakNext();
    };
    // Voices were preloaded on page mount, so this is normally
    // instant. Only wait if the list is still empty (e.g. a direct
    // link to the results page).
    if (cachedVoices.length > 0 || loadVoices().length > 0) {
      start();
      return true;
    }
    void preloadVoices().then(() => {
      if (!window.speechSynthesis.speaking) start();
    });
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch {
    // Ignore.
  }
}
