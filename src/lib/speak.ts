// Read a result aloud with the browser's own speech synthesis.
// No audio file, no server, no cost. Voice quality depends on the
// phone: some phones have a good Urdu voice, some fall back to an
// English-sounding voice or have no Urdu voice at all. Calling this
// twice stops the previous reading first, so the button works as a
// play/stop toggle.

export type Lang = "en" | "ur" | "roman";

export function speak(text: string, lang: Lang): boolean {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    // Urdu script and Roman Urdu are both spoken with an Urdu voice
    // when the phone has one; otherwise the browser picks its default.
    u.lang = lang === "en" ? "en-GB" : "ur-PK";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
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
